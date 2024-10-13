"use client"

import { useState } from "react"
import { PlusCircle, Edit, Trash2, Save, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
//import { toast } from "@/components/ui/use-toast"
import { toast } from 'react-hot-toast';
import { apiEndPoint, colors } from '@/utils/colors';

type QuestionType = "multiple-choice" | "text-response" | "rating-scale"

interface Question {
  id: string
  text: string
  type: QuestionType
  survey: string
}

export function SurveyManagerComponent() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [surveys, setSurveys] = useState<string[]>(["Customer Satisfaction", "Product Feedback"])
  const [newQuestion, setNewQuestion] = useState<Question>({
    id: "",
    text: "",
    type: "multiple-choice",
    survey: ""
  })

  const addQuestion = () => {
    if (newQuestion.text && newQuestion.survey) {
      setQuestions([...questions, { ...newQuestion, id: Date.now().toString() }])
      setNewQuestion({ id: "", text: "", type: "multiple-choice", survey: "" })
    }
  }

  const updateQuestion = (id: string, updatedQuestion: Partial<Question>) => {
    setQuestions(questions.map(q => (q.id === id ? { ...q, ...updatedQuestion } : q)))
  }

  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id))
  }

  const saveSurvey = () => {
    // Here you would typically send the data to a backend API
    toast.success('The survey has successfully been saved', {
      icon: <Check color={colors.green} size={24} />,
      duration: 3000,
    });
  }

  const renderQuestionPreview = (question: Question) => {
    switch (question.type) {
      case "multiple-choice":
        return (
          <div className="space-y-2">
            <p>{question.text}</p>
            {["Option 1", "Option 2", "Option 3"].map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input type="radio" id={`option-${index}`} name="preview-options" />
                <label htmlFor={`option-${index}`}>{option}</label>
              </div>
            ))}
          </div>
        )
      case "text-response":
        return (
          <div className="space-y-2">
            <p>{question.text}</p>
            <textarea className="w-full p-2 border rounded" rows={3} placeholder="Enter your response here..."></textarea>
          </div>
        )
      case "rating-scale":
        return (
          <div className="space-y-2">
            <p>{question.text}</p>
            <div className="flex space-x-4">
              {[1, 2, 3, 4, 5].map(rating => (
                <button key={rating} className="px-3 py-1 border rounded hover:bg-gray-100">{rating}</button>
              ))}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Survey Manager</h1>
      
      <Tabs defaultValue="create">
        <TabsList>
          <TabsTrigger value="create">Create Survey</TabsTrigger>
          <TabsTrigger value="overview">Survey Overview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="create" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Add Survey Question</CardTitle>
              <CardDescription>Create a new question and assign it to a survey.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="question-text">Question Text</Label>
                <Input
                  id="question-text"
                  value={newQuestion.text}
                  onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
                  placeholder="Enter your question here"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="question-type">Question Type</Label>
                <Select
                  value={newQuestion.type}
                  onValueChange={(value: QuestionType) => setNewQuestion({ ...newQuestion, type: value })}
                >
                  <SelectTrigger id="question-type">
                    <SelectValue placeholder="Select question type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                    <SelectItem value="text-response">Text Response</SelectItem>
                    <SelectItem value="rating-scale">Rating Scale</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="survey-assignment">Assign to Survey</Label>
                <Select
                  value={newQuestion.survey}
                  onValueChange={(value) => setNewQuestion({ ...newQuestion, survey: value })}
                >
                  <SelectTrigger id="survey-assignment">
                    <SelectValue placeholder="Select a survey" />
                  </SelectTrigger>
                  <SelectContent>
                    {surveys.map((survey) => (
                      <SelectItem key={survey} value={survey}>{survey}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={addQuestion}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Question
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Question Preview</CardTitle>
              <CardDescription>Live preview of the question being created.</CardDescription>
            </CardHeader>
            <CardContent>
              {renderQuestionPreview(newQuestion)}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Question Management</CardTitle>
              <CardDescription>Edit or delete existing questions.</CardDescription>
            </CardHeader>
            <CardContent>
              {questions.map((question) => (
                <div key={question.id} className="flex items-center justify-between p-4 border-b last:border-b-0">
                  <div>
                    <p className="font-medium">{question.text}</p>
                    <p className="text-sm text-gray-500">Type: {question.type}, Survey: {question.survey}</p>
                  </div>
                  <div className="space-x-2">
                    <Button variant="outline" size="icon" onClick={() => updateQuestion(question.id, { text: prompt("Edit question:", question.text) || question.text })}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => deleteQuestion(question.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Button onClick={saveSurvey} className="w-full">
            <Save className="mr-2 h-4 w-4" /> Save Survey
          </Button>
        </TabsContent>
        
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Survey Overview</CardTitle>
              <CardDescription>Review all saved surveys and their questions.</CardDescription>
            </CardHeader>
            <CardContent>
              {surveys.map((survey) => (
                <div key={survey} className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">{survey}</h3>
                  <div className="space-y-2">
                    {questions.filter(q => q.survey === survey).map((question) => (
                      <div key={question.id} className="p-2 bg-gray-100 rounded">
                        <p>{question.text}</p>
                        <p className="text-sm text-gray-500">Type: {question.type}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}