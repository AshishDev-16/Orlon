"use client"


import axios from "axios";
import * as z from "zod";
import { Heading } from "@/components/Heading";
import { Code } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import ReactMarkdown from "react-markdown";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { formSchema } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";



type ChatCompletionRequestMessage = {
    role: "user";
    content: string;
};

const CodePage = () => {
    const router = useRouter();
    const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

     const isLoading = form.formState.isLoading;

    // const onSubmit = async (values: z.infer<typeof formSchema>) => {
    //     try {
    //         const userMessage: ChatCompletionRequestMessage = { 
    //             role: "user",
    //             content:values.prompt,
    //         };
    //         const newMessages = [...messages, userMessage];

    //         useQuery('message', async () => {
    //             const response = await axios.post("/api/conversation", {
    //                 messages: newMessages
    //             });
    //             setMessages((current) => [...current, userMessage, response.data]);
    //         });

    //         form.reset();

    //     } catch (error:any) {
    //         //TODO: Open Pro Modal
    //         console.log(error);
    //     }finally {
    //         router.refresh();
    //     }
    // };
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const userMessage: ChatCompletionRequestMessage = {
                role: 'user',
                content: values.prompt,
            };
            const newMessages = [...messages, userMessage];

            const response = await axios.post('/api/code', {
                messages
            });

            setMessages((current) => [...current, userMessage, newMessages,response.data]);
            form.reset();

        } catch (error: any) {
            // TODO: open Pro Modal
            console.error(error);
        }finally {
            router.refresh();
        }
    };

    return (
        <div className="">
            <Heading
                title="Code Generation"
                description="Genarate code using descriptive text."
                icon={Code}
                iconColor="text-green-700"
                bgColor="bg-green-700/10"
            />
            <div className="px-4 lg:px-8">
                <div className="">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg
                        border
                        w-full
                        p-4
                        px-3
                        md:px-6
                        focus-within:shadow-sm
                        grid
                        grid-cols-12
                        gap-2
                        "
                        >
                            <FormField
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0 p-0">
                                            <Input
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="Enter a prompt here..."
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex item-center justify-center bg-slate-100">
                            <Loader/>
                        </div>
                    )}
                    {messages.length === 0 && !isLoading && (
                        <Empty
                        label="Temporarily unavailable"
                        />
                    )}
                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.map((message) => (
                            <div 
                            key={message.content}
                            className={cn(
                                "p-8 w-full flex items-start gap-x-8 rounded-lg",
                                message.role === "user" ? "bg-white border border-black/10": "bg-slate-100"
                            )}
                            >
                                {message.role === "user"? <UserAvatar/> : <BotAvatar/>}
                                <ReactMarkdown 
                                components={{
                                    pre: ({node, ...props}) => (
                                        <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                                                <pre {...props} />
                                        </div>
                                    ),
                                    code: ({node, ...props}) => (
                                        <code className="bg-black/10 p-1 rounded-lg p-1" {...props} />
                                    )
                                }}
                                className="text-sm overflow-hidden leading-7"
                                >
                                    {message.content || ""}
                                </ReactMarkdown>
                                
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CodePage;