import { SurveyModel } from '@/data/usecases/survey/add-survey/db-add-survey.protocol'

export interface LoadSurveysRepository {
  findAll: (accountId: string) => Promise<SurveyModel[]>
}
