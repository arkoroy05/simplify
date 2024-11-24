"use client"


import { Context } from '@/context/Context'
import React, { useContext, useState,useEffect } from 'react'
import { WobbleCard } from '@/components/ui/wobble-card';
import TextBorderAnimation from '@/components/ui/text-border-animation';
import QuestionAnswer from '@/components/QnA';
import { TextHoverEffect } from '@/components/ui/hover-text';
import { Footer } from '@/components/Footer';

export default function Page() {
  const { resultData,ntData } = useContext(Context);
  
  return (
  
    <div className='w-full min-h-screen bg-black'>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
           What it really is ?
          </h2>
          <p className="mt-4 text-left  text-base/6 text-neutral-200">
            {resultData}
          </p>
        </div>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px]">
        <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          In a nutshell
        </h2>
        <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
          {ntData}
        </p>
      </WobbleCard>
      
    </div>
    <div>

    <QuestionAnswer></QuestionAnswer>
    </div>
    <div className="h-[40rem] flex items-center justify-center sm:mt-10 p-10">
      <TextHoverEffect text="simplyfy" />
    </div>
    <Footer></Footer>
    </div>
   
  );
}

