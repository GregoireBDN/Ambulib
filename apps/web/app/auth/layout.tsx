import React, { PropsWithChildren } from "react";

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-background to-muted">
      <div className="w-full max-w-[400px]">{children}</div>
    </div>
  );
};

export default AuthLayout;
