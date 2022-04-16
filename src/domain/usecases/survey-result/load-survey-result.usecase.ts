import { SurveyResultModel } from '@/domain/models'

export type LoadSurveyResult = {
  load: (surveyId: string, accountId: string) => Promise<SurveyResultModel>
}
