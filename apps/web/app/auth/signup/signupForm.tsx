"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import SubmitButton from "@/components/ui/submitButton";
const SignUpForm = () => {
  return (
    <form>
      <div className="flex flex-col gap-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="John Doe" />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" placeholder="john@example.com" />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" />
        </div>
        <SubmitButton>Sign Up</SubmitButton>
      </div>
    </form>
  );
};

export default SignUpForm;
