import React from "react";
import SignUpForm from "./signupForm";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";
import AuthSeparator from "@/components/auth/AuthSeparator";

const SignUpPage = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <SignUpForm />
      <AuthSeparator />
      <GoogleSignInButton />
    </div>
  );
};

export default SignUpPage;
