import Footer from '@/components/Footer/Footer'
import NavBar from '@/components/Header/NavBar'
import React from 'react'
import { Outlet } from 'react-router'

const Root = () => {
    return (
        <>
            <NavBar />
            <Outlet />
            <Footer />
        </>
    )
}

export default Root