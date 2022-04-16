import { LoadSurveyResultRepository, LoadSurveyByIdRepository } from '@/data/protocols'
import { SurveyResultModel } from '@/domain/models'
import { LoadSurveyResult } from '@/domain/usecases'

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor (
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository,
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) {}

  async load (surveyId: string, accountId: string): Promise<SurveyResultModel> {
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId, accountId)
    if (surveyResult) {
      return surveyResult
    }

    const survey = await this.loadSurveyByIdRepository.loadById(surveyId)
    return {
      question: survey.question,
      date: survey.date,
      surveyId: survey.id,
      answers: survey.answers.map(({ answer, image }) => ({
        answer,
        image,
        count: 0,
        percent: 0,
        isCurrentAccountAnswer: false
      }))
    }
  }
}
