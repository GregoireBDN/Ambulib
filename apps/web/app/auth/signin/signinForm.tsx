"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/ui/submitButton";
import { signIn } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const SignInForm = () => {
  const [state, formAction] = useActionState(signIn, null);
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    if (state?.success && state?.redirect) {
      router.push(state.redirect);
    }
  }, [state, router]);

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Bienvenue</CardTitle>
        <CardDescription>
          Connectez-vous à votre compte pour continuer
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <div className="flex flex-col gap-4">
            {state?.message && (
              <p className="text-sm text-destructive">{state.message}</p>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="jean@exemple.com"
                defaultValue={state?.values?.email || ""}
              />
              {state?.error?.email && (
                <p className="text-sm text-destructive">{state.error.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  defaultValue={state?.values?.password || ""}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
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
                <p className="text-sm text-destructive">
                  {state.error.password}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <Link
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                href="#"
              >
                Mot de passe oublié ?
              </Link>
            </div>
            <SubmitButton className="w-full">Se connecter</SubmitButton>
            <div className="flex justify-between items-center text-sm">
              <p className="text-muted-foreground">
                Vous n&apos;avez pas de compte ?
              </p>
              <Link
                className="text-primary hover:text-primary/80 transition-colors"
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
