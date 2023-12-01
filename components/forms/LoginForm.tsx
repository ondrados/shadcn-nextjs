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
import { useLoginMutation } from "@/redux/features/authApiSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { setAuth } from "@/redux/features/authSlice";
import { Icons } from "../ui/icons";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export default function LoginForm() {
    const router = useRouter();
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useAppDispatch();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        login(values)
            .unwrap()
            .then(() => {
                dispatch(setAuth());
                toast({
                    variant: "success",
                    title: "Successfully logged in",
                });
                router.push("/dashboard");
            })
            .catch((res) => {
                if (res.status === 401) {
                    toast({
                        variant: "destructive",
                        title: "Failed to login",
                        description: res.data.detail as string,
                    });
                } else {
                    toast({
                        variant: "destructive",
                        title: "Failed to login, please try again later",
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
                                    <Input {...field} type="email" />
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
                        Login
                    </Button>
                </form>
            </Form>
        </main>
    );
}
