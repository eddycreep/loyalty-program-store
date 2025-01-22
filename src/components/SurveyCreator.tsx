"use client"

import type React from "react"
import { useState } from "react"
import type { Survey, SurveyDetails, SurveyQuestion } from "../../types/survey"
import SurveyDetailsForm from "./SurveyDetailsForm"
import QuestionList from "./QuestionList"
import SurveyPreview from "./SurveyPreview"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "react-hot-toast";


const SurveyCreator: React.FC = () => {
  const [survey, setSurvey] = useState<Survey>({
    survey_title: "",
    survey_category: "",
    store_id: "",
    region: "",
    loyalty_tier: "",
    start_date: "",
    expiry_date: "",
    isActive: false,
    questions: [],
  })

  const [activeTab, setActiveTab] = useState("details")

  const handleSurveyDetailsChange = (details: SurveyDetails) => {
    setSurvey((prev) => ({ ...prev, ...details }))
  }

  const handleAddQuestion = (question: SurveyQuestion) => {
    if (survey.questions.length >= 5) {
      toast.error("Maximum questions reached. You can only add up to 5 questions per survey.");
      return;
    }
    setSurvey((prev) => ({
      ...prev,
      questions: [...prev.questions, { ...question, id: Date.now() }],
    }));
  };

  const handleRemoveQuestion = (id: number) => {
    setSurvey((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== id),
    }))
  }

  const handleSaveSurvey = () => {
    // Here you would typically send the data to your backend
    console.log("Saving survey:", survey);
    toast.success("Survey saved successfully!");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        {/* <CardTitle className="text-2xl font-bold text-center">Create New Survey</CardTitle> */}
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Survey Details</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <SurveyDetailsForm details={survey} onChange={handleSurveyDetailsChange} />
          </TabsContent>
          <TabsContent value="questions">
            <QuestionList
              questions={survey.questions}
              onAddQuestion={handleAddQuestion}
              onRemoveQuestion={handleRemoveQuestion}
            />
          </TabsContent>
          <TabsContent value="preview">
            <SurveyPreview survey={survey} />
          </TabsContent>
        </Tabs>
        <div className="mt-6 flex justify-end space-x-4">
          <Button onClick={() => setActiveTab("preview")} className="bg-orange hover:bg-amber-500">Preview</Button>
          <Button onClick={handleSaveSurvey} className="bg-green hover:bg-emerald-400">Save Survey</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default SurveyCreator

