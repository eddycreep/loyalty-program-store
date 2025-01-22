export interface SurveyDetails {
  survey_title: string
  survey_category: string
  store_id: string
  region: string
  loyalty_tier: string
  start_date: string
  expiry_date: string
  isActive: boolean
}

export interface SurveyQuestion {
  id: number
  question_text: string
  question_type: "multiple_choice" | "text" | "rating"
  options?: string[]
}

export interface Survey extends SurveyDetails {
  questions: SurveyQuestion[]
}

