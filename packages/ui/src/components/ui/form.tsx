"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import { cn } from "../../lib/utils"
import { Label } from "./label"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState } = useFormContext()
  const formState = useFormState({ name: fieldContext.name })
  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

interface FormItemProps extends React.ComponentProps<"div"> {
  accessible?: boolean
}

function FormItem({ className, accessible, ...props }: FormItemProps) {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn(
          "grid gap-2",
          accessible && "space-y-3",
          className
        )}
        {...props}
      />
    </FormItemContext.Provider>
  )
}

interface FormLabelProps extends React.ComponentProps<typeof LabelPrimitive.Root> {
  accessible?: boolean
  required?: boolean
}

function FormLabel({
  className,
  accessible,
  required,
  children,
  ...props
}: FormLabelProps) {
  const { error, formItemId } = useFormField()

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn(
        "data-[error=true]:text-destructive",
        accessible && "text-base font-semibold leading-relaxed block mb-2",
        className
      )}
      htmlFor={formItemId}
      {...props}
    >
      {children}
      {required && (
        <span className="ml-2 text-destructive font-bold" aria-label="obligatoire">
          *
        </span>
      )}
    </Label>
  )
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { formDescriptionId } = useFormField()

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? "") : props.children

  if (!body) {
    return null
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-destructive text-sm", className)}
      {...props}
    >
      {body}
    </p>
  )
}

// Accessible Form wrapper component
interface AccessibleFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  title: string
  description?: string
  errorMessage?: string
  children: React.ReactNode
  className?: string
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void
}

const AccessibleForm = React.forwardRef<HTMLFormElement, AccessibleFormProps>(
  ({ title, description, errorMessage, children, className, onSubmit, ...props }, ref) => {
    const formId = React.useId()
    const titleId = `${formId}-title`
    const descriptionId = `${formId}-description`
    const errorId = `${formId}-error`

    return (
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          {/* En-tête du formulaire */}
          <div className="mb-6 space-y-2">
            <h1 id={titleId} className="text-2xl font-bold text-foreground">
              {title}
            </h1>
            {description && (
              <p id={descriptionId} className="text-base text-muted-foreground leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {/* Message d'erreur global */}
          {errorMessage && (
            <div 
              id={errorId}
              className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg"
              role="alert"
              aria-live="assertive"
            >
              <p className="text-sm text-destructive font-medium">
                {errorMessage}
              </p>
            </div>
          )}

          {/* Formulaire avec attributs d'accessibilité */}
          <form
            ref={ref}
            className={cn("space-y-6", className)}
            onSubmit={onSubmit}
            aria-labelledby={titleId}
            aria-describedby={description ? descriptionId : undefined}
            {...props}
          >
            {children}
          </form>
        </div>
      </div>
    )
  }
)
AccessibleForm.displayName = "AccessibleForm"

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
  AccessibleForm,
}
