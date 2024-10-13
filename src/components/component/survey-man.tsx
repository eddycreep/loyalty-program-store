"use client"

import { useState } from "react"
import { apiEndPoint, colors } from '@/utils/colors';
import { PlusCircle, Save, Trash2, Edit, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
//import { toast } from "@/components/ui/use-toast"
import { toast } from 'react-hot-toast';

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

export function SurveyMan() {
    const [surveys, setSurveys] = useState<Survey[]>([])
    const [questions, setQuestions] = useState<Question[]>([])
    const [newSurvey, setNewSurvey] = useState<Survey>({
      id: "",
      title: "",
      questions: []
    })
    const [newQuestions, setNewQuestions] = useState<Question[]>([{
      id: Date.now().toString(),
      text: "",
      type: "multiple-choice",
      choices: [""]
    }])
    const [individualQuestion, setIndividualQuestion] = useState<Question>({
      id: "",
      text: "",
      type: "multiple-choice",
      choices: [""],
      survey: ""
    })

    const addQuestionToSurvey = () => {
      setNewQuestions([...newQuestions, {
        id: Date.now().toString(),
        text: "",
        type: "multiple-choice",
        choices: [""]
      }])
    }

    const updateNewQuestion = (index: number, updatedQuestion: Partial<Question>) => {
      setNewQuestions(newQuestions.map((q, i) => 
        i === index ? { ...q, ...updatedQuestion } : q
      ))
    }

    const removeNewQuestion = (index: number) => {
      setNewQuestions(newQuestions.filter((_, i) => i !== index))
    }

    const updateQuestionChoice = (questionIndex: number, choiceIndex: number, value: string) => {
      setNewQuestions(newQuestions.map((q, i) => 
        i === questionIndex
          ? { ...q, choices: q.choices?.map((c, j) => j === choiceIndex ? value : c) }
          : q
      ))
    }

    const addQuestionChoice = (questionIndex: number) => {
      setNewQuestions(newQuestions.map((q, i) => 
        i === questionIndex
          ? { ...q, choices: [...(q.choices || []), ""] }
          : q
      ))
    }

    const removeQuestionChoice = (questionIndex: number, choiceIndex: number) => {
      setNewQuestions(newQuestions.map((q, i) => 
        i === questionIndex
          ? { ...q, choices: q.choices?.filter((_, j) => j !== choiceIndex) }
          : q
      ))
    }

    const saveSurvey = () => {
      if (newSurvey.title && newQuestions.length > 0) {
      const surveyToSave = {
          ...newSurvey,
          id: Date.now().toString(),
          questions: newQuestions.filter(q => q.text.trim() !== "")
      }
      setSurveys([...surveys, surveyToSave])
      setNewSurvey({ id: "", title: "", questions: [] })
      setNewQuestions([{
          id: Date.now().toString(),
          text: "",
          type: "multiple-choice",
          choices: [""]
      }])
      //   toast({
      //     title: "Survey Saved",
      //     description: "Your new survey has been successfully saved.",
      //   })
      toast.success("Your new survey has been successfully saved.", {
          icon: <Check color={colors.green} size={24} />,
          duration: 3000,
      });
      } else {
      //   toast({
      //     title: "Error",
      //     description: "Please add a title and at least one question to the survey.",
      //     variant: "destructive",
      //   })
      toast.error("Please add a title and at least one question to the survey.", {
          icon: <X color={colors.red} size={24} />,
          duration: 3000,
      });
      }
  }

    const addIndividualQuestion = () => {
      if (individualQuestion.text && individualQuestion.survey) {
        setQuestions([...questions, { ...individualQuestion, id: Date.now().toString() }])
        setIndividualQuestion({ id: "", text: "", type: "multiple-choice", choices: [""], survey: "" })
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
                  <input type="radio" id={`preview-option-${question.id}-${index}`} name={`preview-options-${question.id}`} />
                  <label htmlFor={`preview-option-${question.id}-${index}`}>{choice}</label>
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
      <div className="container mx-auto p-4">
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
                <CardDescription>Add a title and multiple questions to your new survey.</CardDescription>
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
                
                {newQuestions.map((question, questionIndex) => (
                  <Card key={question.id}>
                    <CardHeader>
                      <CardTitle>Question {questionIndex + 1}</CardTitle>
                      <Button variant="outline" size="icon" onClick={() => removeNewQuestion(questionIndex)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`question-text-${questionIndex}`}>Question Text</Label>
                        <Input
                          id={`question-text-${questionIndex}`}
                          value={question.text}
                          onChange={(e) => updateNewQuestion(questionIndex, { text: e.target.value })}
                          placeholder="Enter your question here"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor={`question-type-${questionIndex}`}>Question Type</Label>
                        <Select
                          value={question.type}
                          onValueChange={(value: QuestionType) => updateNewQuestion(questionIndex, { type: value, choices: value === "text-response" ? undefined : [""] })}
                        >
                          <SelectTrigger id={`question-type-${questionIndex}`}>
                            <SelectValue placeholder="Select question type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                            <SelectItem value="text-response">Text Response</SelectItem>
                            <SelectItem value="rating-scale">Rating Scale</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {(question.type === "multiple-choice" || question.type === "rating-scale") && (
                        <div className="space-y-2">
                          <Label>Answer Choices</Label>
                          {question.choices?.map((choice, choiceIndex) => (
                            <div key={choiceIndex} className="flex items-center space-x-2">
                              <Input
                                value={choice}
                                onChange={(e) => updateQuestionChoice(questionIndex, choiceIndex, e.target.value)}
                                placeholder={`Choice ${choiceIndex + 1}`}
                              />
                              <Button variant="outline" size="icon" onClick={() => removeQuestionChoice(questionIndex, choiceIndex)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <Button variant="outline" onClick={() => addQuestionChoice(questionIndex)}>
                            <PlusCircle className="mr-2 h-4 w-4" /> Add Choice
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
                
                <Button onClick={addQuestionToSurvey}>
                  <PlusCircle className="mr-2 h-4 w-4" /> Add Another Question
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
                {newQuestions.map((question, index) => (
                  <div key={question.id} className="border-b pb-4 last:border-b-0">
                    <h4 className="font-medium text-lg mb-2">Question {index + 1}</h4>
                    {renderQuestionPreview(question)}
                  </div>
                ))}
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
                    value={individualQuestion.text}
                    onChange={(e) => setIndividualQuestion({ ...individualQuestion, text: e.target.value })}
                    placeholder="Enter your question here"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="question-type-individual">Question Type</Label>
                  <Select
                    value={individualQuestion.type}
                    onValueChange={(value: QuestionType) => setIndividualQuestion({ ...individualQuestion, type: value, choices: value === "text-response" ? undefined : [""] })}
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
                
                {(individualQuestion.type === "multiple-choice" || individualQuestion.type === "rating-scale") && (
                  <div className="space-y-2">
                    <Label>Answer Choices</Label>
                    {individualQuestion.choices?.map((choice, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={choice}
                          onChange={(e) => setIndividualQuestion({
                            ...individualQuestion,
                            choices: individualQuestion.choices?.map((c, i) => i === index ? e.target.value : c)
                          })}
                          placeholder={`Choice ${index + 1}`}
                        />
                        <Button variant="outline" size="icon" onClick={() => setIndividualQuestion({
                          ...individualQuestion,
                          choices: individualQuestion.choices?.filter((_, i) => i !== index)
                        })}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button variant="outline" onClick={() => setIndividualQuestion({
                      ...individualQuestion,
                      choices: [...(individualQuestion.choices || []), ""]
                    })}>
                      <PlusCircle className="mr-2 h-4 w-4" /> Add Choice
                    </Button>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="survey-assignment">Assign to Survey</Label>
                  <Select
                    value={individualQuestion.survey}
                    onValueChange={(value) => setIndividualQuestion({ ...individualQuestion, survey: value })}
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