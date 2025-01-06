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
    <button onClick={onSignIn} className="group flex justify-between items-stretch">
      <div className="grow flex items-center bg-blue-600 rounded-l-xl border-4 border-blue-600  px-6">
        <span className="text-start text-2xl font-bold text-stone-50">Sign In</span>
      </div>
      <div className="w-16 group-hover:w-1/2 duration-500 ease-out delay-200 bg-white py-3 border-4 border-blue-600 rounded-r-xl">
        <img src={GoogleLogo} alt="sign in with google" width={36} height={36} className="mx-auto" />
      </div>
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

function NonAuthorizedUser() {
  const googleSignIn = async () => {
    await signInWithPopup(auth, new GoogleAuthProvider())
  }

  return (
    <main className="h-screen flex justify-center items-center">
      <div className="flex flex-col gap-y-5 w-80">
        <h2 className="text-xl font-semibold text-zinc-700 text-center">You are not authorized, please sign in!</h2>
        <SignInButton onSignIn={googleSignIn} />
      </div>
    </main>
  )
}

export function Layout() {
  const [user, isChecking] = useAuthState(auth)

  const signOut = () => {
    auth.signOut()
  }

  if (isChecking) return <div />

  if (!user) return <NonAuthorizedUser />

  return (
    <div className="min-h-screen w-full bg-blue-50 relative">
      <header className="sticky top-0 z-50 bg-stone-700 px-12 py-5 flex items-center justify-between h-[5.25rem]">
        <h1 className="text-xl text-blue-50 font-medium">Chat test</h1>
        <SignOutButton onSignOut={signOut} user={user} />
      </header>
      <div className="flex">
        <main className="grow"> Main Part</main>
        <section className="w-96 h-[calc(100dvh-5.25rem)] flex flex-col p-5 justify-between bg-white border-l border-blue-100">
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
