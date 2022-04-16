import { SaveSurveyResultParams } from '@/domain/usecases'

export type SaveSurveyResultModel = SaveSurveyResultParams

export interface SaveSurveyResultRepository {
  save: (saveSurveyResultParams: SaveSurveyResultModel) => Promise<void>
}
