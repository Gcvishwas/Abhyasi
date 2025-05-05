import { db } from "@/config/firebase.config";
import LoaderPage from "@/routes/loader-page";
import { User } from "@/types";
import { useAuth, useUser } from "@clerk/clerk-react";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// AuthHandler component => responsible for handling authentication and storing user data in local storagex
const AuthHandler = () => {

    //hook to get authentication status and user data
    const { isSignedIn } = useAuth();

    //hook to set user data in context
    const { user } = useUser();


    // Get current pathname
    const pathname = useLocation().pathname;

    //Hook to navigate programmatically
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        //storeUserData function => responsible for storing user data in local storage
        const storeUserData = async () => {
            if (isSignedIn && user) {
                setLoading(true);
                try {
                    //getDoc => get document from firestore where document stores user data
                    //db => firestore database instance
                    const userSnap = await getDoc(doc(db, "users", user.id));
                    //if user data does not exist in firestore, create a new document with user data
                    if (!userSnap.exists()) {
                        const userData: User =
                        {
                            id: user.id,
                            name: user.fullName || user.firstName || "Anonymous",
                            email: user.primaryEmailAddress?.emailAddress || "No email",
                            imageURL: user.imageUrl || "",
                            createdAt: serverTimestamp(),
                            updatedAt: serverTimestamp(),
                        };
                        //setDoc => set document in firestore with user data
                        await setDoc(doc(db, "users", user.id), userData);
                    }
                }
                catch (error) {
                    console.error("Error storing user data in local storage:", error);
                }
                finally {
                    setLoading(false);
                }
            }
        }
        //storeUserData function is called to store user data in local storage
        storeUserData();
    }, [isSignedIn, user, pathname, navigate])
    if (loading)
        return <LoaderPage />

    //returns null cuz does not render anything to UI
    return null

};

export default AuthHandler;