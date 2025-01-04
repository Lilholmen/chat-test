import { FormEvent } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '../../../shared/services'

export const sendMessage = async (event: FormEvent<HTMLFormElement>, message: string, clear: () => void) => {
  event.preventDefault()

  if (!auth.currentUser) return
  if (message.trim() === '') {
    return
  }

  const { uid, displayName, photoURL } = auth.currentUser

  await addDoc(collection(db, 'messages'), {
    text: message,
    name: displayName,
    avatar: photoURL,
    createdAt: serverTimestamp(),
    uid,
  })

  clear()
}
