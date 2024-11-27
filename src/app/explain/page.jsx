"use client";

import { Context } from "@/context/Context";
import React, { useContext } from "react";
import QuestionAnswer from "@/components/QnA";
import { TextHoverEffect } from "@/components/ui/hover-text";
import { Footer } from "@/components/Footer";
import FaqSection from "@/components/ui/faq";

export default function Page() {
  const { resultData, ntData } = useContext(Context);
  let data = resultData; // this is an object

  return (
    <div className="w-full min-h-screen bg-black">
      <div className="grid sm:grid-cols-2 grid-rows-1 gap-4 max-w-7xl mx-auto w-full">
    <FaqSection data={data}></FaqSection>
 
</div>

   
      <div>
        <QuestionAnswer />
      </div>
      <div className="h-[40rem] flex items-center justify-center sm:mt-10 p-10">
        <TextHoverEffect text="simplyfy" />
      </div>
      <Footer />
    </div>
  );
}
