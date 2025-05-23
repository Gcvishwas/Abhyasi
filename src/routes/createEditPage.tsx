import { db } from "@/config/firebase.config"
import { Interview } from "@/types"
import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const CreateEditPage = () => {
    const { interviewId } = useParams<{ interviewId: string }>()
    const [interview, setInterview] = useState<Interview | null>(null)

    useEffect(() => {
        const fetchInterview = async () => {
            if (interviewId) {
                try {
                    const interviewDoc = await getDoc(doc(db, "interviews", interviewId));
                    if (interviewDoc.exists()) {
                        setInterview({ ...interviewDoc.data() } as Interview);
                    }
                } catch (error) {
                    console.error("Error fetching interview:", error)
                }
            }
        };
        fetchInterview();
    }, [interviewId]);

    return (
        <div>
            You are on edit page : {interviewId}
        </div>
    )
}

export default CreateEditPage