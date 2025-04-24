// import React from 'react'
import { Link } from 'react-router-dom'

const LogoContainer = () => {
    return (
        <Link to="/">
            <img src="/assets/svg/result.png" alt='' className='min-w-10 h-8 object-contain' />
        </Link>
    )
}

export default LogoContainer
