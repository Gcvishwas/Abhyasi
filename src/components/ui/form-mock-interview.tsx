import { Interview } from "@/types"
import { CustomBreadCrumb } from "./custom-breadcrumb"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@clerk/clerk-react"
import { toast } from "sonner"
import Headings from "./headings"
import { Button } from "./button"
import { Trash2 } from "lucide-react"
import Separator from "./separator"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form"
import { Input } from "./input"
import { Textarea } from "./textarea"
interface FormMockInterviewProps {
    initialData: Interview | null
}

const formSchema = z.object({
    position: z.string().min(1, "Position is required")
        .max(100, "Position must be less than 100 characters"),
    description: z.string().min(10, " Description is required"),
    experience: z.coerce.number().min(0, "Experience must be a positive number"),
    techStack: z.string().min(1, "Tech Stack is required"),
});


// used to extract the type from the schema eg: type FormData = {
//     position: string;    
// description: string; exitCode.
type FormData = z.infer<typeof formSchema>

const FormMockInterview = ({ initialData }: FormMockInterviewProps) => {

    const form = useForm<FormData>({
        //resolver is a validation function that takes the form data and returns an object with errors if any.
        //zodresolver tells form to validate form accordingt to formScema
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {}
    })



    const { isValid, isSubmitted } = form.formState;
    const [loading, setLoading] = useState(false);
    //useNavigate is useful for redirecting the user to a different page after form submission or any other action.
    const navigate = useNavigate();
    const { userId } = useAuth();

    const title = initialData?.position ? initialData?.position : "New Mock Interview";

    const breadCrumbPage = initialData?.position ? initialData?.position : "Create";


    const actions = initialData ? "Save Changes" : "Create Mock Interview";
    const toastMessage = initialData ? { title: " Updated..!", description: "Mock Interview updated successfully" } : { title: " Created..!", description: "Mock Interview created successfully" };


    const onSubmit = async (data: FormData) => {
        try {
            setLoading(true);
        } catch (error) {
            console.log(error);
            toast.error("Error..", {
                description: "Something went wrong, please try again later"
            })
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (initialData) {
            form.reset({
                position: initialData.position,
                description: initialData.description,
                experience: initialData.experience,
                techStack: initialData.techStack,
            });
        }
    }, [initialData, form]);
    return (
        <div className="w-full flex-col space-y-4">
            <CustomBreadCrumb
                breadCrumbPage={breadCrumbPage}
                breadCrumpItems={[
                    { link: "/generate", label: "Interviews" }]}
            />
            <div className="w-full flex-col space-y-4">
                <Headings title={title} isSubHeading />
                {!initialData && (
                    <Button size={"icon"} variant={"ghost"}>
                        <Trash2 className="min-w-4 min-h-4 text-red-500"></Trash2>
                    </Button>)}
            </div>

            <Separator className="my-4"></Separator>

            <div className="my-6"></div>

            {/* spread operators expands an iterable (like an array) into more elements. */}
            {/* spread operators are used to pass the form methods to the FormProvider component, which allows us to use the form methods in the child components. */}
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full p-8 rounded-lg flex flex-col items-start justify-start gap-6 shadow-md">

                    {/* Position */}
                    <FormField
                        control={form.control}
                        name="position"
                        render={({ ...field }) => (
                            <FormItem className="w-full space-y-4">
                                <div className="w-full flex items-center justify-between">
                                    <FormLabel>
                                        Job Role/Job Position
                                    </FormLabel>
                                    <FormMessage className="text-sm"></FormMessage>
                                </div>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={loading}
                                        className="h-12"
                                        placeholder="eg: ML- engineer" />
                                </FormControl>
                            </FormItem>
                        )}
                    ></FormField>


                    {/* description */}
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ ...field }) => (
                            <FormItem className="w-full space-y-4">
                                <div className="w-full flex items-center justify-between">
                                    <FormLabel>
                                        Description
                                    </FormLabel>
                                    <FormMessage className="text-sm"></FormMessage>
                                </div>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        disabled={loading}
                                        className="h-12"
                                        placeholder="eg: Describe your job role" />
                                </FormControl>
                            </FormItem>
                        )}
                    ></FormField>

                    {/* Experience */}
                    <FormField
                        control={form.control}
                        name="experience"
                        render={({ ...field }) => (
                            <FormItem className="w-full space-y-4">
                                <div className="w-full flex items-center justify-between">
                                    <FormLabel>
                                        Experience
                                    </FormLabel>
                                    <FormMessage className="text-sm"></FormMessage>
                                </div>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={loading}
                                        className="h-12"
                                        placeholder="eg: Enter your experience" />
                                </FormControl>
                            </FormItem>
                        )}
                    ></FormField>
                    {/* TechStack */}

                    <FormField
                        control={form.control}
                        name="techStack"
                        render={({ ...field }) => (
                            <FormItem className="w-full space-y-4">
                                <div className="w-full flex items-center justify-between">
                                    <FormLabel>
                                        Tech Stack
                                    </FormLabel>
                                    <FormMessage className="text-sm"></FormMessage>
                                </div>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={loading}
                                        className="h-12"
                                        placeholder="eg: Your preferred tech stack" />
                                </FormControl>
                            </FormItem>
                        )}
                    ></FormField>
                </form>
            </FormProvider>
        </div >
    )
}

export default FormMockInterview
