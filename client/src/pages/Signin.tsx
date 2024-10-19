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

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export default function Signin(){
    const methods = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const {register, control, handleSubmit } = methods;

    const onSubmit: SubmitHandler<z.infer<typeof schema>> = (data) => {
        console.log(data);
    }

    
    return (
        <div className="flex">
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
                                        <FormLabel>
                                            Email
                                        </FormLabel>
                                        <Input id="email" {...register("email")} />
                                        
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