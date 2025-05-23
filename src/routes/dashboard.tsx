import { Button } from "@/components/ui/button"
import Headings from "@/components/ui/headings"
import { Separator } from "@radix-ui/react-separator"
import { Plus } from "lucide-react"
import { Link } from "react-router-dom"

const Dashboard = () => {
    return (
        <>
            <div className="flex items-center justify-center w-full">

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
            <p>


            </p>
        </>
    )
}

export default Dashboard
