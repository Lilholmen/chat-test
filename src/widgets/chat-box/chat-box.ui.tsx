import { Timestamp } from 'firebase/firestore'
import { useSubscrideToChat } from './chat-box.api'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../shared/services'

interface Message {
  avatar: string
  id: string
  name: string
  text: string
  uid: string
  createdAt: Timestamp
}

interface Props {
  message: Message
  isSelf: boolean
}

function Message({ message, isSelf }: Props) {
  const createdAt = message.createdAt
    ? new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeStyle: 'medium' }).format(message.createdAt.toDate())
    : 'Sending...'

  return (
    <div className={`flex gap-x-2 ${isSelf ? 'flex-row-reverse' : 'flex-row'}`}>
      <img className="size-11 rounded-full border-2 border-blue-300" src={message.avatar} alt="user avatar" />
      <div className="relative bg-stone-100 rounded-lg grow px-3 pt-0.5 pb-5">
        <span className="absolute bottom-1 right-1 text-xs text-zinc-400">{createdAt}</span>
        <span className={`${message.createdAt ? 'text-zinc-900' : 'text-zinc-400'}`}>{message.text}</span>
      </div>
    </div>
  )
}

export function ChatBox() {
  const [user] = useAuthState(auth)
  const { messages } = useSubscrideToChat()

  if (!messages || messages.length === 0) {
    return (
      <div className="my-auto px-6 text-xl text-zinc-400 font-medium text-center">
        You may start a conversation down below
      </div>
    )
  }

  return (
    <section className="overflow-y-auto">
      <div className="flex flex-col gap-y-2">
        {messages?.map((message) => (
          <Message key={message.id} message={message} isSelf={user?.uid === message.uid} />
        ))}
      </div>
      {/* when a new message enters the chat, the screen scrolls down to the scroll div */}
      {/* <span ref={scroll}></span>
      <SendMessage scroll={scroll} /> */}
    </section>
  )
}
