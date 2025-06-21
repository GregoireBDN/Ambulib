import React from "react";
import { Button } from "@/components/ui/button";
import { BACKEND_URL } from "@/lib/constants";

interface SocialSignInButtonProps {
  provider: "google" | "facebook" | "github";
  children: React.ReactNode;
  icon: React.ReactNode;
}

const SocialSignInButton = ({
  provider,
  children,
  icon,
}: SocialSignInButtonProps) => {
  const getProviderUrl = (provider: string) => {
    return `${BACKEND_URL}/auth/${provider}/login`;
  };

  return (
    <Button variant="social" size="lg" className="w-full" asChild>
      <a
        href={getProviderUrl(provider)}
        className="flex items-center justify-center gap-3 py-3"
      >
        <div className="flex items-center justify-center w-5 h-5">{icon}</div>
        <span>{children}</span>
      </a>
    </Button>
  );
};

export default SocialSignInButton;
