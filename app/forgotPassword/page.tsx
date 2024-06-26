import { Metadata } from "next"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { ForgotUserForm } from "@/components/forgotpass"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Forgot your password",
}

export default function page() {
  notFound();
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-4 top-4 md:left-8 md:top-8"
        )}
      >
        <>
          Back
        </>
      </Link>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Please Enter Your Mail
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email to set a new password to your account
          </p>
        </div>
        <ForgotUserForm />
      </div>
    </div>
  )
}
