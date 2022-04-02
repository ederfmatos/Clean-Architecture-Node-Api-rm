import { LoadSurveysController } from './load-surveys.controller'
import { SurveyModel, LoadSurveys } from './load-surveys.protocol'
import MockDate from 'mockdate'

interface SutType {
  sut: LoadSurveysController
  loadSurveysStub: LoadSurveys
}

function makeSut (): SutType {
  const loadSurveysStub = makeLoadSurveysStub()
  const sut = new LoadSurveysController(loadSurveysStub)
  return { sut, loadSurveysStub }
}

function makeLoadSurveysStub (): LoadSurveys {
  class LoadSurveysStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return makeSurveys()
    }
  }

  return new LoadSurveysStub()
}

function makeSurvey (): SurveyModel {
  return {
    id: 'any_id',
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer'
      }
    ],
    date: new Date()
  }
}

function makeSurveys (): SurveyModel[] {
  return [makeSurvey(), makeSurvey()]
}

describe('LoadSurveys  Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call LoadSurveys', async () => {
    const { sut, loadSurveysStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalledTimes(1)
  })
})
