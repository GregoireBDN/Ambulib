import React from "react";
import SignInForm from "./signinForm";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";
import AuthSeparator from "@/components/auth/AuthSeparator";

const SignInPage = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <SignInForm />
      <AuthSeparator />
      <GoogleSignInButton />
    </div>
  );
};

export default SignInPage;
