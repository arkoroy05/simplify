import { GoogleGenerativeAI } from "@google/generative-ai";


export default async function generateAnswer(query,slider) {
  console.log(process.env.KEY)
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });
  //DONT TOUCH ABOVE THIS

  let prompt=``
    if(slider===0){
        prompt = `You are a elemntary school teacher, your task is to explain ${query} to a six year old child. Explain it following these rules-
                  1.Do not ask any return question or inform the user that you are done explaining
                  2. Return the data in JSON format and folow the following schema
                  {explanation: the core crux of the defination,
                  nutshell: just the core defination,
                  usecases: few typical usecases}
                  `;
    }
    
    if(slider===1){
        prompt = `You are a high school teacher, your task is to explain ${query} to a class of high school students. Explain it following these rules-
                  1. Return the answer in just one paragraph, do not use multiple paragraphs, Make this paragraph moderately long and detailed.
                  2.Any new term you introduce make sure to explain it in atleast one line.
                  3.Do not ask any return question or inform the user that you are done explaining
                 `;
    }
    if(slider===2){
        prompt = `You are a university proffesor, your task is to explain ${query} to a class of university students. Explain it following these rules-
                  1. Return the answer in just one paragraph, do not use multiple paragraphs, Make this paragraph moderately long and detailed.
                  2.Any new term you introduce make sure to explain it in atleast one line.
                  3.Do not ask any return question or inform the user that you are done explaining
                 `;
    }
    if(slider===3){
        prompt = `You are a professor of this field, your task is to explain ${query} to a room of experienced professors of this field. Explain it following these rules-
                  1. Return the answer in just one paragraph, do not use multiple paragraphs, Make this paragraph moderately long and detailed.
                  2.Any new term you introduce make sure to explain it in atleast one line.
                  3.Do not ask any return question or inform the user that you are done explaining
                 `
    }
    

    try {
        const result = await model.generateContent(prompt);
        console.log(result);  // Log result to understand its structure
        if (result && result.response && result.response.text) {
          console.log(result.response.text());  // Ensure text() method is available
          return result.response.text();  // Return the generated text
        } else {
          console.error("Unexpected result structure:", result);
          throw new Error("Failed to retrieve content");
        }
      } catch (error) {
        console.error("Error generating content:", error);
        throw error;
      }
}
