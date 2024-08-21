'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

const Header = () => {
  const session = useSession();
  const router = useRouter();

  return (
    <nav className="sticky top-0 w-full py-2 bg-white">
      <div className="container px-0 mx-auto">
        <div className="flex items-center justify-between py-2">
          <h1
            className="cursor-pointer text-xl pl-2 font-bold"
            onClick={() => router.push('/')}
          >
            Skill Up
          </h1>

          <div className="flex cursor-pointer items-center gap-8 text-sm font-bold">
            <Link href="/" className="hover:underline underline-offset-4">
              Home
            </Link>
            <Link href="/about" className="hover:underline underline-offset-4">
              About
            </Link>
            <Link
              href="/courses"
              className="hover:underline underline-offset-4"
            >
              Courses
            </Link>
            <Link
              href="/community"
              className="hover:underline underline-offset-4"
            >
              Community
            </Link>
          </div>

          <div className="flex cursor-pointer items-center gap-8">
            {session.data?.user.id ? (
              <>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/profile">{session.data.user.name}</Link>
                <h3 onClick={() => signOut()}>Logout</h3>
              </>
            ) : (
              <>
                <Button variant="default" className="rounded-full px-6">
                  <Link href="/register">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
