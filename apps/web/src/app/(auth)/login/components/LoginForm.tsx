'use client';

import useLogin from '@/hooks/api/auth/useLogin';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from './LoginSchema';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import useGoogleSignIn from '../../../../hooks/api/auth/useGoogleSignIn';
import FbLogin from '@/components/FbLogin';
import { FcGoogle } from 'react-icons/fc';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { FaFacebook } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const { mutateAsync: login, isPending } = useLogin();
  const { mutateAsync: googleLogin, isPending: isGooglePending } =
    useGoogleSignIn();

  const router = useRouter();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (values: any) => {
    login(values);
  };

  return (
    <Card className="flex flex-col items-center w-[30vw] mx-auto">
      <CardHeader>
        <h1 className="text-3xl font-bold">Login</h1>
      </CardHeader>
      <CardContent className="px-4 w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-3 w-full">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isPending ? 'Loading...' : 'Login'}
              </Button>
            </div>
          </form>
        </Form>

        <div className="flex flex-col items-center gap-2">
          <p className="text-sm pt-2">---or---</p>
          <Button
            onClick={() => googleLogin()}
            disabled={isGooglePending}
            className="flex gap-3 w-full"
            variant="outline"
          >
            {isGooglePending ? (
              'Signing in...'
            ) : (
              <>
                <FcGoogle />
                Continue with Google
              </>
            )}
          </Button>
          <FbLogin />
        </div>

        <div className="flex items-center justify-center pt-8 w-full">
          <p className="text-sm font-medium">Don&apos;t have an account?</p>
          <Button
            variant="link"
            className="text-sm font-medium"
            onClick={() => router.push('/register')}
          >
            Register
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
