import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormField,
    FormDescription,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export default function Signin(){
    const { handleSubmit, control} = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit: SubmitHandler<z.infer<typeof schema>> = (data) => {
        console.log(data);
    }

    
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-96 bg-gray-950 p-8 rounded-md">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div className="w-full text-center">
                            <FormLabel className="text-white text-3xl">
                                My Music
                            </FormLabel>
                        </div>
                        <FormField
                        name="email"
                        control={control}
                        render = {({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Email
                                </FormLabel>
                                <Input id="email" {...field} />
                            </FormItem>
                        )}
                        />

                        <FormField
                        name="password"
                        control={control}
                        render = {({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Password
                                </FormLabel>
                                <Input id="password" {...field} type="password" />
                            </FormItem>
                        )}
                        />
                        <Button variant="secondary" type="submit">Submit</Button>
                </form>
            </div>
        </div>
    )
}