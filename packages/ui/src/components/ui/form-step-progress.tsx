import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "../../lib/utils"

export interface FormStepProgressProps {
  currentStep: number
  totalSteps: number
  stepLabels?: string[]
  className?: string
}

const FormStepProgress = React.forwardRef<HTMLDivElement, FormStepProgressProps>(
  ({ currentStep, totalSteps, stepLabels = [], className }, ref) => {
    const steps = Array.from({ length: totalSteps }, (_, i) => i + 1)

    return (
      <div 
        ref={ref}
        className={cn("w-full", className)}
        role="progressbar"
        aria-valuenow={currentStep}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-label={`Étape ${currentStep} sur ${totalSteps}`}
      >
        {/* Progress bar visuel pour tous les utilisateurs */}
        <div className="mb-6">
          <div className="flex justify-between mb-4">
            {steps.map((step) => {
              const isCompleted = step < currentStep
              const isCurrent = step === currentStep
              const label = stepLabels[step - 1] || `Étape ${step}`

              return (
                <div
                  key={step}
                  className="flex flex-col items-center flex-1"
                  role="listitem"
                >
                  {/* Cercle avec numéro ou check */}
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center text-base font-bold border-2 transition-all duration-200",
                      "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-2",
                      isCompleted && [
                        "bg-primary text-primary-foreground border-primary",
                        "shadow-md"
                      ],
                      isCurrent && [
                        "bg-primary text-primary-foreground border-primary",
                        "ring-4 ring-primary/20 shadow-lg scale-110"
                      ],
                      !isCompleted && !isCurrent && [
                        "bg-muted text-muted-foreground border-muted-foreground/30",
                        "hover:border-muted-foreground/50"
                      ]
                    )}
                    aria-current={isCurrent ? "step" : undefined}
                    aria-label={
                      isCompleted 
                        ? `${label} - Terminée`
                        : isCurrent 
                          ? `${label} - En cours`
                          : `${label} - À venir`
                    }
                  >
                    {isCompleted ? (
                      <Check 
                        className="w-6 h-6" 
                        aria-hidden="true"
                      />
                    ) : (
                      <span aria-hidden="true">{step}</span>
                    )}
                  </div>

                  {/* Label de l'étape */}
                  <span
                    className={cn(
                      "mt-3 text-sm font-medium text-center leading-tight max-w-[100px]",
                      isCurrent && "text-primary font-semibold",
                      isCompleted && "text-foreground",
                      !isCompleted && !isCurrent && "text-muted-foreground"
                    )}
                  >
                    {label}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Ligne de connexion entre les étapes */}
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-muted-foreground/20 -translate-y-1/2 -z-10">
              {/* Progress line */}
              <div
                className="h-full bg-primary transition-all duration-300 ease-in-out"
                style={{
                  width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`
                }}
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        {/* Information textuelle pour lecteurs d'écran */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          Progression : étape {currentStep} sur {totalSteps}.
          {stepLabels[currentStep - 1] && ` Étape actuelle : ${stepLabels[currentStep - 1]}.`}
          {currentStep > 1 && ` ${currentStep - 1} étape${currentStep > 2 ? 's' : ''} terminée${currentStep > 2 ? 's' : ''}.`}
          {currentStep < totalSteps && ` ${totalSteps - currentStep} étape${totalSteps - currentStep > 1 ? 's' : ''} restante${totalSteps - currentStep > 1 ? 's' : ''}.`}
        </div>

        {/* Indicateur textuel simple pour tous */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Étape <span className="font-semibold text-foreground">{currentStep}</span> sur {totalSteps}
            {stepLabels[currentStep - 1] && (
              <>
                {" - "}
                <span className="font-medium text-primary">
                  {stepLabels[currentStep - 1]}
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    )
  }
)

FormStepProgress.displayName = "FormStepProgress"

export { FormStepProgress }