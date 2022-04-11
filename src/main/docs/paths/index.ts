import { loginPath } from './login'
import { signUpPath } from './signup'
import { surveyResultPath } from './survey-result'
import { surveysPath } from './surveys'

export const paths = {
  '/login': loginPath,
  '/surveys': surveysPath,
  '/signup': signUpPath,
  '/surveys/{surveyId}/results': surveyResultPath
}
