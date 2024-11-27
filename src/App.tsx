import { generateClient } from 'aws-amplify/api'
import { Schema } from '../amplify/data/resource'
import { useEffect } from 'react'
import { Amplify } from 'aws-amplify'
import awsconfig from '../amplify_outputs.json'
import { withAuthenticator } from '@aws-amplify/ui-react'
import { AIConversation, createAIHooks } from '@aws-amplify/ui-react-ai'
import '@aws-amplify/ui-react/styles.css'

Amplify.configure(awsconfig)

const client = generateClient<Schema>()
const { useAIConversation } = createAIHooks(client)

function Home() {
  const [
    {
      data: { messages },
      isLoading,
    },
    handleSendMessage,
  ] = useAIConversation('chat')

  return (
    <div className="flex justify-center items-center m-10 max-w-screen-md">
      <AIConversation
        avatars={{ user: { username: 'Focus Otter' } }}
        messages={messages}
        handleSendMessage={handleSendMessage}
        isLoading={isLoading}
        variant="bubble"
        welcomeMessage="Hello! I'm your helpful storefront assistant. Feel free to ask me questions about my merch!"
      />
    </div>
  )
}

export default withAuthenticator(Home)
