import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useToast } from "@/hooks/use-toast"

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export default function Signin(){
    const { toast } = useToast();

    const methods = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const {register, control, handleSubmit, formState: {errors} } = methods;

    const onSubmit: SubmitHandler<z.infer<typeof schema>> = (data) => {
        let request = {
            email: data.email,
            password: data.password,
        }

        axios.post("http://127.0.0.1:8000/api/signin", request).then((res)=>{
            let token = res.data.token;
            localStorage.setItem("token", token);
            window.location.href = "/";
        }).catch((err)=>{
            let error = err.response.data.message;

            toast ({
                title: "Error",
                description: error,
                variant: "destructive"
            })
        })
    }

    
    return (
        <div className="flex ">
            <div className="flex items-center w-2/6 h-screen bg-gray-100 p-12">
                <div className="w-full">
                    <div className="w-full">
                        <h1 className="text-6xl">MTUNES</h1>
                        <p className="mb-4 text-lg">Please Signin</p>
                    </div>
                    <Form {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                <FormField
                                name="email"
                                control={control}
                                render = {() => (
                                    <FormItem>
                                        <FormLabel className="font-bold">
                                            Email
                                        </FormLabel>
                                        <Input id="email" {...register("email")} />
                                        {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
                                    </FormItem>
                                )}
                                />

                                <FormField
                                name="password"
                                control={control}
                                render = {() => (
                                    <FormItem>
                                        <FormLabel>
                                            Password
                                        </FormLabel>
                                        <Input id="password" {...register("password")} type="password" />
                                        {errors.password && <FormMessage>{errors.password.message}</FormMessage>}
                                    </FormItem>
                                )}
                                />
                                <Button size={"lg"} variant="default" type="submit">Submit</Button>
                        </form>
                    </Form>
                </div>
            </div>
            <div className="w-full bg-custom-image-2 bg-cover bg-center">

            </div>
        </div>
    )
}