import Footer from '@/components/Footer/Footer'
import NavBar from '@/components/Header/NavBar'
import React from 'react'
import { Outlet } from 'react-router'

const Root = () => {
    return (
        <>
            <NavBar />
            <div className="min-h-[calc(100vh-150px)]">
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

export default Root