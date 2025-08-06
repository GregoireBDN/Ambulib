// Shadcn/UI Components (individual exports)
export { Button, buttonVariants } from "./components/ui/button"
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "./components/ui/card"
export { Input } from "./components/ui/input"

// Accessible Components (individual exports)
export { LargeButton } from "./components/accessible/LargeButton"
export { AccessibleInput } from "./components/accessible/AccessibleInput"
export { EmergencyButton } from "./components/accessible/EmergencyButton"
export { SeniorCard } from "./components/accessible/SeniorCard"

// Authentication Components (individual exports)
export { AuthCard, AuthFormField, PasswordInput, AuthButton, SocialAuthButton } from "./components/auth"
export { AuthErrorAlert, AuthLoadingSpinner, InlineLoadingSpinner } from "./components/auth"
export { SignInForm, SignUpForm } from "./components/auth"

// Utils
export { cn } from "./lib/utils"

// Bulk exports for compatibility
export * from "./components/ui"
export * from "./components/accessible"
export * from "./components/auth"