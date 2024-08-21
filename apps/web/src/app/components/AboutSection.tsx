import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import logo1 from '../../../public/tron-trx-logo.svg';
import logo2 from '../../../public/coinmarketcap-1.svg';

const AboutSection = () => {
  return (
    <div className="pt-20 space-y-10">
      <div className="flex w-full items-center">
        <div className="text-5xl w-full font-bold">
          <p>New Skills with SkillUp.</p>
          <p>A Detailed Look at Our Curriculum</p>
        </div>
        <div className="space-y-4 w-[30%]">
          <p>
            With real-world projects to create and online classes that fit a
            busy routine
          </p>
          <Button className="rounded-full h-fit py-2 px-2 flex gap-6">
            <p className="pl-10 font-semibold text-lg">Get Started</p>
            <div className="rounded-full bg-white text-black p-2">
              <ArrowRight />
            </div>
          </Button>
        </div>
      </div>

      <div className="grid gap-10 grid-cols-5 grid-flow-col">
        <div className="w-full p-8 space-y-6 col-span-2 bg-blue-200 rounded-3xl">
          <div className="rounded-full bg-purple-300 w-16">
            <Image src={logo1} alt="logo1" className="p-3 object-contain" />
          </div>
          <h1 className="text-3xl font-semibold">
            Learn at your own pace with hands-on creative classes.
          </h1>
          <p className="text-lg font-light">
            Looking to expand your skills and explore your creativity? Our
            hands-on creative classes are the perfect way to learn at your own
            pace and discover new talents.
          </p>
        </div>
        <div className="w-full p-8 space-y-6 col-span-3 bg-green-200 rounded-3xl">
          <div className="rounded-full bg-rose-300 w-16">
            <Image src={logo2} alt="logo1" className="p-3 object-contain" />
          </div>
          <h1 className="text-3xl font-semibold">
            SkillUp teachers are everyday creatives and professionals who want
            to share their passion
          </h1>
          <p className="text-lg font-light">
            At SkillUp, we believe that everyone has something to teach and
            share with the world. Our teachers are not just experts in their
            field, they are also passionate about teaching and helping others
            discover their own creativity. They take the time to get to know
            their students and tailor their instruction to meet their individual
            needs and goals.
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <h1 className='text-2xl w-52 font-semibold'>Our Features Special For You</h1>
        <div className="flex gap-6">
          <div className="py-4 px-6 rounded-full bg-gray-200 text-lg font-medium">
            Get Certificate
          </div>
          <div className="py-4 px-6 rounded-full bg-gray-200 text-lg font-medium">
            Amazing Instructor
          </div>
          <div className="py-4 px-6 rounded-full bg-gray-200 text-lg font-medium">
            Lifetime Support
          </div>
          <div className="py-4 px-6 rounded-full bg-gray-200 text-lg font-medium">
            Video Lesson
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
