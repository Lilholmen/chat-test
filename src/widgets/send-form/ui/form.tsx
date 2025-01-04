import { ChangeEvent, FormEvent, useState } from 'react'
import { sendMessage } from '../api'
import { SendIcon } from '../../../shared/images'

export function Form() {
  const [message, setMessage] = useState('')

  const clearMessage = () => {
    setMessage('')
  }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => sendMessage(event, message, clearMessage)

  return (
    <div className="border-t border-blue-200 pt-4">
      <form onSubmit={handleSubmit} className="flex justify-between items-center bg-blue-100 rounded-full p-3">
        <input
          value={message}
          onChange={onInputChange}
          className="bg-transparent placeholder:text-zinc-500 focus:outline-0 px-2"
          placeholder="Type your message here"
        />
        <button type="submit" className="size-6 shrink-0 grow-0">
          <img src={SendIcon} alt="send" width={24} height={24} />
        </button>
      </form>
    </div>
  )
}
