"use client"

import { useState,useContext } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Loader2, Send } from 'lucide-react'
import {Context} from "@/context/Context"
import generateFollowUp from "@/helper/GeminiFollowUp"

const generateAnswer=(question,basis)=>{
  const ans=generateFollowUp(question,basis)
  return ans
}

export default function QuestionAnswer() {
  const {ntData } = useContext(Context);
  const basis=ntData

  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!question.trim()) return

    setIsLoading(true)
    try {
      const generatedAnswer = await generateAnswer(question,basis)
      setAnswer(generatedAnswer)
    } catch (error) {
      console.error("Failed to generate answer:", error)
      setAnswer("Sorry, I couldn't generate an answer. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Ask a follow up question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Thinking
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Ask
              </>
            )}
          </Button>
        </div>
      </form>

      {(question || answer) && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Q&A</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {question && (
              <div>
                <h3 className="font-semibold">Question:</h3>
                <p>{question}</p>
              </div>
            )}
            {answer && (
              <div>
                <h3 className="font-semibold">Answer:</h3>
                <p>{answer}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
