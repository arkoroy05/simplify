import { GoogleGenerativeAI } from "@google/generative-ai";


export default async function generateNutshell(query) {
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });
  //DONT TOUCH ABOVE THIS
    let prompt=`${query} give me the core defination from this paragraph abiding the following rules-
    1.The word limit is going to be half of the words of the original given query`
    

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
