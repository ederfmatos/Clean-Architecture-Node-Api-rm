import { SurveyModel } from '@/data/usecases/add-survey/db-add-survey.protocol'

export interface LoadSurveysRepository {
  findAll: () => Promise<SurveyModel[]>
}
