"use client"
import generateAnswer from "@/helper/GeminiInfo";
import generateNutshell from "@/helper/GeminiNutshell";
import { createContext, useState } from "react";
import { useRouter } from "next/navigation";


export const Context=createContext()

const ContextProvider=(props)=>{
    const router = useRouter(); 
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

    const [input,setInput]=useState("")
    const [sliderValue, setSliderValue] = useState(1)
    const [recentPrompt,setRecentPrompt]=useState("")
    const [resultData,setResultData]=useState("")
    const [ntData,setNtData]=useState("")
    const [loading, setLoading] = useState(false);
    
    const handleButtonClick = (input,sliderValue) => {
        setLoading(true);
        onSent(input,sliderValue)
        setTimeout(() => {
          setLoading(false); 
          router.push('/explain'); 
        }, loadingStates.length * 1000); 
      };

      const onSent = (input, sliderValue) => {
        setResultData("");
        
        generateAnswer(input, sliderValue)
            .then((response) => {
                setResultData(response);
                return generateNutshell(response);
            })
            .then((nutshell) => {
                setNtData(nutshell);
                setInput("");
            })
            .catch((error) => {
                console.error("Error:", error);
                // Handle error appropriately
            });
    };
    

    const contextValue={
        onSent,
        input,
        recentPrompt,
        resultData,
        setInput,
        setRecentPrompt,
        setResultData,
        sliderValue,
        setSliderValue,
        handleButtonClick,
        loading,
        ntData,setNtData,
        setLoading
    }

      
    return(
        <Context.Provider value={contextValue}>
        {props.children}
        </Context.Provider>

    )


}

export default ContextProvider