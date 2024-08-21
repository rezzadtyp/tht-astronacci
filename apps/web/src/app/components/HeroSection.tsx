import Image from 'next/image';
import hero from '../../../public/hero.png';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import timelogo from '../../../public/time-logo-black-transparent.png';
import forbeslogo from '../../../public/Forbes-logo-300x78.png';
import techcrunchlogo from '../../../public/techcrunch-vector-logo.svg';

const HeroSection = () => {
  return (
    <div className="h-fit flex">
      <div className="w-full h-full space-y-8">
        <h1 className="font-extrabold text-7xl pt-24">
          Master New Skills with SkillUp
        </h1>
        <p className="text-base w-[70%]">
          Are you tired of pulling all-nighters and still struggling to keep up
          with your coursework?
        </p>
        <div className="flex gap-20 items-center">
          <Button className="font-bold py-8 px-4 rounded-full space-x-4">
            <p className="pl-4 text-lg">Get started</p>
            <div className="p-2 rounded-full bg-white text-black">
              <ArrowRight />
            </div>
          </Button>
          <div className="flex items-center">
            <div className="flex">
              <Avatar className="-mx-2 border border-white w-12 h-12">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar className="-mx-2 border border-white w-12 h-12">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar className="-mx-2 border border-white w-12 h-12">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="ml-6">
              <p className="text-2xl font-bold">42k +</p>
              <p className="text-sm">Using this app</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <Image
            src={timelogo}
            alt="time-logo"
            className="w-40 h-40 object-contain"
          />
          <Image
            src={forbeslogo}
            alt="forbes-logo"
            className="w-40 h-40 object-contain"
          />
          <Image
            src={techcrunchlogo}
            alt="techcrunch-logo"
            className="w-40 h-40 object-contain"
          />
        </div>
      </div>
      <div className="w-full h-full items-center flex">
        <Image src={hero} alt="hero" className="object-cover mx-auto" />
      </div>
    </div>
  );
};

export default HeroSection;
