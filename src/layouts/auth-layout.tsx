
import { Outlet } from 'react-router-dom'

const AuthenticationLayout = () => {
    return (
        <div className='w-screen h-screen overflow-hidden flex items-center justify-center'>
            <img src="/assets/img/bg.png"
                className='absolute w-full h-full object-cover opacity-30' alt="background image" />
            <Outlet />
        </div>
    )
}

export default AuthenticationLayout
