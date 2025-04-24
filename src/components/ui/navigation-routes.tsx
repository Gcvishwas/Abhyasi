import { MainRoutes } from "@/lib/helpers"
import { cn } from "@/lib/utils"
import { NavLink } from "react-router-dom"

interface NavigationRoutesProps {
    isMobile?: boolean
}// interfaces ensure type safety

// in JSX we can simply write the below codes but user will not know if props are passed incorrectly i.e. someone can do isMobile="yes"

const NavigationRoutes = ({ isMobile = false }: NavigationRoutesProps) => {
    return (

        <ul className={cn("flex items-center gap-6", isMobile && "items-start flex-col gap-8")}>
            {/* takes element from helper.ts to map in header */}
            {MainRoutes.map(route => (
                // Navlink is similar to anchor tag in html but it is used for react router dom
                // Remember it as <a href="route.href">route.label</a> in html
                // isActive is a boolean value and it is used to check if the route is active or not
                <NavLink
                    key={route.href}
                    to={route.href}
                    className={({ isActive }) => cn(
                        "text-lg text-neutral-600",
                        isActive && "text-neutral-900 font-semibold"
                    )}
                >
                    {route.label}
                </NavLink>
            ))}


        </ul>


    )
}

export default NavigationRoutes
