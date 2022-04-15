import { SurveyResultModel } from '@/domain/models/survey-result.model'

export interface LoadSurveyResultRepository {
  loadBySurveyId: (surveyId: string) => Promise<SurveyResultModel>
}
