import { Interview } from "@/types";
import { CustomBreadCrumb } from "./custom-breadcrumb";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "sonner";
import Headings from "./headings";
import { Button } from "./ui/button";
import { Loader, Trash2 } from "lucide-react";
import Separator from "./ui/separator";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import chatSession from "@/scripts";
// import { json } from "stream/consumers"
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase.config";
interface FormMockInterviewProps {
  initialData: Interview | null;
}

const formSchema = z.object({
  position: z
    .string()
    .min(1, "Position is required")
    .max(100, "Position must be less than 100 characters"),
  description: z.string().min(1, " Description is required"),
  experience: z.coerce.number().min(0, "Experience must be a positive number"),
  techStack: z.string().min(1, "Tech Stack is required"),
});

// used to extract the type from the schema eg: type FormData = {
//     position: string;
// description: string; exitCode.
type FormData = z.infer<typeof formSchema>;

const FormMockInterview = ({ initialData }: FormMockInterviewProps) => {
  const form = useForm<FormData>({
    //resolver is a validation function that takes the form data and returns an object with errors if any.
    //zodresolver tells form to validate form accordingt to formScema
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {},
  });

  //formState is an object that contains the state of the form, such as whether it is valid, dirty, touched, etc.
  const { isValid, isSubmitting } = form.formState;
  const [loading, setLoading] = useState(false);
  //useNavigate is useful for redirecting the user to a different page after form submission or any other action.
  const navigate = useNavigate();
  const { userId } = useAuth();

  const title = initialData?.position
    ? initialData?.position
    : "New Mock Interview";

  const breadCrumbPage = initialData?.position
    ? initialData?.position
    : "Create";

  const actions = initialData ? "Save Changes" : "Create Mock Interview";
  const toastMessage = initialData
    ? {
        title: " Updated..!",
        description: "Mock Interview updated successfully",
      }
    : {
        title: " Created..!",
        description: "Mock Interview created successfully",
      };

  const cleanAiResponse = (response: string) => {
    // Clean the AI response to ensure it is a valid JSON array
    let cleanText = response.trim();
    // Remove any occurences of  "json" or code block symbols (` or)
    cleanText = cleanText.replace(/(json|```|)`/g, "");
    //Extract the JSON array from the cleaned text between square brackets
    const jsonArrayMatch = cleanText.match(/\[.*\]/s);
    if (jsonArrayMatch) {
      cleanText = jsonArrayMatch[0];
    } else {
      throw new Error("Invalid AI response format. Expected a JSON array.");
    }
    //Parse the clean JSON array as text into an array of objects
    try {
      return JSON.parse(cleanText);
    } catch (error) {
      throw new Error("Invalid JSON format:" + (error as Error)?.message);
    }
  };
  const generateAiResponse = async (data: FormData) => {
    const prompt = `
        As an experienced prompt engineer, generate a JSON array containing 5 technical interview questions along with detailed answers based on the following job information. Each object in the array should have the fields "question" and "answer", formatted as follows:

        [
          { "question": "<Question text>", "answer": "<Answer text>" },
          ...
        ]

        Job Information:
        - Job Position: ${data?.position}
        - Job Description: ${data?.description}
        - Years of Experience Required: ${data?.experience}
        - Tech Stacks: ${data?.techStack}

        The questions should assess skills in ${data?.techStack} development and best practices, problem-solving, and experience handling complex requirements. Please format the output strictly as an array of JSON objects without any additional labels, code blocks, or explanations. Return only the JSON array with questions and answers.
        `;
    //rawAiResult is the response from the AI service, which contains the generated interview questions and answers.
    const rawAiResult = await chatSession.sendMessage(prompt);
    // console.log(rawAiResult.response.text().trim());
    const cleanedResponse = cleanAiResponse(rawAiResult.response.text().trim());
    console.log(cleanedResponse);

    return cleanedResponse;
  };
  const onDelete = async () => {
    if (!initialData?.id) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this interview?"
    );
    if (!confirmDelete) return;

    try {
      setLoading(true);
      await deleteDoc(doc(db, "interviews", initialData.id));
      toast.success("Deleted!", {
        description: "Mock Interview deleted successfully",
      });
      navigate("/generate", { replace: true });
    } catch (error) {
      console.error("Error deleting document: ", error);
      toast.error("Error", {
        description: "Failed to delete the interview. Try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      if (initialData) {
        //update

        const aiResult = await generateAiResponse(data);

        await updateDoc(doc(db, "interviews", initialData?.id), {
          questions: aiResult,
          ...data,
          updatedAt: serverTimestamp(),
        });
        toast.success(toastMessage.title, {
          description: toastMessage.description,
        });
      } else {
        //Create new interview
        if (isValid) {
          // aiResult is cleaned response
          const aiResult = await generateAiResponse(data);

          await addDoc(collection(db, "interviews"), {
            ...data,
            userId,
            questions: aiResult,
            createdAt: serverTimestamp(),
          });

          toast.success(toastMessage.title, {
            description: toastMessage.description,
          });
        }
      }
      navigate("/generate", { replace: true });
      console.log("Form Data: ", data);
    } catch (error) {
      console.log(error);
      toast.error("Error..", {
        description: "Something went wrong, please try again later",
      });
    } finally {
      setLoading(false);
    }
  };
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
        breadCrumpItems={[{ link: "/generate", label: "Interviews" }]}
      />
      <div className="w-full flex-col space-y-4">
        <Headings title={title} isSubHeading />
        {initialData && (
          <Button
            size="icon"
            variant="ghost"
            onClick={onDelete}
            disabled={loading}
          >
            <Trash2 className="min-w-4 min-h-4 text-red-500" />
          </Button>
        )}
      </div>

      <Separator className="my-4"></Separator>

      {/* <div className="my-6">
        <Button onClick={() => alert("Button Clicked!")}></Button>
      </div> */}

      {/* spread operators expands an iterable (like an array) into more elements. */}
      {/* spread operators are used to pass the form methods to the FormProvider component, which allows us to use the form methods in the child components. */}
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full p-8 rounded-lg flex flex-col items-start justify-start gap-6 shadow-md"
        >
          {/* Position */}
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem className="w-full space-y-4">
                <div className="w-full flex items-center justify-between">
                  <FormLabel>Job Role/Job Position</FormLabel>
                  <FormMessage className="text-sm"></FormMessage>
                </div>
                <FormControl>
                  <Input
                    disabled={loading}
                    className="h-12"
                    placeholder="eg: ML- engineer"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          ></FormField>

          {/* description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full space-y-4">
                <div className="w-full flex items-center justify-between">
                  <FormLabel>Description</FormLabel>
                  <FormMessage className="text-sm"></FormMessage>
                </div>
                <FormControl>
                  <Textarea
                    disabled={loading}
                    className="h-12"
                    placeholder="eg: Describe your job role"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          ></FormField>

          {/* Experience */}
          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem className="w-full space-y-4">
                <div className="w-full flex items-center justify-between">
                  <FormLabel>Experience</FormLabel>
                  <FormMessage className="text-sm"></FormMessage>
                </div>
                <FormControl>
                  <Input
                    disabled={loading}
                    className="h-12"
                    placeholder="eg: Enter your experience"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          ></FormField>
          {/* TechStack */}

          <FormField
            control={form.control}
            name="techStack"
            render={({ field }) => (
              <FormItem className="w-full space-y-4">
                <div className="w-full flex items-center justify-between">
                  <FormLabel>Tech Stack</FormLabel>
                  <FormMessage className="text-sm"></FormMessage>
                </div>
                <FormControl>
                  <Input
                    disabled={loading}
                    className="h-12"
                    placeholder="eg: Your preferred tech stack"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          ></FormField>

          <div className=" w-full flex items-center justify-end gap-6">
            <Button
              type="reset"
              size={"sm"}
              variant={"outline"}
              disabled={isSubmitting || loading}
              onClick={() => {
                form.reset();
                toast("Form reset successful");
              }}
            >
              Reset
            </Button>
            <Button
              type="submit"
              size={"sm"}
              variant={"outline"}
              disabled={isSubmitting || loading || !isValid}
            >
              {loading ? (
                <Loader className="text-gray-50 animate-spin" />
              ) : (
                actions
              )}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default FormMockInterview;
