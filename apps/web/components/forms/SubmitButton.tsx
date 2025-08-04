"use client";
import React, { PropsWithChildren } from "react";
import { Button, type ButtonProps } from "@repo/ui";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

interface SubmitButtonProps
  extends PropsWithChildren,
    Omit<ButtonProps, "type"> {
  className?: string;
}

const SubmitButton = ({
  children,
  className,
  variant,
  size,
  ...props
}: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant={variant}
      size={size}
      aria-disabled={pending}
      className={cn("w-full mt-2", className)}
      {...props}
    >
      {pending ? "Submitting..." : children}
    </Button>
  );
};

export default SubmitButton;
