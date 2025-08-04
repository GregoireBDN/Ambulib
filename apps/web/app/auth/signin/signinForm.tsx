"use client";
import { Input, Label } from "@repo/ui";
import { SubmitButton } from "@/components/forms";
import { signIn } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useActionState } from "react";
import { Button } from "@repo/ui";
import { Eye, EyeOff, LogIn } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui";

const SignInForm = () => {
  const [state, formAction] = useActionState(signIn, null);
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();

  console.log("SignInForm render - state:", state);

  React.useEffect(() => {
    console.log("SignInForm useEffect - state changed:", state);
    if (state?.success && state?.redirect) {
      console.log("Redirecting to:", state.redirect);
      router.push(state.redirect);
    }
  }, [state, router]);

  const handleSubmit = (formData: FormData) => {
    console.log("Form submitted with data:", Array.from(formData.entries()));
    return formAction(formData);
  };

  return (
    <Card className="w-full max-w-md border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
      <CardHeader className="text-center pb-6">
        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <LogIn className="h-8 w-8 text-blue-600" />
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900">
          Bienvenue
        </CardTitle>
        <CardDescription className="text-gray-600">
          Connectez-vous à votre compte Ambulib pour continuer
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit}>
          <div className="flex flex-col gap-4">
            {state?.message && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{state.message}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </Label>
              <Input
                id="email"
                name="email"
                placeholder="jean@exemple.com"
                defaultValue={state?.values?.email || ""}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
              {state?.error?.email && (
                <p className="text-sm text-red-600">{state.error.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Mot de passe
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  defaultValue={state?.values?.password || ""}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {showPassword
                      ? "Masquer le mot de passe"
                      : "Afficher le mot de passe"}
                  </span>
                </Button>
              </div>
              {state?.error?.password && (
                <p className="text-sm text-red-600">{state.error.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <Link
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                href="#"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            <SubmitButton className="w-full" variant="primary" size="lg">
              Se connecter
            </SubmitButton>

            <div className="flex justify-between items-center text-sm pt-4 border-t border-gray-200">
              <p className="text-gray-600">Vous n&apos;avez pas de compte ?</p>
              <Link
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                href="/auth/signup"
              >
                S&apos;inscrire
              </Link>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignInForm;
