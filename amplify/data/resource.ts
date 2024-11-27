import { type ClientSchema, defineData, a } from '@aws-amplify/backend'
import { schema as generatedSqlSchema } from './schema.sql'

const sqlSchema = generatedSqlSchema.setAuthorization((models) => [
  models.products.authorization((allow) => [allow.authenticated().to(['read'])]),
])
const schema = a.schema({
  chat: a
    .conversation({
      aiModel: a.ai.model('Claude 3.5 Haiku'),
      systemPrompt:
        'You are a helpful assistant, that focuses on selling and upselling merchandise',
      tools: [
        a.ai.dataTool({
          name: 'MerchQuery',
          description:
            'Search for questions regarding merchandise, shopping apparel, and item prices.',
          model: a.ref('products'), //! This refers to the name of our table
          modelOperation: 'list',
        }),
      ],
    })
    .authorization((allow) => allow.owner()),
})

const combinedSchema = a.combine([sqlSchema, schema])

export type Schema = ClientSchema<typeof combinedSchema>

export const data = defineData({ schema: combinedSchema })
