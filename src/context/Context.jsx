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
        }, loadingStates.length * 700); 
      };

      function cleanAndParseJSON(inputString) {
        // Remove all occurrences of opening and closing triple backticks
        const cleanedString = inputString.replace(/```json/gi, '').replace(/```/gi, '').trim();
        
        try {
            // Parse the cleaned string as JSON
            return JSON.parse(cleanedString);
        } catch (error) {
            // Return an error message if parsing fails
            console.error("Invalid JSON:", error.message);
            return null;
        }
    }
    
    

      const onSent = (input, sliderValue) => {
        setResultData("");
        generateAnswer(input, sliderValue)
            .then((response) => {
                const formated=cleanAndParseJSON(response)
                console.log(typeof(formated))
                console.log(formated)
                setResultData(formated);
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