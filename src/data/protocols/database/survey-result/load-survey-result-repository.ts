import { SurveyResultModel } from '@/domain/models'

export type SurveyResult = SurveyResultModel

export interface LoadSurveyResultRepository {
  loadBySurveyId: (surveyId: string, account: string) => Promise<SurveyResult>
}
