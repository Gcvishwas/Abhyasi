import { useNavigate, useParams } from "react-router-dom";
import { Interview } from "../types";
import { useEffect, useState } from "react";
import LoaderPage from "./loader-page";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase.config";
import { CustomBreadCrumb } from "../components/custom-breadcrumb";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { Lightbulb } from "lucide-react";
import QuestionForm from "@/components/question-form";

const MockInterviewPage = () => {
  const { interviewId } = useParams<{ interviewId: string }>();
  const [interview, setInterview] = useState<Interview | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // useEffect hook fetches interview data from Firestore when interviewId changes
  useEffect(() => {
    const fetchInterview = async () => {
      if (interviewId) {
        try {
          // Fetch the interview document from Firestore
          const interviewDoc = await getDoc(doc(db, "interviews", interviewId));
          if (interviewDoc.exists()) {
            // If document exists, update state with interview data
            setInterview({
              id: interviewDoc.id,
              ...interviewDoc.data(),
            } as Interview);
          }
        } catch (error) {
          // Log any errors during fetch
          console.log(error);
        }
      }
    };
    fetchInterview();
  }, [interviewId, navigate]);

  if (isLoading) {
    return <LoaderPage className="w-full h-[70vh]" />;
  }
  if (!interviewId) {
    navigate("/generate", { replace: true });
  }
  if (!interview) {
    navigate("/generate", { replace: true });
  }
  return (
    <div className="flex flex-col w-full gap-8 py-5">
      <div className="flex items-center justify-between w-full gap-2">
        <CustomBreadCrumb
          breadCrumbPage="Start"
          breadCrumpItems={[
            { label: "Mock Interviews", link: "/generate" },
            {
              label: interview?.position || "",
              link: "/generate/interview/${interview?.id}",
            },
          ]}
        />
      </div>
      <div className="w-full">
        <Alert className="bg-blue-100/50 border-sky-200 p-4 rounded-lg flex items-start gap-3 -mt-3">
          <Lightbulb className="h-5 w-5 text-sky-600" />
          <div>
            <AlertTitle className="text-sky-800 font-semibold">
              Important Note
            </AlertTitle>
            <AlertDescription className="text-sm text-sky-700 mt-2">
              Please press <strong>Record Answer</strong> before you begin
              responding to each interview question. After you complete your
              answers, you will receive feedback by comparing your responses
              with ideal answers to help you improve your interview skills.
              <br />
              <br />
              <span className="font-medium">Note:</span> Your video is{" "}
              <strong>never recorded</strong>. You can disable your webcam at
              any time at your own will.
            </AlertDescription>
          </div>
        </Alert>
      </div>
      {interview?.questions && interview?.questions.length > 0 && (
        <div className="mt-4 w-full flex flex-col items-start gap-4">
        <QuestionForm questions={interview?.questions}/>
        </div>
      )}
    </div>
  );
};

export default MockInterviewPage;
