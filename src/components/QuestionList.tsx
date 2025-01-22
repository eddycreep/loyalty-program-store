import type React from "react"
import { useState } from "react"
import type { SurveyQuestion } from "../../types/survey"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2 } from "lucide-react"

interface QuestionListProps {
  questions: SurveyQuestion[]
  onAddQuestion: (question: SurveyQuestion) => void
  onRemoveQuestion: (id: number) => void
}

const QuestionList: React.FC<QuestionListProps> = ({ questions, onAddQuestion, onRemoveQuestion }) => {
  const [newQuestion, setNewQuestion] = useState<SurveyQuestion>({
    id: 0,
    question_text: "",
    question_type: "multiple_choice",
    options: [],
  })
  const [currentOption, setCurrentOption] = useState("")

  const handleAddQuestion = () => {
    if (newQuestion.question_text.trim() !== "") {
      onAddQuestion(newQuestion)
      setNewQuestion({ id: 0, question_text: "", question_type: "multiple_choice", options: [] })
      setCurrentOption("")
    }
  }


  const handleAddOption = () => {
    if (currentOption.trim() !== "") {
      setNewQuestion((prev) => ({
        ...prev,
        options: [...(prev.options || []), currentOption.trim()], // Use an empty array as fallback
      }));
      setCurrentOption("");
    }
  };

  const handleRemoveOption = (index: number) => {
    setNewQuestion((prev) => ({
      ...prev,
      options: prev.options?.filter((_, i) => i !== index) || [], // Use an empty array as fallback
    }));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="question_text">Question Text</Label>
        <Input
          id="question_text"
          value={newQuestion.question_text}
          onChange={(e) => setNewQuestion({ ...newQuestion, question_text: e.target.value })}
          placeholder="Enter question text"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="question_type">Question Type</Label>
        <Select
          onValueChange={(value: string) => // Explicitly type `value` as string
          setNewQuestion({ ...newQuestion, question_type: value as SurveyQuestion["question_type"] }) // Optionally cast to `SurveyQuestion["question_type"]`
        }
          value={newQuestion.question_type}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select question type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {newQuestion.question_type === "multiple_choice" && (
        <div className="space-y-2">
          <Label htmlFor="option">Add Option</Label>
          <div className="flex space-x-2">
            <Input
              id="option"
              value={currentOption}
              onChange={(e) => setCurrentOption(e.target.value)}
              placeholder="Enter option"
            />
            <Button onClick={handleAddOption} className="bg-green hover:bg-emerald-400">Add</Button>
          </div>
          <div className="space-y-1">
          {newQuestion.options?.map((option, index) => (
            <div key={index} className="flex items-center justify-between p-2 border rounded">
              <span>{option}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  setNewQuestion((prev) => ({
                    ...prev,
                    options: prev.options?.filter((_, i) => i !== index) || [],
                  }))
                }
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          </div>
        </div>
      )}
      <Button onClick={handleAddQuestion} className="w-full">
        Add Question
      </Button>
      <div className="space-y-2">
        {questions.map((question) => (
          <div key={question.id} className="flex items-center justify-between p-2 border rounded">
            <span>{question.question_text}</span>
            <Button variant="ghost" size="icon" onClick={() => onRemoveQuestion(question.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuestionList

