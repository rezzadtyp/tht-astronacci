import { ArrowRight } from 'lucide-react';
import { Input } from './ui/input';
import Link from 'next/link';

export const Footer = () => {
  return (
    <div className="w-full">
      <div className="bg-zinc-900 rounded-3xl mb-8 text-white flex flex-col gap-8 items-center p-6">
        <h1 className="text-4xl font-semibold pt-10">Join The Community</h1>
        <p className="font-light w-80 text-center">
          At SkillUp, we believe that learning is a collaborative process.
        </p>
        <div className="rounded-full overflow-hidden bg-white flex items-center w-[40%] p-1">
          <Input
            placeholder="Enter your email"
            className="text-black border-none shadow-none focus-visible:ring-transparent pl-8"
          />
          <div className="flex h-full w-fit rounded-full p-2 bg-black items-center gap-4">
            <p className="pl-4">Subscribe</p>
            <div className="bg-purple-400 rounded-full p-2">
              <ArrowRight />
            </div>
          </div>
        </div>
        <div className="pt-10 flex justify-between items-center w-full">
          <p className='text-xl font-bold'>Skill Up</p>
          <div className="flex gap-10">
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
          <p className='font-light'>©2024 SkillUp.</p>
        </div>
      </div>
    </div>
  );
};
