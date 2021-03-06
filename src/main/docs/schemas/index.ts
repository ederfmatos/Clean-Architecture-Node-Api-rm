import { accountSchema } from './account.schema'
import { addSurveyInputSchema } from './add-survey-input.schema'
import { errorSchema } from './error.schema'
import { loginInputSchema } from './login-input.schema'
import { signUpInputSchema } from './signup-input.schema'
import { surveyAnswerSchema } from './survey-answer.schema'
import { surveyResultAnswerSchema } from './survey-result-answer.schema'
import { surveyResultInputSchema } from './survey-result-input.schema'
import { surveyResultSchema } from './survey-result.schema'
import { surveySchema } from './survey.schema'
import { surveysSchema } from './surveys.schema'

export const schemas = {
  account: accountSchema,
  loginInput: loginInputSchema,
  error: errorSchema,
  survey: surveySchema,
  surveyAnswer: surveyAnswerSchema,
  surveys: surveysSchema,
  signUpInput: signUpInputSchema,
  addSurveyInput: addSurveyInputSchema,
  surveyResultInput: surveyResultInputSchema,
  surveyResult: surveyResultSchema,
  surveyResultAnswer: surveyResultAnswerSchema
}
