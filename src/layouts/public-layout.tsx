
import Header from '@/components/ui/header'
import Footer from '@/components/ui/footer'
import { Outlet } from 'react-router-dom'
import AuthHandler from '@/handlers/auth-handler'
const PublicLayout = () => {
    return (
        <div className='w-full'>
            {/* handler to store the user data */}
            <AuthHandler />
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default PublicLayout
