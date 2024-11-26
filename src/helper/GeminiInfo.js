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
                  {What It Means: Describe the idea like you're telling a story to a child. Use easy words, short sentences, and examples they can see in their everyday life.,
                  How It's Used: Share a few fun or real-life examples of how this idea is used.,
                  A Fun Fact: Share a surprising or interesting fact about the idea that will make them smile or say, "Wow!"
                  Why Its Cool: Tell them why this idea is exciting or special, using examples of things kids love.}
                  Imagine This: Ask them to picture or pretend something fun that connects to the idea
                  In Short: Explain it in short manner that even a 6-year-old can repeat and remember.`;
    }
    
    if(slider===1){
        prompt = `You are a high school teacher, your task is to explain ${query} to a class of high school students. Explain it following these rules-
                  1.Do not ask any return question or inform the user that you are done explaining
                  2. Return the data in JSON format and folow the following schema
                  {What It Means: Provide a clear and concise explanation of the concept, avoiding unnecessary complexity while respecting their ability to grasp advanced ideas. Use relatable examples from daily life, academics, or technology.,
                  Real-World Applications: Highlight where this concept is applied, especially in science, technology, society, or fields relevant to their studies or interests.,
                  Insight: Share an interesting or surprising fact, historical context, or new cutting-edge development related to the concept.
                  Why Its Cool: Tell them why this idea is exciting or special, using examples of things kids love.}
                  How It Works: Break down the concept or process into clear, logical steps or components. Incorporate some technical terms they might encounter.
                  Key Idea : Summarize the concept in one short paragraph that captures its essence.
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
