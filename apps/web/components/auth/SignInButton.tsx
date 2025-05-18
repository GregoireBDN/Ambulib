import { getSession } from "@/lib/session";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const SignInButton = async () => {
  const session = await getSession();
  return (
    <div className="flex items-center gap-2">
      {!session || !session.user ? (
        <>
          <Button variant="ghost" asChild>
            <Link href="/auth/signin">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/auth/signup">Sign Up</Link>
          </Button>
        </>
      ) : (
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">
            {`${session.user.firstName} ${session.user.lastName}`}
          </span>
          <Button variant="ghost" asChild>
            <a href="/api/auth/signout">Sign Out</a>
          </Button>
        </div>
      )}
    </div>
  );
};

export default SignInButton;
