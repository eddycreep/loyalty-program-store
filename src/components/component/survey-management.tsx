"use client"

import { useState } from "react";
import { PlusCircle, Save, Trash2, Edit, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
//import { toast } from "@/components/ui/use-toast";
import { toast } from 'react-hot-toast';
import { apiEndPoint, colors } from '@/utils/colors';

type QuestionType = "multiple-choice" | "text-response" | "rating-scale"

interface Question {
  id: string
  text: string
  type: QuestionType
  choices?: string[]
  survey?: string
}

interface Survey {
  id: string
  title: string
  questions: Question[]
}

export function SurveyManagement() {
  const [surveys, setSurveys] = useState<Survey[]>([])
  const [questions, setQuestions] = useState<Question[]>([])
  const [newSurvey, setNewSurvey] = useState<Survey>({
    id: "",
    title: "",
    questions: []
  })
  const [newQuestion, setNewQuestion] = useState<Question>({
    id: "",
    text: "",
    type: "multiple-choice",
    choices: [""],
    survey: ""
  })

  const addQuestionToSurvey = () => {
    if (newQuestion.text) {
      setNewSurvey({
        ...newSurvey,
        questions: [...newSurvey.questions, { ...newQuestion, id: Date.now().toString() }]
      })
      setNewQuestion({ id: "", text: "", type: "multiple-choice", choices: [""], survey: "" })
    }
  }

  const addIndividualQuestion = () => {
    if (newQuestion.text && newQuestion.survey) {
      setQuestions([...questions, { ...newQuestion, id: Date.now().toString() }])
      setNewQuestion({ id: "", text: "", type: "multiple-choice", choices: [""], survey: "" })
    }
  }

  const updateQuestionChoice = (index: number, value: string) => {
    const updatedChoices = [...(newQuestion.choices || [])]
    updatedChoices[index] = value
    setNewQuestion({ ...newQuestion, choices: updatedChoices })
  }

  const addQuestionChoice = () => {
    setNewQuestion({ ...newQuestion, choices: [...(newQuestion.choices || []), ""] })
  }

  const removeQuestionChoice = (index: number) => {
    const updatedChoices = [...(newQuestion.choices || [])]
    updatedChoices.splice(index, 1)
    setNewQuestion({ ...newQuestion, choices: updatedChoices })
  }

  const saveSurvey = () => {
    if (newSurvey.title && newSurvey.questions.length > 0) {
      setSurveys([...surveys, { ...newSurvey, id: Date.now().toString() }])
      setNewSurvey({ id: "", title: "", questions: [] })
      // toast({
      //   title: "Survey Saved",
      //   description: "Your new survey has been successfully saved.",
      // })
      toast.success('There is no available data between the selected date periods!', {
        icon: <Check color={colors.green} size={24} />,
        duration: 3000,
      });
    } else {
      // toast({
      //   title: "Error",
      //   description: "Please add a title and at least one question to the survey.",
      //   variant: "destructive",
      // })
      toast.error('Please add a title and at least one question to the survey.', {
        icon: <X color={colors.red} size={24} />,
        duration: 3000,
      });
    }
  }

  const updateQuestion = (id: string, updatedQuestion: Partial<Question>) => {
    setQuestions(questions.map(q => (q.id === id ? { ...q, ...updatedQuestion } : q)))
  }

  const deleteQuestion = (id: string) => {
    setQuestions(questions.filter(q => q.id !== id))
  }

  const renderQuestionPreview = (question: Question) => {
    switch (question.type) {
      case "multiple-choice":
        return (
          <div className="space-y-2">
            <p className="font-medium">{question.text}</p>
            {question.choices?.map((choice, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input type="radio" id={`preview-option-${index}`} name={`preview-options-${question.id}`} />
                <label htmlFor={`preview-option-${index}`}>{choice}</label>
              </div>
            ))}
          </div>
        )
      case "text-response":
        return (
          <div className="space-y-2">
            <p className="font-medium">{question.text}</p>
            <Textarea placeholder="Enter your response here..." />
          </div>
        )
      case "rating-scale":
        return (
          <div className="space-y-2">
            <p className="font-medium">{question.text}</p>
            <div className="flex space-x-4">
              {question.choices?.map((choice, index) => (
                <button key={index} className="px-3 py-1 border rounded hover:bg-gray-100">{choice}</button>
              ))}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold">Survey Manager</h1>
      
      <Tabs defaultValue="create-survey">
        <TabsList>
          <TabsTrigger value="create-survey">Create Survey</TabsTrigger>
          <TabsTrigger value="add-question">Add Individual Question</TabsTrigger>
          <TabsTrigger value="overview">Survey Overview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="create-survey" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Create New Survey</CardTitle>
              <CardDescription>Add a title and questions to your new survey.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="survey-title">Survey Title</Label>
                <Input
                  id="survey-title"
                  value={newSurvey.title}
                  onChange={(e) => setNewSurvey({ ...newSurvey, title: e.target.value })}
                  placeholder="Enter survey title"
                />
              </div>
              
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
                  onValueChange={(value: QuestionType) => setNewQuestion({ ...newQuestion, type: value, choices: value === "text-response" ? undefined : [""] })}
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
              
              {(newQuestion.type === "multiple-choice" || newQuestion.type === "rating-scale") && (
                <div className="space-y-2">
                  <Label>Answer Choices</Label>
                  {newQuestion.choices?.map((choice, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={choice}
                        onChange={(e) => updateQuestionChoice(index, e.target.value)}
                        placeholder={`Choice ${index + 1}`}
                      />
                      <Button variant="outline" size="icon" onClick={() => removeQuestionChoice(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" onClick={addQuestionChoice}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Choice
                  </Button>
                </div>
              )}
              
              <Button onClick={addQuestionToSurvey}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Question to Survey
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Survey Preview</CardTitle>
              <CardDescription>Live preview of the survey being created.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-xl font-semibold">{newSurvey.title || "Untitled Survey"}</h3>
              {newSurvey.questions.map((question) => (
                <div key={question.id} className="border-b pb-4 last:border-b-0">
                  {renderQuestionPreview(question)}
                </div>
              ))}
              {newQuestion.text && (
                <div className="border-t pt-4">
                  <p className="text-sm text-muted-foreground mb-2">Preview of current question:</p>
                  {renderQuestionPreview(newQuestion)}
                </div>
              )}
            </CardContent>
          </Card>

          <Button onClick={saveSurvey} className="w-full">
            <Save className="mr-2 h-4 w-4" /> Save Survey
          </Button>
        </TabsContent>
        
        <TabsContent value="add-question" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Add Individual Question</CardTitle>
              <CardDescription>Create a new question and assign it to a survey.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="question-text-individual">Question Text</Label>
                <Input
                  id="question-text-individual"
                  value={newQuestion.text}
                  onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
                  placeholder="Enter your question here"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="question-type-individual">Question Type</Label>
                <Select
                  value={newQuestion.type}
                  onValueChange={(value: QuestionType) => setNewQuestion({ ...newQuestion, type: value, choices: value === "text-response" ? undefined : [""] })}
                >
                  <SelectTrigger id="question-type-individual">
                    <SelectValue placeholder="Select question type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                    <SelectItem value="text-response">Text Response</SelectItem>
                    <SelectItem value="rating-scale">Rating Scale</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {(newQuestion.type === "multiple-choice" || newQuestion.type === "rating-scale") && (
                <div className="space-y-2">
                  <Label>Answer Choices</Label>
                  {newQuestion.choices?.map((choice, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        value={choice}
                        onChange={(e) => updateQuestionChoice(index, e.target.value)}
                        placeholder={`Choice ${index + 1}`}
                      />
                      <Button variant="outline" size="icon" onClick={() => removeQuestionChoice(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" onClick={addQuestionChoice}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Choice
                  </Button>
                </div>
              )}
              
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
                      <SelectItem key={survey.id} value={survey.id}>{survey.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button onClick={addIndividualQuestion}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Question
              </Button>
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
                    <p className="text-sm text-gray-500">Type: {question.type}, Survey: {surveys.find(s => s.id === question.survey)?.title}</p>
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
        </TabsContent>
        
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Survey Overview</CardTitle>
              <CardDescription>Review all saved surveys and their questions.</CardDescription>
            </CardHeader>
            <CardContent>
              {surveys.map((survey) => (
                <div key={survey.id} className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">{survey.title}</h3>
                  <div className="space-y-2">
                    {survey.questions.map((question) => (
                      <div key={question.id} className="p-2 bg-gray-100 rounded">
                        <p>{question.text}</p>
                        <p className="text-sm text-gray-500">Type: {question.type}</p>
                        {question.choices && (
                          <ul className="list-disc list-inside text-sm text-gray-500">
                            {question.choices.map((choice, index) => (
                              <li key={index}>{choice}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                    {questions.filter(q => q.survey === survey.id).map((question) => (
                      <div key={question.id} className="p-2 bg-gray-100 rounded">
                        <p>{question.text}</p>
                        <p className="text-sm text-gray-500">Type: {question.type}</p>
                        {question.choices && (
                          <ul className="list-disc list-inside text-sm text-gray-500">
                            {question.choices.map((choice, index) => (
                              <li key={index}>{choice}</li>
                            ))}
                          </ul>
                        )}
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