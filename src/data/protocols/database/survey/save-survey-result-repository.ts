import { SurveyResultModel } from '@/domain/models/survey-result.model'
import { SaveSurveyResultModel } from '@/domain/usecases/account/save-survey-result.usecase'

export interface SaveSurveyResultRepository {
  save: (saveSurveyResultModel: SaveSurveyResultModel) => Promise<SurveyResultModel>
}
