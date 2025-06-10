
import FormMockInterview from "@/components/form-mock-interview"
import { db } from "@/config/firebase.config" //imports firebase database configuration
import { Interview } from "@/types" //Imports interview schema type
import { doc, getDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const CreateEditPage = () => {
    const { interviewId } = useParams<{ interviewId: string }>()// Extracts interviewId from the URL parameters
    // console.log(interviewId)
    const [interview, setInterview] = useState<Interview | null>(null)

    useEffect(() => {
        const fetchInterview = async () => {
            if (interviewId) {
                try {
                    const interviewDoc = await getDoc(doc(db, "interviews", interviewId));
                    if (interviewDoc.exists()) {
                        setInterview({ id: interviewDoc.id, ...interviewDoc.data() } as Interview);
                    }
                } catch (error) {
                    console.error("Error fetching interview:", error)
                }
            }
        };
        fetchInterview();
    }, [interviewId]);

    return (
        <div className="my-4 flex-col w-full">
            {/* initialData={interview} is used to pass the interview data to the FormMockInterview component */}
            <FormMockInterview initialData={interview} />
        </div>
    )
}

export default CreateEditPage