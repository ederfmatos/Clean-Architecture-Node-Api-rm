import { SurveyResultModel } from '@/domain/models/survey-result.model'

export type LoadSurveyResult = {
  load: (surveyId: string, accountId: string) => Promise<SurveyResultModel>
}
