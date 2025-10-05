import { Button } from '@/components/ui/button';
import React from 'react'
import { Link } from "react-router";
const ErrorPage = () => {
    return (
        <>
            <div className="flex flex-col justify-center gap-5 items-center min-w-screen min-h-screen text-2xl">
                <h1>404 Not Found</h1>
                <p> Go back to
                    <Button className="ml-3">
                        <Link to="/">
                            Home
                        </Link>
                    </Button>
                </p>
            </div>
        </>
    )
}

export default ErrorPage