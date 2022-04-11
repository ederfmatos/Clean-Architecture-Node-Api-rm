export const surveyResultSchema = {
  type: 'object',
  properties: {
    answer: {
      type: 'string'
    },
    surveyId: {
      type: 'string'
    },
    accountId: {
      type: 'string'
    },
    date: {
      type: 'string'
    }
  }
}
