export interface SurveyProps {
    survey_title: string,
    survey_category: string,
    store_id: string,
    region: string,
    loyalty_tier: string,
    start_date: string,
    expiry_date: string,
    isActive: number,
}
export type SurveyResponse = SurveyProps[]

export interface SurveyInfo {
    survey_id: number,
    survey_title: string,
    survey_category: string,
}
export type SurveyInfoResponse = SurveyInfo[]

export interface Question {
    question: string;
    answer: string;
    action: string;
    options?: string[];
}

export interface SurveyQuestions {
    survey_id: number;
    question_text: string;
    question_type: string;
}