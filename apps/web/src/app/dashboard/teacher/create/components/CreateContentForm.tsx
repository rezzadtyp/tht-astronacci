'use client';

import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Loader2, Paperclip } from 'lucide-react';
import { CreateContentSchema } from './CreateContentSchema';
import useCreateContent from '@/hooks/api/content/useCreateContent';
import Image from 'next/image';
import { useState } from 'react';
import RichTextEditor from '@/components/RichTextEditor';

const CreateContentForm = () => {
  const { mutateAsync: submit, isPending } = useCreateContent();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [contentType, setContentType] = useState<string | undefined>(undefined);

  const form = useForm<z.infer<typeof CreateContentSchema>>({
    resolver: zodResolver(CreateContentSchema),
  });

  const onSubmit = (values: any) => {
    submit(values);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContentType(event.target.value);
    form.setValue('type', event.target.value);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your category" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content Type</FormLabel>
                  <FormControl>
                    <div className="flex space-x-4">
                      <label>
                        <input
                          type="radio"
                          value="ARTICLE"
                          checked={field.value === 'ARTICLE'}
                          onChange={handleTypeChange}
                        />
                        <span>Article</span>
                      </label>
                      <label>
                        <input
                          type="radio"
                          value="VIDEO"
                          checked={field.value === 'VIDEO'}
                          onChange={handleTypeChange}
                        />
                        <span>Video</span>
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {contentType === 'VIDEO' && (
              <FormField
                control={form.control}
                name="video_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Video URL {'(optional)'}</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your video url" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      value={field.value}
                      onChange={field.onChange}
                      label="Description"
                      isError={!!form.formState.errors.description}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {selectedImage ? (
              <div className="relative h-[150px] w-[200px]">
                <Image
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected"
                  fill
                  className="object-cover"
                />
              </div>
            ) : null}
            <FormField
              control={form.control}
              name="thumbnail_url"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Button
                      size="lg"
                      variant="secondary"
                      type="button"
                      className="w-full md:w-fit"
                    >
                      <input
                        type="file"
                        className="hidden"
                        id="fileInput"
                        accept="image/*"
                        onBlur={field.onBlur}
                        name={field.name}
                        onChange={(e) => {
                          field.onChange(e.target.files);
                          setSelectedImage(e.target.files?.[0] || null);
                        }}
                        ref={field.ref}
                      />
                      <label
                        htmlFor="fileInput"
                        className="text-neutral-90 inline-flex cursor-pointer items-center gap-2 rounded-md"
                      >
                        <Paperclip size={20} />
                        <span className="whitespace-nowrap">
                          Upload thumbnail image
                        </span>
                      </label>
                    </Button>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? 'Loading...' : 'Submit'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default CreateContentForm;
