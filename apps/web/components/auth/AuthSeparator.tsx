import React from "react";
import { Separator } from "@repo/ui";

const AuthSeparator = () => {
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-0 flex items-center">
        <Separator className="bg-gray-300" />
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-white px-4 text-gray-500 font-medium">
          ou continuer avec
        </span>
      </div>
    </div>
  );
};

export default AuthSeparator;
