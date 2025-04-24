import { cn } from '@/lib/utils';
import { useAuth } from '@clerk/clerk-react'
import Container from '@/components/ui/container'
import LogoContainer from './logo-container';
import NavigationRoutes from './navigation-routes';
import { NavLink } from 'react-router-dom';
import ProfileContainer from './profile-container';
import ToggleContainer from './toggle-container';


const Header = () => {

    const { userId } = useAuth();
    return (
        <header className={cn("w-full border-b duration-150 transition-all ease-in-out")}>

            <Container>

                <div className='flex items-center gap-4 w-full'>

                    {/* logo section */}

                    <LogoContainer />

                    {/* navigation section */}

                    <nav className={cn("hidden md:flex items-center gap-3")}>

                        <NavigationRoutes />
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


                    <div className='ml-auto flex items-center gap-6'>
                    </div>
                    {/* Displays the profile container and mobile toggler where mobile toggler is a hamburger menu and profile container is a user button */}

                    {/* profile section */}
                    <ProfileContainer />

                    {/* Mobile Toggler */}
                    <ToggleContainer />
                </div>
            </Container>

        </header>
    )
}

export default Header
