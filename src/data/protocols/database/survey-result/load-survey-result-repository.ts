import { SurveyResultModel } from '@/domain/models/survey-result.model'

export interface LoadSurveyResultRepository {
  loadBySurveyId: (surveyId: string, account: string) => Promise<SurveyResultModel>
}
