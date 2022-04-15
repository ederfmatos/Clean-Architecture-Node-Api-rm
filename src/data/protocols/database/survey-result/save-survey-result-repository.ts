import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result.usecase'

export interface SaveSurveyResultRepository {
  save: (SaveSurveyResultParams: SaveSurveyResultParams) => Promise<void>
}
