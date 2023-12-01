import Link from "next/link";
import { Button } from "@/components/ui/button";
import LoginForm from "@/components/forms/LoginForm";
import { Icons } from "@/components/ui/icons";

export default function LoginPage() {
    return (
        <>
            <div className="container relative h-screen grid flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <Link
                    href="/register"
                    className={"absolute right-4 top-4 md:right-8 md:top-8"}
                >
                    <Button variant={"ghost"}>
                        Don&apos;t have an account?
                    </Button>
                </Link>
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                    <div className="absolute inset-0 bg-zinc-900" />
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-6 w-6"
                        >
                            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
                        </svg>
                        Acme Inc
                    </div>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-lg">
                                &ldquo;This library has saved me countless hours
                                of work and helped me deliver stunning designs
                                to my clients faster than ever before.&rdquo;
                            </p>
                            <footer className="text-sm">Sofia Davis</footer>
                        </blockquote>
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Login
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your email and password to login
                            </p>
                        </div>
                        <LoginForm />
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Or continue with
                                </span>
                            </div>
                        </div>
                        <Button variant="outline" type="button">
                            <Icons.google className="mr-2 h-4 w-4" />
                            Google
                        </Button>
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            Forgot your password?{" "}
                            <Link
                                href="/auth/password-reset"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Reset it here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
