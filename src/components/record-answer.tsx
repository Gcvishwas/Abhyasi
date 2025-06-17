import { useAuth } from "@clerk/clerk-react";
import Webcam from "react-webcam";
import { useEffect, useState } from "react";
import useSpeechToText, { ResultType } from "react-hook-speech-to-text";
import { useParams } from "react-router-dom";
import {
  CircleStop,
  Loader,
  Mic,
  RefreshCw,
  Save,
  Video,
  VideoOff,
  WebcamIcon,
} from "lucide-react";

import ToolTipButton from "./tooltip_button";
import { toast } from "sonner";
import chatSession from "@/scripts";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { SaveModal } from "./save-modal";
// import { record } from "zod";

// Extend the Window interface to include SpeechRecognition types
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface RecordAnswerProps {
  question: { question: string; answer: string };
  isWebCam: boolean;
  setIsWebCam: (value: boolean) => void;
}

interface AIResponse {
  ratings: number;
  feedback: string;
}

const RecordAnswer = ({
  question,
  isWebCam,
  setIsWebCam,
}: RecordAnswerProps) => {
  const {
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const [userAnswer, setUserAnswer] = useState("");
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiResult, setAiResult] = useState<AIResponse | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);
  const { userId } = useAuth();
  const { interviewId } = useParams();

  // Check for speech recognition support on component mount
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error(
        "Your browser does not support Speech Recognition. Please use Chrome for best experience."
      );

      setIsSpeechSupported(false);
    }
  }, []);

  //  Initially isRecording is false and calls all false conditions
  //  OnClick it calls recordUserAnswer and executes else statement
  //  else statement continues the recording but also changes state to true hence the CircleStop icons are shown
  //  since button hasn't been clicked again function doesn't know state has changed to false
  //  after click only then if condition is executed
  const recordUserAnswer = async () => {
    if (isRecording) {
      stopSpeechToText();

      if (userAnswer?.length < 30) {
        toast.error("Error", {
          description: "Your answer is too short",
        });
        return;
      }

      // aiResult
      const aiResult = await generateResult(
        question.question,
        question.answer,
        userAnswer
      );
      console.log(aiResult);
      setAiResult(aiResult);
    } else {
      startSpeechToText();
    }
  };

  const cleanJsonResponse = (responseText: string) => {
    // Step 1: Trim any surrounding whitespace
    let cleanText = responseText.trim();

    // Step 2: Remove any occurrences of "json" or code block symbols (``` or `)
    cleanText = cleanText.replace(/(json|```|`)/g, "");

    // Step 3: Parse the clean JSON text into an array of objects
    try {
      return JSON.parse(cleanText);
    } catch (error) {
      throw new Error("Invalid JSON format: " + (error as Error)?.message);
    }
  };

  const generateResult = async (
    qst: string,
    qstAns: string,
    userAns: string
  ): Promise<AIResponse> => {
    setIsAiGenerating(true);
    const prompt = `
      Question: "${qst}"
      User Answer: "${userAns}"
      Correct Answer: "${qstAns}"
      Please compare the user's answer to the correct answer, and provide a rating (from 1 to 10) based on answer quality, and offer feedback for improvement.
      Return the result in JSON format with the fields "ratings" (number) and "feedback" (string).
    `;

    try {
      const rawAiResult = await chatSession.sendMessage(prompt);

      const parsedResult: AIResponse = cleanJsonResponse(
        rawAiResult.response.text()
      );
      return parsedResult;
    } catch (error) {
      console.log(error);
      toast("Error", {
        description: "An error occurred while generating feedback.",
      });
      return { ratings: 0, feedback: "Unable to generate feedback" };
    } finally {
      setIsAiGenerating(false);
    }
  };

  const recordNewAnswer = () => {
    setUserAnswer("");
    stopSpeechToText();
    startSpeechToText();
  };

  /*If we want to delete previous answers
  const saveUserAnswer = async () => {
    const currentQuestion = question.question;
    setLoading(true);
    if (!aiResult) {
      return;
    }
    try {
      // 1. Query previous answers
      const previousQuery = query(
        collection(db, "userAnswers"),
        where("userId", "==", userId),
        where("question", "==", currentQuestion)
      );

      const previousAnswers = await getDocs(previousQuery);

      // 2. Delete them all
      const deletePromises = previousAnswers.docs.map((doc) =>
        deleteDoc(doc.ref)
      );
      await Promise.all(deletePromises);

      // 3. Add the new answer
      await addDoc(collection(db, "userAnswers"), {
        mockIdRef: interviewId,
        question: question.question,
        correct_answer: question.answer,
        user_answer: userAnswer,
        ratings: aiResult.ratings,
        feedback: aiResult.feedback,
        userId,
        createdAt: serverTimestamp(),
      });

      toast.success("Your new answer has been saved!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save answer");
    }
  };*/

  const saveUserAnswer = async () => {
    setLoading(true);
    if (!aiResult) {
      return;
    }
    const currentQuestion = question.question;
    try {
      //query to check if the user has already answered  this question
      // const userAnswerQuery = query(
      //   collection(db, "userAnswers"),
      //   where("userId", "==", userId),
      //   where("question", "==", currentQuestion)
      // );
      // const querySnap = await getDocs(userAnswerQuery);

      // If the user has already answered this question, show an error
      // if (!querySnap.empty) {
      //   console.log("Query Snap Size", querySnap.size);
      //   toast.error("You have already answered this question.");
      //   return;
      // } else
      await addDoc(collection(db, "userAnswers"), {
        mockIdRef: interviewId,
        question: question.question,
        correct_answer: question.answer,
        user_answer: userAnswer,
        ratings: aiResult.ratings,
        feedback: aiResult.feedback,
        userId,
        createdAt: serverTimestamp(),
      });
      toast("Success", {
        description: "Your answer has been saved successfully!",
      });

      setUserAnswer("");
      stopSpeechToText();
    } catch (error) {
      toast("Error", {
        description:
          "An error occurred while generating feedback due to " +
          (error as Error).message,
      });
      console.log(error);
    } finally {
      setLoading(false);
      setOpen(!open); // Close the modal after saving
    }
  };

  useEffect(() => {
    const combineTranscripts = results
      .filter((result): result is ResultType => typeof result !== "string")
      .map((result) => result.transcript)
      .join(" ");

    setUserAnswer(combineTranscripts);
  }, [results]);

  return (
    <div className="w-full flex flex-col items-center gap-8 mt-4">
      {/* save modal */}

      <SaveModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={saveUserAnswer}
        loading={loading}
      />

      {!isSpeechSupported && (
        <h1 className="text-lg text-red-500">
          Your browser does not support Speech Recognition. Please use Chrome
          for best experience.
        </h1>
      )}
      <div className="w-full h-[400px] md:w-96 flex flex-col items-center justify-center border p-4 bg-gray-50 rounded-md">
        {/* So initially the state is false and WebCamIcon is shown after toggling
        button the isWebCam is set to true running WebCam and looks for whether
        the user has granted permission or not and then runs userMedia or
        userMediaError accordingly */}

        {isWebCam ? (
          <Webcam
            onUserMedia={() => setIsWebCam(true)}
            onUserMediaError={() => setIsWebCam(false)}
            className="w-full h-full object-cover rounded-md"
          />
        ) : (
          <WebcamIcon className="min-w-24 min-h-24 text-muted-foreground" />
        )}
      </div>
      <div className="flex items-center gap-3">
        <ToolTipButton
          content={isWebCam ? "Turn Off" : "Turn On"}
          icon={
            isWebCam ? (
              <VideoOff className="min-w-5 min-h-5" />
            ) : (
              <Video className="min-w-5 min-h-5" />
            )
          }
          onClick={() => setIsWebCam(!isWebCam)}
        />
        <ToolTipButton
          content={isRecording ? "Stop Recording" : "Start Recording"}
          icon={
            isRecording ? (
              <CircleStop className="min-w-5 min-h-5" />
            ) : (
              <Mic className="min-w-5 min-h-5" />
            )
          }
          onClick={recordUserAnswer}
        />
        <ToolTipButton
          content="Record Again"
          icon={<RefreshCw className="min-w-5 min-h-5" />}
          onClick={recordNewAnswer}
        />
        <ToolTipButton
          content="Save Result"
          icon={
            isAiGenerating ? (
              <Loader className="min-w-5 min-h-5 animate-spin" />
            ) : (
              <Save className="min-w-5 min-h-5" />
            )
          }
          onClick={() => setOpen(!open)}
          disabled={!aiResult}
        />
      </div>

      <div className="w-full mt-4 p-4 border rounded-md bg-gray-50">
        <h2 className="text-lg font-semibold">Your Answer:</h2>

        <p className="text-sm mt-2 text-gray-700 whitespace-normal">
          {userAnswer || "Start recording to see your answer here"}
        </p>

        {interimResult && (
          <p className="text-sm text-gray-500 mt-2">
            <strong>Current Speech:</strong>
            {interimResult}
          </p>
        )}
      </div>
    </div>
  );
};

export default RecordAnswer;
