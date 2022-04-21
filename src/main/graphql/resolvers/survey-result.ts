import { handleApolloServerResolver } from '@/main/adapters'
import { makeLoadSurveyResultController, makeSaveSurveyResultController } from '@/main/factories'

const loadSurveyResultController = makeLoadSurveyResultController()
const saveSurveyController = makeSaveSurveyResultController()

export default {
  Query: {
    surveyResult: async (parent: any, args: any, context: any) => handleApolloServerResolver(loadSurveyResultController, args, context)
  },
  Mutation: {
    saveSurveyResult: async (parent: any, args: any, context: any) => handleApolloServerResolver(saveSurveyController, args, context)
  }
}
