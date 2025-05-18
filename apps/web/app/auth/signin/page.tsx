import React from "react";
import SignInForm from "./signinForm";
import { Separator } from "@/components/ui/separator";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";

const SignInPage = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      <SignInForm />
      <div className="relative w-full">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground" />
        </div>
      </div>
      <GoogleSignInButton />
    </div>
  );
};

export default SignInPage;
