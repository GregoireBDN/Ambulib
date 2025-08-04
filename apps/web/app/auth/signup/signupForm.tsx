"use client";
import { Input, Label } from "@repo/ui";
import { SubmitButton } from "@/components/forms";
import { signUp } from "@/lib/auth";
import React from "react";
import { useActionState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui";
import Link from "next/link";
import { Button } from "@repo/ui";
import { Eye, EyeOff, User } from "lucide-react";
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
    <Card className="w-full max-w-md border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
      <CardHeader className="text-center pb-6">
        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <User className="h-8 w-8 text-blue-600" />
        </div>
        <CardTitle className="text-2xl font-bold text-gray-900">
          Créer un compte
        </CardTitle>
        <CardDescription className="text-gray-600">
          Rejoignez Ambulib et accédez à nos services de transport médical
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="firstName"
                  className="text-sm font-medium text-gray-700"
                >
                  Prénom
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="Jean"
                  defaultValue={state?.values?.firstName || ""}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                {state?.error?.firstName && (
                  <p className="text-sm text-red-600">
                    {state.error.firstName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="lastName"
                  className="text-sm font-medium text-gray-700"
                >
                  Nom
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Dupont"
                  defaultValue={state?.values?.lastName || ""}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                {state?.error?.lastName && (
                  <p className="text-sm text-red-600">{state.error.lastName}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="age"
                  className="text-sm font-medium text-gray-700"
                >
                  Âge
                </Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  placeholder="25"
                  defaultValue={state?.values?.age || ""}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                {state?.error?.age && (
                  <p className="text-sm text-red-600">{state.error.age}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="phoneNumber"
                  className="text-sm font-medium text-gray-700"
                >
                  Téléphone
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="0612345678"
                  defaultValue={state?.values?.phoneNumber || ""}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                {state?.error?.phoneNumber && (
                  <p className="text-sm text-red-600">
                    {state.error.phoneNumber}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="address"
                className="text-sm font-medium text-gray-700"
              >
                Adresse
              </Label>
              <Input
                id="address"
                name="address"
                placeholder="123 rue de la Paix"
                defaultValue={state?.values?.address || ""}
                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
              {state?.error?.address && (
                <p className="text-sm text-red-600">{state.error.address}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="city"
                  className="text-sm font-medium text-gray-700"
                >
                  Ville
                </Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="Paris"
                  defaultValue={state?.values?.city || ""}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                {state?.error?.city && (
                  <p className="text-sm text-red-600">{state.error.city}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="postalCode"
                  className="text-sm font-medium text-gray-700"
                >
                  Code postal
                </Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  placeholder="75001"
                  defaultValue={state?.values?.postalCode || ""}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                {state?.error?.postalCode && (
                  <p className="text-sm text-red-600">
                    {state.error.postalCode}
                  </p>
                )}
              </div>
            </div>

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
                <div className="text-sm text-red-600 space-y-1 bg-red-50 p-3 rounded-lg border border-red-200">
                  <p className="font-medium">Le mot de passe doit :</p>
                  <ul className="list-disc pl-4 space-y-1">
                    {state.error.password.map((error) => (
                      <li key={error}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <SubmitButton className="w-full" variant="primary" size="lg">
              Créer mon compte
            </SubmitButton>

            <div className="flex justify-between items-center text-sm pt-4 border-t border-gray-200">
              <p className="text-gray-600">Vous avez déjà un compte ?</p>
              <Link
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
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
