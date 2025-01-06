import { useEffect, useState } from 'react'
import { query, collection, orderBy, onSnapshot, limit, Timestamp } from 'firebase/firestore'
import { db } from '../../shared/services'

interface Message {
  avatar: string
  id: string
  name: string
  text: string
  uid: string
  createdAt: Timestamp
}

export const useSubscrideToChat = () => {
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'asc'), limit(100))

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages: Message[] = []

      QuerySnapshot.forEach((doc) => {
        const messageData = doc.data() as Omit<Message, 'id'>

        fetchedMessages.push({ ...messageData, id: doc.id })
      })

      setMessages(fetchedMessages)
    })

    return () => unsubscribe as unknown as void
  }, [])

  return { messages }
}
