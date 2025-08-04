import { getSession } from "@/lib/session";
import { Button } from "@repo/ui";
import Link from "next/link";
import React from "react";
import { User, LogOut } from "lucide-react";

const SignInButton = async () => {
  const session = await getSession();
  return (
    <div className="flex items-center gap-3">
      {!session || !session.user ? (
        <>
          <Button
            variant="ghost"
            className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors"
            asChild
          >
            <Link href="/auth/signin">Se connecter</Link>
          </Button>
          <Button variant="primary" asChild>
            <Link href="/auth/signup">S'inscrire</Link>
          </Button>
        </>
      ) : (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">
              {`${session.user.firstName} ${session.user.lastName}`}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
            asChild
          >
            <a href="/api/auth/signout" className="flex items-center gap-1">
              <LogOut className="h-4 w-4" />
              <span>Déconnexion</span>
            </a>
          </Button>
        </div>
      )}
    </div>
  );
};

export default SignInButton;
