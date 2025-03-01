
import Header from '@/components/ui/header'
import Footer from '@/components/ui/footer'
import { Outlet } from 'react-router-dom'
const PublicLayout = () => {
    return (
        <div className='w-full'>
            {/* handler to store the user data */}
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default PublicLayout
