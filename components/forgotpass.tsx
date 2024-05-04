"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface ForgotUserFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ForgotUserForm({ className, ...props }: ForgotUserFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [confirmPassword, setConfirmPassword] = React.useState<string>("");
    const [passwordsMatch, setPasswordsMatch] = React.useState<boolean>(true);
    const [notregistered, setnotregistered] = React.useState<boolean>(true);
    
  
    function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
      setEmail(event.target.value);
    }
  
    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
      setPassword(event.target.value);
    }
  
    function handleConfirmPasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
      setConfirmPassword(event.target.value);
    }
  
    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      setIsLoading(true);
  
      if (password !== confirmPassword) {
        setPasswordsMatch(false);
        setIsLoading(false);
        return;
      }
      setPasswordsMatch(true);
  
      const requestBody = {
          email: email,
          password: password
      };
      
      try {
  
        console.log(JSON.stringify(requestBody));
        const response = await fetch('http://127.0.0.1:8000/api/forgot_pass/', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });
    
        if (!response.ok) {
            throw new Error('Server responded with error: ' + response.status);
        }
    
        const data = await response.json();
        console.log('Response data:', data);
        router.push('/signin');
    
        setIsLoading(false);
      } catch (error) {
          console.error('Error:', error);
          setIsLoading(false);
          setnotregistered(false);
      }
  
  
      setEmail("");
      setPassword("");
      setConfirmPassword("");
  
      setIsLoading(false);
  
  
    }
  
    return (
      <div className={cn("grid gap-6", className)} {...props}>
        <form onSubmit={onSubmit}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                value={email}
                onChange={handleEmailChange}
              />
              <Label className="sr-only" htmlFor="password">
                Password
              </Label>
              <Input
                id="password"
                placeholder="password"
                type="password"
                autoCapitalize="none"
                autoComplete="current-password"
                autoCorrect="off"
                disabled={isLoading}
                value={password}
                onChange={handlePasswordChange}
              />
              <Label className="sr-only" htmlFor="confirmPassword">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                placeholder="confirm password"
                type="password"
                autoCapitalize="none"
                autoComplete="current-password"
                autoCorrect="off"
                disabled={isLoading}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              {!passwordsMatch && (
                <p className="text-red-500">Passwords do not match</p>
              )}
              {!notregistered && (
                <p className="text-red-500">No user contains this email</p>
              )}
              
            </div>
            <Button disabled={isLoading}>
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Enter
            </Button>
          </div>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
        </div>
      </div>
    );
  }
  