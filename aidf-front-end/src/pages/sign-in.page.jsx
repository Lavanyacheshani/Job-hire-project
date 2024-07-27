import { SignIn } from "@clerk/clerk-react";

function SignInPage() {
  return (
    <div className="flex min-h-screen justify-center items-center">
      <SignIn />
    </div>
  );
}

export default SignInPage;
