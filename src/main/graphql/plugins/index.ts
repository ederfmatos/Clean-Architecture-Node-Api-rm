import { PluginDefinition } from 'apollo-server-core'
import { errorHandlerPlugin } from './error-handler-plugin'

export const plugins: PluginDefinition[] = [
  errorHandlerPlugin
]
