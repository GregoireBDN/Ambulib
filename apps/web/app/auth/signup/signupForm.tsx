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
import { useRouter } from "next/navigation";

const SignUpForm = () => {
  const [state, action] = useActionState(signUp, undefined);
  const [showPassword, setShowPassword] = React.useState(false);
  const router = useRouter();

  console.log("SignUpForm render - state:", state);

  React.useEffect(() => {
    if (state?.success && state?.redirect) {
      console.log("Redirecting to:", state.redirect);
      router.push(state.redirect);
    }
  }, [state, router]);

  const handleSubmit = (formData: FormData) => {
    console.log(
      "SignUpForm submitted with data:",
      Array.from(formData.entries())
    );
    return action(formData);
  };

  return (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle>Créer un compte</CardTitle>
        <CardDescription>
          Entrez vos informations pour créer votre compte
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit}>
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Âge</Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  placeholder="25"
                  defaultValue={state?.values?.age || ""}
                />
                {state?.error?.age && (
                  <p className="text-sm text-destructive">{state.error.age}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Téléphone</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="0612345678"
                  defaultValue={state?.values?.phoneNumber || ""}
                />
                {state?.error?.phoneNumber && (
                  <p className="text-sm text-destructive">
                    {state.error.phoneNumber}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Adresse</Label>
              <Input
                id="address"
                name="address"
                placeholder="123 rue de la Paix"
                defaultValue={state?.values?.address || ""}
              />
              {state?.error?.address && (
                <p className="text-sm text-destructive">
                  {state.error.address}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Ville</Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="Paris"
                  defaultValue={state?.values?.city || ""}
                />
                {state?.error?.city && (
                  <p className="text-sm text-destructive">{state.error.city}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="postalCode">Code postal</Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  placeholder="75001"
                  defaultValue={state?.values?.postalCode || ""}
                />
                {state?.error?.postalCode && (
                  <p className="text-sm text-destructive">
                    {state.error.postalCode}
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
