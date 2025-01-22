import type React from "react"
import type { Survey } from "../../types/survey"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckCircle2 } from "lucide-react"

interface SurveyPreviewProps {
  survey: Survey
}

const SurveyPreview: React.FC<SurveyPreviewProps> = ({ survey }) => {
  const isSurveyEmpty =
    Object.values(survey).every((value) => value === "" || value === false) && survey.questions.length === 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>{survey.survey_title || "Survey Preview"}</CardTitle>
      </CardHeader>
      <CardContent>
        {isSurveyEmpty ? (
          <div className="flex items-center justify-center space-x-2 text-green">
            <CheckCircle2 className="h-6 w-6" />
            <span>Your survey is ready to be created</span>
          </div>
        ) : (
          <div className="space-y-4">
            {survey.questions.map((question) => (
              <div key={question.id} className="space-y-2">
                <Label>{question.question_text}</Label>
                {question.question_type === "multiple_choice" && (
                  <RadioGroup>
                    {question.options &&
                      question.options.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <RadioGroupItem value={`option${index + 1}`} id={`${question.id}-option${index + 1}`} />
                          <Label htmlFor={`${question.id}-option${index + 1}`}>{option}</Label>
                        </div>
                      ))}
                  </RadioGroup>
                )}
                {question.question_type === "text" && <Input placeholder="Enter your answer" />}
                {question.question_type === "rating" && (
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <Label key={rating} className="flex flex-col items-center">
                        <Input type="radio" name={`rating-${question.id}`} className="sr-only" />
                        <span className="text-2xl cursor-pointer">⭐</span>
                        <span>{rating}</span>
                      </Label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default SurveyPreview

