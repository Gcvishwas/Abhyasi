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
        const storeUserData = async () => {
            if (isSignedIn && user) {
                setLoading(true);
                // console.log("Attempting to store user data:", user.id);  Log the user ID or other relevant info

                try {
                    // Get document from Firestore where user data is stored
                    const userSnap = await getDoc(doc(db, "users", user.id));

                    // Log the result of the getDoc call
                    // console.log("Firestore snapshot:", userSnap.exists());

                    // If user data doesn't exist in Firestore, create new document
                    if (!userSnap.exists()) {
                        const userData: User = {
                            id: user.id,
                            name: user.fullName || user.firstName || "Anonymous",
                            email: user.primaryEmailAddress?.emailAddress || "No email",
                            imageURL: user.imageUrl || "",
                            createdAt: serverTimestamp(),
                            updatedAt: serverTimestamp(),
                        };
                        // console.log("Creating new user data in Firestore:", userData);  Log user data

                        await setDoc(doc(db, "users", user.id), userData);
                        // console.log("User data successfully stored in Firestore.");
                    }
                } catch (error) {
                    console.error("Error storing user data in Firestore:", error); // Log actual error
                } finally {
                    setLoading(false);
                }
            }
        };

        storeUserData();
    }, [isSignedIn, user, pathname, navigate]);

    if (loading)
        return <LoaderPage />

    //returns null cuz does not render anything to UI
    return null

};

export default AuthHandler;