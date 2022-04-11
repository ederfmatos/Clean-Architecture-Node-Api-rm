export const surveyResultPath = {
  put: {
    security: [{ ApiKeyAuth: [] }],
    tags: ['Enquetes'],
    summary: 'API para responder uma enquete',
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/surveyResultInput'
          }
        }
      }
    },
    parameters: [
      {
        in: 'path',
        name: 'surveyId',
        required: true,
        schema: {
          type: 'string'
        }
      }
    ],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/surveyResult'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      403: {
        $ref: '#/components/forbidden'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
