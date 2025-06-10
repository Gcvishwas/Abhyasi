import { useAuth, UserButton } from '@clerk/clerk-react'
import { Loader } from 'lucide-react'

import { Link } from 'react-router-dom'
import { Button } from './ui/button'
const ProfileContainer = () => {
    const { isSignedIn, isLoaded } = useAuth()
    if (!isLoaded) {
        return (
            <div className='flex items-center'>
                <Loader className='min-w-4 min-h-4 animate-spin text-purple-500' />
                {/*size={20} color="#000" */}
            </div>
        )

    }
    return (
        // UserButton comes from @clerk/clerk-react
        // it is a component that shows the user profile picture and name   
        <div className='flex items-center gap-6'>
            {isSignedIn ? <UserButton afterSignOutUrl="/" /> : <Link to={"signin"}>
                <Button size={"sm"} className="hover:bg-blue-800">Get Started</Button>
            </Link>
            }
        </div>
    )
}

export default ProfileContainer
