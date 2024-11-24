import { GoogleGenerativeAI } from "@google/generative-ai";


export default async function generateFollowUp(query,basis) {
    console.log(query,basis);  // Log result to understand its structure
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-8b" });
  //DONT TOUCH ABOVE THIS
    let prompt=`${basis} on the basis of this defination answer this question ${query} follow these guidelines carefully-
    1.Answer only the question asked and do not inform about anthing else
    2.Answer to the point, but clear all the doubts
    3. Try to use everyday life lingo`
    

    try {
        const result = await model.generateContent(prompt);
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
