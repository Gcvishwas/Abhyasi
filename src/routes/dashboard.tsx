import { Button } from "@/components/ui/button"
import Headings from "@/components/headings"
import InterviewPin from "@/components/interviewpin"
import { Skeleton } from "@/components/ui/skeleton"
import { db } from "@/config/firebase.config"
import { Interview } from "@/types"
import { useAuth } from "@clerk/clerk-react"
import { Separator } from "@radix-ui/react-separator"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "sonner"

const Dashboard = () => {

    const [loading, setLoading] = useState(false);
    const { userId } = useAuth();
    const [interviews, setInterviews] = useState<Interview[]>([]);

    useEffect(() => {
        setLoading(true);
        const interviewQuery = query(
            collection(db, "interviews"),
            where("userId", "==", userId)
        )
        const unsubscribe = onSnapshot(interviewQuery, (snapshot) => {
            const interviewList: Interview[] = snapshot.docs.map((doc) => {
                const id = doc.id;
                return {
                    id,
                    ...doc.data(),
                };
            }) as Interview[];
            setInterviews(interviewList);
            setLoading(false);
        },
            (error) => {
                console.log("Error on fetching : ", error);
                toast.error("Error..", {
                    description: "Something went wrong.. Try again later..",
                });
                setLoading(false);
            }
        )

        return () => unsubscribe()
    }, [userId])

    return (
        <>
            <div className="flex items-center justify-start gap-12 w-full">

                {/* Headings */}
                <Headings
                    title="Dashboard"
                    description="Your personalized dashboard for interview preparation and career coaching."

                />
                <Link to={"/generate/create"}>
                    <Button className="ml-4">
                        <Plus /> Create New
                    </Button>
                </Link>
            </div>

            <Separator className="my-8" />
            {/* content */}
            <div className="grid md:grid md:grid-cols-3 gap-3 py-4">
                {loading ? (
                    Array.from({ length: 6 }).map((_, index) => (
                        <Skeleton key={index} className="h-24 md:h-32 rounded-md" />
                    ))
                ) : interviews.length > 0 ? (
                    interviews.map((interview) => (
                        <InterviewPin key={interview.id} interview={interview} />
                    ))
                ) : (
                    <div className="md:col-span-3 w-full flex flex-grow items-center justify-center h-96 flex-col">
                        <img
                            src="/assets/svg/not-found.svg"
                            className="w-44 h-44 object-contain"
                            alt=""
                        />

                        <h2 className="text-lg font-semibold text-muted-foreground">
                            No Data Found
                        </h2>

                        <p className="w-full md:w-96 text-center text-sm text-neutral-400 mt-4">
                            There is no available data to show. Please add some new mock
                            interviews
                        </p>

                        <Link to={"/generate/create"} className="mt-4">
                            <Button size={"sm"}>
                                <Plus className="min-w-5 min-h-5 mr-1" />
                                Add New
                            </Button>
                        </Link>
                    </div>
                )}
            </div>

            <p>


            </p>
        </>
    )
}

export default Dashboard
