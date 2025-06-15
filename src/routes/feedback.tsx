import { CustomBreadCrumb } from "@/components/custom-breadcrumb";
import Headings from "@/components/headings";
import InterviewPin from "@/components/interviewpin";
import { db } from "@/config/firebase.config";
import { Interview, UserAnswer } from "@/types";
import { useAuth } from "@clerk/clerk-react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useMemo, useState } from "react";
import { replace, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { CircleCheck, Star } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const Feedback = () => {
  const { interviewId } = useParams<{ interviewId: string }>();
  const [interview, setInterview] = useState<Interview | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbacks, setFeedbacks] = useState<UserAnswer[]>([]);
  const [activeFeed, setActiveFeed] = useState("");
  const { userId } = useAuth();
  const navigate = useNavigate();

  if (!interviewId) {
    navigate("/generate", { replace: true });
  }

  useEffect(() => {
    if (interviewId) {
      const fetchInterview = async () => {
        if (interviewId) {
          try {
            const interviewDoc = await getDoc(
              doc(db, "interviews", interviewId)
            );
            if (interviewDoc.exists()) {
              setInterview({
                id: interviewDoc.id,
                ...interviewDoc.data(),
              } as Interview);
            }
          } catch (error) {
            console.log(error);
          }
        }
      };

      const fetchFeedbacks = async () => {
        setIsLoading(true);
        try {
          const querSanpRef = query(
            collection(db, "userAnswers"),
            where("userId", "==", userId),
            where("mockIdRef", "==", interviewId)
          );

          const querySnap = await getDocs(querSanpRef);

          const interviewData: UserAnswer[] = querySnap.docs.map((doc) => {
            return { id: doc.id, ...doc.data() } as UserAnswer;
          });

          setFeedbacks(interviewData);
        } catch (error) {
          console.log(error);
          toast("Error", {
            description: "Something went wrong. Please try again later..",
          });
        } finally {
          setIsLoading(false);
        }
      };
      fetchInterview();
      fetchFeedbacks();
    }
  }, [interviewId, navigate, userId]);

  //useMemo hook helps us to memorize the function
  //  until and unless if there is no changes in data that we are receiving it is not going to recreate the function

  // Calculate the overall rating based on feedbacks

  const overAllRating = useMemo(() => {
    if (feedbacks.length === 0) {
      return "0.0";
    }
    // reduce is used to accumulate sum of all feedback.rating values
    const totalrating = feedbacks.reduce(
      (acc, feedback) => acc + feedback.ratings,
      0
    );

    return (totalrating / feedbacks.length).toFixed(1);
  }, [feedbacks]);
  return (
    <div className="flex flex-col w-full gap-8 py-5">
      <div className="flex items-center justify-between w-full gap-2">
        <CustomBreadCrumb
          breadCrumbPage={"Feedback"}
          breadCrumpItems={[
            { label: "Mock Interviews", link: "/generate" },
            {
              label: `${interview?.position}`,
              link: `/generate/interview/${interview?.id}`,
            },
          ]}
        />
      </div>
      <Headings
        title="Way to Go !!!"
        description="Your feedback summary is ready! Review your performance, note areas for improvement, and celebrate your strengths. Best of luck on your journey ahead!"
      />

      <p className="text-base text-muted-foreground">
        Overall Rating:{" "}
        <span
          className={`font-bold ${
            Number(overAllRating) >= 8
              ? "text-green-500" // Good
              : Number(overAllRating) >= 5
              ? "text-yellow-500" // Excellent
              : Number(overAllRating) >= 4
              ? "text-sky-500" // Average
              : "text-gray-500" // Low but neutral
          }`}
        >
          {Number(overAllRating).toFixed(1)}/10
        </span>
      </p>

      {interview && <InterviewPin interview={interview} onMockPage />}
      <Headings title="Interview Feedback" isSubHeading />

      {feedbacks && (
        <Accordion type="single" collapsible className="space-y-6">
          {feedbacks.map((feed) => (
            <AccordionItem
              key={feed.id}
              value={feed.id}
              className="border rounded-lg shadow-md"
            >
              <AccordionTrigger
                onClick={() => setActiveFeed(feed.id)}
                className={cn(
                  "px-5 py-3 flex items-center justify-between text-base rounded-t-lg transition-colors hover:no-underline",
                  activeFeed === feed.id
                    ? "bg-gradient-to-r from-purple-50 to-blue-50"
                    : "hover:bg-gray-50"
                )}
              >
                <span>{feed.question}</span>
              </AccordionTrigger>

              <AccordionContent className="px-5 py-6 bg-white rounded-b-lg space-y-5 shadow-inner">
                <div className="text-lg font-semibold to-gray-700">
                  <Star className="inline mr-2 text-yellow-400" />
                  Rating: {feed.ratings}
                </div>

                <Card className="border-none space-y-3 p-4 bg-green-50 rounded-lg shadow-md">
                  <CardTitle className="flex items-center text-lg">
                    <CircleCheck className="mr-2 text-green-600" />
                    Expected Answer
                  </CardTitle>
                  <CardDescription className="font-medium text-gray-700">
                    {feed.correct_answer}{" "}
                  </CardDescription>
                </Card>

                <Card className="border-none space-y-3 p-4 bg-yellow-50 rounded-lg shadow-md">
                  <CardTitle className="flex items-center text-lg">
                    <CircleCheck className="mr-2 text-yellow-600" />
                    Your Answer
                  </CardTitle>
                  <CardDescription className="font-medium text-gray-700">
                    {feed.user_answer}{" "}
                  </CardDescription>
                </Card>

                <Card className="border-none space-y-3 p-4 bg-red-50 rounded-lg shadow-md">
                  <CardTitle className="flex items-center text-lg">
                    <CircleCheck className="mr-2 text-red-600" />
                    Feedback
                  </CardTitle>
                  <CardDescription className="font-medium text-gray-700">
                    {feed.feedback}{" "}
                  </CardDescription>
                </Card>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
};

export default Feedback;
