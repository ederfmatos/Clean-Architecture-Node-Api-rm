import { accountSchema } from './account.schema'
import { errorSchema } from './error.schema'
import { loginInputSchema } from './login-input.schema'
import { signUpInputSchema } from './signupp-input.schema'
import { surveyAnswerSchema } from './survey-answer.schema'
import { surveySchema } from './survey.schema'
import { surveysSchema } from './surveys.schema'

export const schemas = {
  account: accountSchema,
  loginInput: loginInputSchema,
  error: errorSchema,
  survey: surveySchema,
  surveyAnswer: surveyAnswerSchema,
  surveys: surveysSchema,
  signUpInput: signUpInputSchema
}
