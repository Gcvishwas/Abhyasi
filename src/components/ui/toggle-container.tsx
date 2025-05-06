import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useAuth } from "@clerk/clerk-react";
import { Menu } from "lucide-react"
import NavigationRoutes from "./navigation-routes";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const ToggleContainer = () => {
    const { userId } = useAuth();
    return (
        <Sheet>
            <SheetTrigger className="block md:hidden w-10 h-10 rounded-full  ring-offset-3 shadow-sm hover:bg-gray-100  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-offset-gray-800">
                <Menu className="w-10 h-8" />
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle />

                </SheetHeader>
                <nav className="flex flex-col mt-4 gap-6">

                    <NavigationRoutes isMobile />
                    {/* Checks if user is signed in and if so, show the Take Interview link */}
                    {userId &&
                        (
                            <NavLink
                                to={"/generate"}
                                className={({ isActive }) => cn(
                                    "text-lg text-neutral-600",
                                    isActive && "text-neutral-900 font-semibold"
                                )}
                            >
                                Take Interview
                            </NavLink>
                        )}
                </nav>
            </SheetContent>
        </Sheet>

    )
}

export default ToggleContainer
