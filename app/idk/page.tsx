"use client"

import {zodResolver} from "@hookform/resolvers/zod"
import {useForm} from "react-hook-form"
import * as z from "zod"

import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input"
import {Switch} from "@/components/ui/switch"
import {toast} from "@/components/ui/use-toast";

const MAX_TOTAL_SIZE_MB = 30; // Maximum total size in megabytes
const MAX_TOTAL_SIZE_BYTES = MAX_TOTAL_SIZE_MB * 1024 * 1024; // Convert MB to bytes


const formSchema = z.object({
    files: z.custom<FileList>()
        .refine(files => files.length >= 1, {
            message: "Please select at least one file.",
        })
        .refine(files => Array.from(files).every(file => file.type === 'application/pdf'), {
            message: "All files must be PDFs.",
        })
        .refine(files => {
            const totalSize = Array.from(files).reduce((total, file) => total + file.size, 0);
            return totalSize <= MAX_TOTAL_SIZE_BYTES;
        }, {
            message: `Total file size must not exceed ${MAX_TOTAL_SIZE_MB} MB.`,
        }),
    useGPU: z.boolean(),
})

export default function Home() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            useGPU: false,
        }
    })

    const fileRef = form.register('files', {required: true});

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)

        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify({
                            ...values,
                            files: values.files instanceof FileList ? Array.from(values.files, file => file.name) : values.files
                        }, null, 2)}
                    </code>
                </pre>
            ),
        })

        form.setError("useGPU", {
            type: "manual",
            message: "GPU is not supported yet.",
        })

        // create a new FormData object
        let formData = new FormData();
        // formData.append("description", values.description);
        formData.append("use_gpu", values.useGPU.toString());
        for (let i = 0; i < values.files.length; i++) {
            formData.append("files", values.files[i]);
        }

        // send the form data to the API
        // const res = await fetch('/api/upload', {
        //     method: 'POST',
        //     body: formData
        // })
    }


    return (
        <main className="flex justify-center p-24">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="files"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Files</FormLabel>
                                <FormControl>
                                    <Input type="file" multiple {...fileRef} />
                                </FormControl>
                                <FormDescription>
                                    Files to be uploaded.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="useGPU"
                        render={({field}) => (
                            <FormItem>
                                <div className="flex justify-between">

                                    <FormLabel>Use GPU</FormLabel>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </div>
                                <FormDescription>
                                    Whether to use the GPU for processing.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </main>
    )
}
