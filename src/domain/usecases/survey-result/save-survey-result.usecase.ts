import { SurveyResultModel } from '@/domain/models/survey-result.model'

export type SaveSurveyResultParams = Omit<SurveyResultModel, 'id'>

export type SaveSurveyResult = {
  save: (SaveSurveyResultParams: SaveSurveyResultParams) => Promise<SurveyResultModel>
}
