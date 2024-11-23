import SignInButton from "src/components/buttons/sign-in";

export default function Login() {
  return (
    <div className="flex flex-1 gap-16">
      <div className="flex-1 bg-white"/>
      <div className="flex-1 flex flex-col justify-around">
        <div>
          <p className="text-3xl font-black">
            <span className="text-main">Sign In</span> to your account
          </p>
          <SignInButton/>
        </div>
      </div>
    </div>
  )
}