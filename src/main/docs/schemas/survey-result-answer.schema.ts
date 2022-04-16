export const surveyResultAnswerSchema = {
  type: 'object',
  properties: {
    answer: {
      type: 'string'
    },
    image: {
      type: 'string'
    },
    count: {
      type: 'integer'
    },
    percent: {
      type: 'number'
    },
    isCurrentAccountAnswer: {
      type: 'boolean'
    }
  },
  required: ['answer', 'count', 'percent', 'isCurrentAccountAnswer']
}
