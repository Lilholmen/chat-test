import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { GoogleLogo } from '../shared/images'
import { auth } from '../shared/services'
import { SendMassageForm } from '../widgets/send-form'
import { ChatBox } from '../widgets/chat-box'

interface SignInButtonProps {
  onSignIn: () => Promise<void>
}

interface SignOutButtonProps {
  onSignOut: () => void
  user: User
}

function SignInButton({ onSignIn }: SignInButtonProps) {
  return (
    <button onClick={onSignIn} className="group bg-blue-50 px-3 py-1 rounded flex justify-between items-center gap-x-3">
      <span className="text-blue-600 group-hover:text-blue-700 text-xs font-semibold">Sign In</span>
      <img src={GoogleLogo} alt="sign in with google" width={24} height={24} />
    </button>
  )
}

function SignOutButton({ onSignOut, user }: SignOutButtonProps) {
  return (
    <div className="flex gap-x-3">
      <div className="flex flex-col gap-y-1 items-end">
        <span className="text-white text-sm">{user.displayName}</span>
        <span className="text-blue-100 text-sm">{user.email}</span>
      </div>
      <button className="" onClick={onSignOut}>
        {user.photoURL ? (
          <img src={user.photoURL} alt="Sign out" width={32} height={32} className="rounded-full size-8" />
        ) : (
          <div className="rouded-full bg-re-600 size-3" />
        )}
      </button>
    </div>
  )
}

export function Layout() {
  const [user] = useAuthState(auth)

  const googleSignIn = async () => {
    await signInWithPopup(auth, new GoogleAuthProvider())
  }
  const signOut = () => {
    auth.signOut()
  }

  return (
    <div className="min-h-screen w-full bg-blue-50 relative">
      <header className="sticky top-0 z-50 bg-stone-700 px-12 py-5 flex items-center justify-between h-[5.25rem]">
        <h1 className="text-xl text-blue-50 font-medium">Chat test</h1>
        {user ? <SignOutButton onSignOut={signOut} user={user} /> : <SignInButton onSignIn={googleSignIn} />}
      </header>
      <div className="flex">
        <main className="grow"> Main Part</main>
        <section className="w-96 h-[calc(100vh-5.25rem)] flex flex-col p-5 justify-between bg-white border-l border-blue-100">
          {user ? (
            <>
              <ChatBox />
              <SendMassageForm />
            </>
          ) : (
            <div className="my-auto text-center text-xl text-zinc-700 font-medium">Please login to use the chat</div>
          )}
        </section>
      </div>
    </div>
  )
}
