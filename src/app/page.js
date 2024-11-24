"use client"
import { useState,useEffect, useContext } from 'react'
import { useRouter } from 'next/navigation' // Import useRouter for navigation
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Button } from '@/components/ui/button'
import TypingAnimation from '@/components/ui/typing-animation'
import ShimmerButton from '@/components/ui/shimmer-button'
import { MultiStepLoader as Loader } from '@/components/ui/multi-step-loader'
import { Vortex } from '@/components/ui/vortex'
import CycleText from '@/components/ui/textreveal'
import generateAnswer from '@/helper/GeminiInfo'
import { Context } from '@/context/Context'


const sliderLevel = ["6 year old","High school Student","Universty Grad","Experienced"];
const loadingStates = [
  { text: "Loading the page" },
  { text: "Fetching the data" },
  { text: "Organizing it for you" },
  { text: "Damn this is long" },
  { text: "It would be easier if you could read binary" },
  { text: "We are kinda done" },
  { text: "We are almost done" },
  { text: "Lets go" },
];

export default function Component() {
  const {input,
    setInput,
    sliderValue,
    setSliderValue,
    handleButtonClick,
    loading,
    setLoading}=useContext(Context)
  //sliderValue stores your slider ka value
 
  const router = useRouter(); 
 

  useEffect(() => {
    router.prefetch("/explain")
  }, [router])

  
  
  return (
    
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <Vortex
      backgroundColor="black"
      className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
      
      <Loader loadingStates={loadingStates} loading={loading} duration={1000} />
  
      <TypingAnimation className="text-8xl font-bold mb-8 bg-gradient-to-tr" text="simplyfy"></TypingAnimation>
      
      <CycleText></CycleText>
      
      <Input 
        className="w-full max-w-2xl text-black mb-8 mt-6 text-lg p-4" 
        placeholder="a term a defination or more"
        value={input}
        onChange={(e)=>{setInput(e.target.value)}}
      />
      
      <div className="w-full max-w-2xl">
        <Slider
          defaultValue={[1]}
          max={3}
          step={1}
          onValueChange={(value) => setSliderValue(value[0])}
        />
        <p className="text-center mt-2">Level: {sliderLevel[sliderValue]}</p>
      </div>
      
      <ShimmerButton 
        onClick={()=>handleButtonClick(input,sliderValue)} // Call the handler on click
        className="mt-9"
      >
        Explain
      </ShimmerButton>
      </Vortex>
    </div>
  );
}
