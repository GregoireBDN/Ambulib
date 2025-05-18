"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/ui/submitButton";
import { signUp } from "@/lib/auth";
import React from "react";
import { useActionState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

const SignUpForm = () => {
  const [state, action] = useActionState(signUp, undefined);
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Créer un compte</CardTitle>
        <CardDescription>
          Entrez vos informations pour créer votre compte
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action}>
          <div className="flex flex-col gap-4">
            {state?.message && (
              <p className="text-sm text-destructive">{state.message}</p>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="Jean"
                  defaultValue={state?.values?.firstName || ""}
                />
                {state?.error?.firstName && (
                  <p className="text-sm text-destructive">
                    {state.error.firstName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Dupont"
                  defaultValue={state?.values?.lastName || ""}
                />
                {state?.error?.lastName && (
                  <p className="text-sm text-destructive">
                    {state.error.lastName}
                  </p>
                )}
              </div>
            </div>

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
                <div className="text-sm text-destructive space-y-1">
                  <p>Le mot de passe doit :</p>
                  <ul className="list-disc pl-4">
                    {state.error.password.map((error) => (
                      <li key={error}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <SubmitButton className="w-full">Créer un compte</SubmitButton>

            <div className="flex justify-between items-center text-sm">
              <p className="text-muted-foreground">
                Vous avez déjà un compte ?
              </p>
              <Link
                className="text-primary hover:text-primary/80 transition-colors"
                href="/auth/signin"
              >
                Se connecter
              </Link>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
