import { handleApolloServerResolver } from '@/main/adapters'
import { makeLoadSurveyResultController, makeSaveSurveyResultController } from '@/main/factories'

const loadSurveyResultController = makeLoadSurveyResultController()
const saveSurveyController = makeSaveSurveyResultController()

export default {
  Query: {
    surveyResult: async (parent: any, args: any) => handleApolloServerResolver(loadSurveyResultController, args)
  },
  Mutation: {
    saveSurveyResult: async (parent: any, args: any) => handleApolloServerResolver(saveSurveyController, args)
  }
}
