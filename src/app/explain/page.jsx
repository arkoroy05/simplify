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
  
    <div className='w-full min-h-screen'>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
     
      
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

