"use client"

import { useState } from "react"
import { PlusCircle, MinusCircle, ChevronDown, ChevronUp, Eye, Save, ArrowUp, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"

type Question = {
  id: string;
  type: "multiple_choice" | "rating" | "open_ended" | "yes_no";
  text: string;
  options?: string[];
  conditionalLogic?: {
    questionId: string;
    answer: string;
    action: "show" | "hide";
  };
};



export function EnhancedSurveyCreatorComponent() {
  const [surveyTitle, setSurveyTitle] = useState("")
  const [surveyDescription, setSurveyDescription] = useState("")
  const [questions, setQuestions] = useState<Question[]>([])
  const [rewardType, setRewardType] = useState("percentage")
  const [rewardValue, setRewardValue] = useState("")
  const [showPreview, setShowPreview] = useState(false)
  

  // Correctly typed question bank
  const questionBank: Omit<Question, 'id'>[] = [
    { text: "How satisfied are you with our product selection?", type: "rating" },
    { text: "Would you recommend our store to a friend?", type: "yes_no" },
    { text: "What improvements would you like to see in our store?", type: "open_ended" },
    { text: "How often do you shop at our store?", type: "multiple_choice", options: ["Weekly", "Monthly", "Rarely"] },
  ];

  // Refactored handleAddQuestion with proper type checking
  const handleAddQuestion = (bankQuestion?: Omit<Question, 'id'>) => {
    const newQuestion: Question = {
      id: Date.now().toString(), // Generate unique ID
      text: bankQuestion?.text || "",
      type: bankQuestion?.type || "multiple_choice",  // Default to "multiple_choice"
      options: bankQuestion?.options || (bankQuestion?.type === "multiple_choice" ? [""] : undefined),
    };

    setQuestions([...questions, newQuestion]);
  };
  
  

  const handleRemoveQuestion = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index)
    setQuestions(newQuestions)
  }

  const handleQuestionChange = (index: number, field: string, value: any) => {
    const newQuestions = [...questions]
    newQuestions[index] = { ...newQuestions[index], [field]: value }
    setQuestions(newQuestions)
  }

  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    const newQuestions = [...questions]
    newQuestions[questionIndex].options = [
      ...(newQuestions[questionIndex].options || []).slice(0, optionIndex),
      value,
      ...(newQuestions[questionIndex].options || []).slice(optionIndex + 1)
    ]
    setQuestions(newQuestions)
  }

  const handleAddOption = (questionIndex: number) => {
    const newQuestions = [...questions]
    newQuestions[questionIndex].options = [...(newQuestions[questionIndex].options || []), ""]
    setQuestions(newQuestions)
  }

  const handleRemoveOption = (questionIndex: number, optionIndex: number) => {
    const newQuestions = [...questions]
    newQuestions[questionIndex].options = (newQuestions[questionIndex].options || []).filter((_, i) => i !== optionIndex)
    setQuestions(newQuestions)
  }

  const handleMoveQuestion = (index: number, direction: "up" | "down") => {
    if ((direction === "up" && index > 0) || (direction === "down" && index < questions.length - 1)) {
      const newQuestions = [...questions]
      const temp = newQuestions[index]
      newQuestions[index] = newQuestions[index + (direction === "up" ? -1 : 1)]
      newQuestions[index + (direction === "up" ? -1 : 1)] = temp
      setQuestions(newQuestions)
    }
  }

  const handleAddConditionalLogic = (questionIndex: number) => {
    const newQuestions = [...questions]
    newQuestions[questionIndex].conditionalLogic = {
      questionId: "",
      answer: "",
      action: "show"
    }
    setQuestions(newQuestions)
  }

  const handleConditionalLogicChange = (
    questionIndex: number, 
    field: "questionId" | "answer" | "action", 
    value: string
  ) => {
    const newQuestions = [...questions];
    const logic = newQuestions[questionIndex].conditionalLogic;
  
    if (logic) {
      if (field === "action") {
        // Strict check for "show" or "hide"
        logic[field] = value as "show" | "hide"; 
      } else {
        logic[field] = value;
      }
    }
    setQuestions(newQuestions);
  };
  
  
  

  const handleSaveSurvey = () => {
    console.log("Saving survey:", { surveyTitle, surveyDescription, questions, rewardType, rewardValue })
    alert("Survey saved successfully!")
  }

  const renderQuestionPreview = (question: Question) => {
    switch (question.type) {
      case "multiple_choice":
        return (
          <div>
            <p>{question.text}</p>
            {question.options?.map((option, index) => (
              <div key={index}>
                <input type="radio" id={`q${question.id}-o${index}`} name={`q${question.id}`} />
                <label htmlFor={`q${question.id}-o${index}`}>{option}</label>
              </div>
            ))}
          </div>
        )
      case "rating":
        return (
          <div>
            <p>{question.text}</p>
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="text-2xl cursor-pointer">★</span>
            ))}
          </div>
        )
      case "open_ended":
        return (
          <div>
            <p>{question.text}</p>
            <textarea rows={3} className="w-full border rounded p-2" />
          </div>
        )
      case "yes_no":
        return (
          <div>
            <p>{question.text}</p>
            <div>
              <input type="radio" id={`q${question.id}-yes`} name={`q${question.id}`} />
              <label htmlFor={`q${question.id}-yes`}>Yes</label>
            </div>
            <div>
              <input type="radio" id={`q${question.id}-no`} name={`q${question.id}`} />
              <label htmlFor={`q${question.id}-no`}>No</label>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto p-6">
      <Card className="border shadow-lg">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold mb-6">Create Customer Survey</h1>
          
          <div className="mb-6">
            <Label htmlFor="title">Survey Title</Label>
            <Input
              id="title"
              value={surveyTitle}
              onChange={(e) => setSurveyTitle(e.target.value)}
              placeholder="Enter survey title"
            />
          </div>

          <div className="mb-6">
            <Label htmlFor="description">Survey Description</Label>
            <Textarea
              id="description"
              value={surveyDescription}
              onChange={(e) => setSurveyDescription(e.target.value)}
              placeholder="Enter survey description"
            />
          </div>

          <Accordion type="single" collapsible className="mb-6">
            <AccordionItem value="questions">
              <AccordionTrigger>Questions</AccordionTrigger>
              <AccordionContent>
                {questions.map((question, index) => (
                  <div key={question.id} className="mb-6 p-4 border rounded">
                    <div className="mb-4 flex items-center gap-2">
                      <Label htmlFor={`question-${index}`}>Question {index + 1}</Label>
                      <Button variant="outline" size="sm" onClick={() => handleMoveQuestion(index, "up")}>
                        <ArrowUp className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleMoveQuestion(index, "down")}>
                        <ArrowDown className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleRemoveQuestion(index)}>
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex gap-2 mb-2">
                      <Input
                        id={`question-${index}`}
                        value={question.text}
                        onChange={(e) => handleQuestionChange(index, "text", e.target.value)}
                        placeholder="Enter question"
                      />
                      <Select
                        value={question.type}
                        onValueChange={(value) => handleQuestionChange(index, "type", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                          <SelectItem value="rating">Rating</SelectItem>
                          <SelectItem value="open_ended">Open Ended</SelectItem>
                          <SelectItem value="yes_no">Yes/No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {question.type === "multiple_choice" && (
                      <div className="ml-4">
                        {question.options?.map((option, optionIndex) => (
                          <div key={optionIndex} className="flex items-center gap-2 mb-2">
                            <Input
                              value={option}
                              onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                              placeholder={`Option ${optionIndex + 1}`}
                            />
                            <Button variant="outline" onClick={() => handleRemoveOption(index, optionIndex)}>
                              <MinusCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button variant="outline" onClick={() => handleAddOption(index)}>
                          <PlusCircle className="h-4 w-4 mr-2" /> Add Option
                        </Button>
                      </div>
                    )}
                    <div className="mt-4">
                      <Button variant="outline" onClick={() => handleAddConditionalLogic(index)}>
                        Add Conditional Logic
                      </Button>
                      {question.conditionalLogic && (
                        <div className="mt-2 p-2 border rounded">
                          <Select
                            value={question.conditionalLogic.questionId}
                            onValueChange={(value) => handleConditionalLogicChange(index, "questionId", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select question" />
                            </SelectTrigger>
                            <SelectContent>
                              {questions.slice(0, index).map((q) => (
                                <SelectItem key={q.id} value={q.id}>{q.text}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Input
                            className="mt-2"
                            placeholder="Enter answer"
                            value={question.conditionalLogic.answer}
                            onChange={(e) => handleConditionalLogicChange(index, "answer", e.target.value)}
                          />
                          <Select
  value={question.conditionalLogic?.action || "show"}
  onValueChange={(value: "show" | "hide") => handleConditionalLogicChange(index, "action", value)}
>
  <SelectTrigger>
    <SelectValue />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="show">Show</SelectItem>
    <SelectItem value="hide">Hide</SelectItem>
  </SelectContent>
</Select>


                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <Button onClick={() => handleAddQuestion()}>
                  <PlusCircle className="h-4 w-4 mr-2" /> Add Question
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible className="mb-6">
            <AccordionItem value="question-bank">
              <AccordionTrigger>Question Bank</AccordionTrigger>
              <AccordionContent>
                {questionBank.map((question, index) => (
                  <div key={index} className="mb-2 p-2 border rounded flex justify-between items-center">
                    <span>{question.text}</span>
                    <Button variant="outline" onClick={() => handleAddQuestion(question)}>
                      <PlusCircle className="h-4 w-4 mr-2" /> Add
                    </Button>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="single" collapsible className="mb-6">
            <AccordionItem value="rewards">
              <AccordionTrigger>Reward System</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="reward-type">Reward Type</Label>
                    <Select value={rewardType} onValueChange={setRewardType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage Discount</SelectItem>
                        <SelectItem value="amount">Amount Discount</SelectItem>
                        <SelectItem value="product">Product Discount</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="reward-value">Reward Value</Label>
                    <Input
                      id="reward-value"
                      value={rewardValue}
                      onChange={(e) => setRewardValue(e.target.value)}
                      placeholder={rewardType === "percentage" ? "Enter percentage" : "Enter amount"}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-apply" />
                    <Label  htmlFor="auto-apply">Automatically apply reward on completion</Label>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex justify-end space-x-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" onClick={() => setShowPreview(true)}>
                  <Eye className="h-4 w-4 mr-2" /> Preview
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{surveyTitle}</DialogTitle>
                  <DialogDescription>{surveyDescription}</DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  {questions.map((question) => (
                    <div key={question.id} className="mb-4">
                      {renderQuestionPreview(question)}
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
            <Button onClick={handleSaveSurvey}>
              <Save className="h-4 w-4 mr-2" /> Save Survey
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}