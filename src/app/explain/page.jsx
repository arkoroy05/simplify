"use client";

import { Context } from "@/context/Context";
import React, { useContext } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import QuestionAnswer from "@/components/QnA";
import { TextHoverEffect } from "@/components/ui/hover-text";
import { Footer } from "@/components/Footer";

export default function Page() {
  const { resultData, ntData } = useContext(Context);
  let data = resultData; // this is an object

  return (
    <div className="w-full min-h-screen bg-black">
      <div className="grid grid-cols-2 grid-rows-1 gap-4 max-w-7xl mx-auto w-full">
  {Object.entries(data).map(([key, value], index) => (
    <Accordion key={index} type="single" collapsible>
      <AccordionItem value={`item-${index}`}>
        <AccordionTrigger className="text-white">{key}</AccordionTrigger>
        <AccordionContent className="text-white">{value}</AccordionContent>
      </AccordionItem>
    </Accordion>
  ))}
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
