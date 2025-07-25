import { db } from "@/config/firebase.config";
import { Interview } from "@/types";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CustomBreadCrumb } from "@/components/custom-breadcrumb";
import { Button } from "@/components/ui/button";
import { Lightbulb, Sparkle, WebcamIcon } from "lucide-react";
import InterviewPin from "@/components/interviewpin";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Webcam from "react-webcam";

const MockLoadPage = () => {
  const { interviewId } = useParams<{ interviewId: string }>();
  const [interview, setInterview] = useState<Interview | null>(null);
  const [isWebCamEnabled, setIsWebCamEnabled] = useState(false);
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
          breadCrumbPage={interview?.position || ""}
          breadCrumpItems={[{ label: "Mock Interviews", link: "/generate" }]}
        />
        <Link to={`/generate/interview/${interviewId}/start`}>
          <Button size={"sm"} variant={"outline"}>
            Start
            <Sparkle />
          </Button>
        </Link>
      </div>
      {interview && <InterviewPin interview={interview} onMockPage />}
      <Alert className="bg-yellow-100/50 border-yellow-200 p-4 rounded-lg flex items-start gap-3 -mt-3">
        <Lightbulb className="h-5 w-5 text-yellow-600" />
        <div>
          <AlertTitle className="text-yellow-800 font-semibold">
            Important info
          </AlertTitle>
          <AlertDescription className="text-sm text-yellow-700 mt-2">
            Please enable your webcam and microphone to proceed with the mock
            interview. This helps simulate a real interview environment and
            ensures all features work as intended. <br />
            <br />
            <span className="font-medium">Note:</span> Your video is{" "}
            <strong>never recorded</strong>. You can disable your webcam at any
            time.
          </AlertDescription>
        </div>
      </Alert>
      <div className="flex items-center justify-center w-full h-full">
        <div className="w-full h-[400px] md:w-96 flex flex-col items-center justify-center border p-4 bg-gray-50 rounded-md">
          {isWebCamEnabled ? (
            <Webcam
              onUserMedia={() => setIsWebCamEnabled(true)}
              onUserMediaError={() => setIsWebCamEnabled(false)}
              className="w-full h-full object-cover rounded-md"
            />
          ) : (
            <WebcamIcon className="min-w-24 min-h-24 text-muted-foreground" />
          )}
        </div>
      </div>

      <div className="flex items-center justify-center">
        <Button onClick={() => setIsWebCamEnabled(!isWebCamEnabled)}>
          {isWebCamEnabled ? "Disable Webcam" : "Enable Webcam"}
        </Button>
      </div>
    </div>
  );
};

export default MockLoadPage;
