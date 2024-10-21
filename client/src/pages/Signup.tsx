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
    name: z.string().min(4, "Name is required"),
    age: z.coerce.number().int().positive("Age is required"),
    email: z.string().email("Email is required"),
    password: z.string().min(8, "Password must be atleast 8 characters long"),
});

export default function Signup(){
    const methods = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const {register, control, handleSubmit, formState: {errors} } = methods;

    const onSubmit: SubmitHandler<z.infer<typeof schema>> = (data) => {
        console.log(data);
    }

    
    return (
        <div className="flex">
            <div className="flex items-center w-2/6 h-screen bg-gray-100 p-12">
                <div className="w-full">
                    <div className="w-full">
                        <h1 className="text-6xl">MTUNES</h1>
                        <p className="mb-4 text-lg">Please Signup</p>
                    </div>
                    <Form {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <FormField
                                name="name"
                                control={control}
                                render = {() => (
                                    <FormItem>
                                        <FormLabel>
                                            Name
                                        </FormLabel>
                                        <Input id="name" {...register("name")} />
                                        {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
                                    </FormItem>
                                )}
                                />

                                <FormField
                                name="email"
                                control={control}
                                render = {() => (
                                    <FormItem>
                                        <FormLabel>
                                            Age
                                        </FormLabel>
                                        <Input id="age" {...register("age")} />
                                        {errors.age && <FormMessage>{errors.age.message}</FormMessage>}
                                    </FormItem>
                                )}
                                />
                                
                                <FormField
                                name="email"
                                control={control}
                                render = {() => (
                                    <FormItem>
                                        <FormLabel>
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
            <div className="w-full bg-custom-image bg-cover bg-center">

            </div>
        </div>
    )
}