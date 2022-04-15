import { SurveyResultModel } from '@/domain/models/survey-result.model'

export type LoadSurveyResult = {
  load: (surveyId: string) => Promise<SurveyResultModel>
}
