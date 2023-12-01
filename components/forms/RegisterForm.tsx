"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "@/redux/features/authApiSlice";
import {Icons} from "@/components/ui/icons";

const formSchema = z.object({
    email: z.string().email("Please enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters long."),
});

export default function RegisterForm() {
    const router = useRouter();
    const [register, { isLoading }] = useRegisterMutation();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        register(values)
            .unwrap()
            .then(() => {
                toast({
                    variant: "success",
                    title: "Please check email to verify account",
                });
                router.push("/login");
            })
            .catch((res) => {
                if (res.status === 400) {
                    toast({
                        variant: "destructive",
                        title: "Failed to create account, please check errors below",
                    });

                    for (const [key, value] of Object.entries(res.data)) {
                        form.setError(key as keyof z.infer<typeof formSchema>, {
                            type: "manual",
                            message: value as string,
                        });
                    }
                } else {
                    toast({
                        variant: "destructive",
                        title: "Failed to create account, please try again later",
                    });
                }
            });
    }

    return (
        <main className="">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-2 grid"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="email"
                                        placeholder={"email@example.com"}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input {...field} type="password" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isLoading}>
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Create account
                    </Button>
                </form>
            </Form>
        </main>
    );
}
