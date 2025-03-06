import LoaderPage from "@/routes/loader-page"
import { useAuth } from "@clerk/clerk-react" // custom hook provided by clerk with isLoaded and isSigned Values
import { Navigate } from "react-router-dom"


const ProtectRoutes = ({ children }: { children: React.ReactNode }) => {
    // isLoaded : if authentication has finished loading i.e. User authenticated?
    // isSigned : if User is signed in
    const { isLoaded, isSignedIn } = useAuth()

    if (!isLoaded) {
        return <LoaderPage />
    }

    if (!isSignedIn) {
        return <Navigate to={"/signin"} replace />
    }
    return (
        <div>
            {children}
        </div>
    )
}

export default ProtectRoutes
