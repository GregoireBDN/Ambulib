"use client";

import React, { useState, useActionState, useTransition } from "react";
import { ChevronLeft, ChevronRight, User, Mail, Lock, MapPin, Check } from "lucide-react";
import { signUp } from "@/lib/auth";
import { SeniorCard } from "@/components/accessible/SeniorCard";
import { AccessibleInput } from "@/components/accessible/AccessibleInput";
import { LargeButton } from "@/components/accessible/LargeButton";

/**
 * MultiStepSignUpForm - Formulaire d'inscription en plusieurs étapes
 * Optimisé pour réduire la charge cognitive des personnes âgées
 * 
 * Fonctionnalités d'accessibilité :
 * - Une information à la fois
 * - Sauvegarde automatique
 * - Navigation claire
 * - Indicateur de progression
 * - Validation en temps réel
 */

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: string;
  phoneNumber: string;
  address: string;
  city: string;
  postalCode: string;
}

const STEPS = [
  {
    id: 1,
    title: "Informations personnelles",
    description: "Commençons par vos nom et prénom",
    icon: User,
    fields: ["firstName", "lastName", "age"] as const,
  },
  {
    id: 2,
    title: "Contact",
    description: "Votre email et téléphone",
    icon: Mail,
    fields: ["email", "phoneNumber"] as const,
  },
  {
    id: 3,
    title: "Sécurité",
    description: "Créez votre mot de passe",
    icon: Lock,
    fields: ["password"] as const,
  },
  {
    id: 4,
    title: "Adresse",
    description: "Où vous joindre si nécessaire",
    icon: MapPin,
    fields: ["address", "city", "postalCode"] as const,
  },
];

const MultiStepSignUpForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
    phoneNumber: "",
    address: "",
    city: "",
    postalCode: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [state, formAction] = useActionState(signUp, null);
  const [isPending, startTransition] = useTransition();

  const currentStepData = STEPS.find(step => step.id === currentStep)!;
  const isLastStep = currentStep === STEPS.length;
  const isFirstStep = currentStep === 1;

  // Sauvegarde automatique dans localStorage
  React.useEffect(() => {
    localStorage.setItem('ambulib-signup-draft', JSON.stringify(formData));
  }, [formData]);

  // Chargement des données sauvegardées
  React.useEffect(() => {
    const saved = localStorage.getItem('ambulib-signup-draft');
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        setFormData(parsedData);
      } catch {
        // Ignore invalid JSON
      }
    }
  }, []);

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Effacer l'erreur quand l'utilisateur tape
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const validateCurrentStep = (): boolean => {
    const errors: Record<string, string> = {};
    let isValid = true;

    currentStepData.fields.forEach(field => {
      const value = formData[field];
      
      if (!value.trim()) {
        errors[field] = "Ce champ est obligatoire";
        isValid = false;
        return;
      }

      // Validations spécifiques
      switch (field) {
        case "email": {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            errors[field] = "Veuillez entrer un email valide";
            isValid = false;
          }
          break;
        }
        case "password": {
          if (value.length < 8) {
            errors[field] = "Le mot de passe doit contenir au moins 8 caractères";
            isValid = false;
            break;
          }
          
          const hasLetter = /[a-zA-Z]/.test(value);
          const hasNumber = /\d/.test(value);
          const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value);
          
          if (!hasLetter) {
            errors[field] = "Le mot de passe doit contenir au moins une lettre";
            isValid = false;
          } else if (!hasNumber) {
            errors[field] = "Le mot de passe doit contenir au moins un chiffre";
            isValid = false;
          } else if (!hasSpecialChar) {
            errors[field] = "Le mot de passe doit contenir au moins un caractère spécial (!@#$%^&*...)";
            isValid = false;
          }
          break;
        }
        case "phoneNumber": {
          const phoneRegex = /^(\+33|0)[1-9](\d{2}){4}$/;
          if (!phoneRegex.test(value.replace(/\s/g, ""))) {
            errors[field] = "Veuillez entrer un numéro français valide";
            isValid = false;
          }
          break;
        }
        case "postalCode":
          if (!/^\d{5}$/.test(value)) {
            errors[field] = "Le code postal doit contenir 5 chiffres";
            isValid = false;
          }
          break;
      }
    });

    setFieldErrors(errors);
    return isValid;
  };

  const goToNextStep = () => {
    if (validateCurrentStep() && !isLastStep) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const goToPreviousStep = () => {
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateCurrentStep()) {
      const formDataToSubmit = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSubmit.append(key, value);
      });
      
      startTransition(() => {
        formAction(formDataToSubmit);
      });
      
      // Nettoyer le brouillon après soumission réussie
      localStorage.removeItem('ambulib-signup-draft');
    }
  };

  const renderField = (field: keyof FormData) => {
    const commonProps = {
      value: formData[field],
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => updateFormData(field, e.target.value),
      error: fieldErrors[field],
      size: "large" as const,
      required: true,
    };

    switch (field) {
      case "firstName":
        return (
          <AccessibleInput
            id="firstName"
            name="firstName"
            label="Prénom"
            placeholder="Jean"
            helpText="Votre prénom tel qu'il apparaît sur vos documents"
            autoComplete="given-name"
            {...commonProps}
          />
        );
      case "lastName":
        return (
          <AccessibleInput
            id="lastName"
            name="lastName"
            label="Nom de famille"
            placeholder="Dupont"
            helpText="Votre nom de famille"
            autoComplete="family-name"
            {...commonProps}
          />
        );
      case "age":
        return (
          <AccessibleInput
            id="age"
            name="age"
            type="number"
            label="Âge"
            placeholder="65"
            helpText="Votre âge (information optionnelle)"
            min="0"
            max="120"
            {...{ ...commonProps, required: false }}
          />
        );
      case "email":
        return (
          <AccessibleInput
            id="email"
            name="email"
            type="email"
            label="Adresse email"
            placeholder="jean.dupont@email.com"
            helpText="Nous l'utiliserons pour vous envoyer des confirmations"
            autoComplete="email"
            {...commonProps}
          />
        );
      case "phoneNumber":
        return (
          <AccessibleInput
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            label="Numéro de téléphone"
            placeholder="01 23 45 67 89"
            helpText="Pour vous joindre en cas d'urgence"
            autoComplete="tel"
            {...commonProps}
          />
        );
      case "password":
        return (
          <AccessibleInput
            id="password"
            name="password"
            type="password"
            label="Mot de passe"
            placeholder="Créez votre mot de passe"
            helpText="Au moins 8 caractères : 1 lettre, 1 chiffre, 1 symbole (!@#$%...)"
            showPasswordToggle
            autoComplete="new-password"
            {...commonProps}
          />
        );
      case "address":
        return (
          <AccessibleInput
            id="address"
            name="address"
            label="Adresse"
            placeholder="123 Rue de la Paix"
            helpText="Votre adresse complète"
            autoComplete="street-address"
            {...commonProps}
          />
        );
      case "city":
        return (
          <AccessibleInput
            id="city"
            name="city"
            label="Ville"
            placeholder="Paris"
            helpText="Votre ville de résidence"
            autoComplete="locality"
            {...commonProps}
          />
        );
      case "postalCode":
        return (
          <AccessibleInput
            id="postalCode"
            name="postalCode"
            label="Code postal"
            placeholder="75001"
            helpText="Code postal de votre ville"
            autoComplete="postal-code"
            {...commonProps}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Indicateur de progression */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {STEPS.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center ${index < STEPS.length - 1 ? 'flex-1' : ''}`}
              >
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                  ${step.id <= currentStep 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                  }
                `}>
                  {step.id < currentStep ? (
                    <Check className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    step.id
                  )}
                </div>
                {index < STEPS.length - 1 && (
                  <div className={`
                    flex-1 h-2 mx-4 rounded
                    ${step.id < currentStep ? 'bg-blue-600' : 'bg-gray-200'}
                  `} />
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-lg text-gray-600">
            Étape {currentStep} sur {STEPS.length}
          </p>
        </div>

        {/* Formulaire principal */}
        <SeniorCard
          title={currentStepData.title}
          description={currentStepData.description}
          size="large"
          icon={currentStepData.icon}
          priority="high"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Message d'erreur global */}
            {state?.message && (
              <div role="alert" className="p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                <p className="text-red-700 font-medium">{state.message}</p>
              </div>
            )}

            {/* Champs de l'étape courante */}
            <div className="space-y-6">
              {currentStepData.fields.map(field => (
                <div key={field}>
                  {renderField(field)}
                </div>
              ))}
            </div>

            {/* Boutons de navigation */}
            <div className="flex gap-4 pt-6">
              {!isFirstStep && (
                <LargeButton
                  type="button"
                  variant="secondary"
                  size="large"
                  onClick={goToPreviousStep}
                  className="flex-1"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  Précédent
                </LargeButton>
              )}

              {isLastStep ? (
                <LargeButton
                  type="submit"
                  variant="primary"
                  size="large"
                  priority="high"
                  className="flex-1"
                  disabled={isPending}
                >
                  <Check className="h-5 w-5" aria-hidden="true" />
                  {isPending ? "Création en cours..." : "Créer mon compte"}
                </LargeButton>
              ) : (
                <LargeButton
                  type="button"
                  variant="primary"
                  size="large"
                  onClick={goToNextStep}
                  className="flex-1"
                >
                  Continuer
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </LargeButton>
              )}
            </div>
          </form>
        </SeniorCard>

        {/* Aide */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Vos informations sont sauvegardées automatiquement
          </p>
          <p className="text-sm text-gray-500">
            Vous pouvez fermer cette page et revenir plus tard
          </p>
        </div>
      </div>
    </div>
  );
};

export default MultiStepSignUpForm;