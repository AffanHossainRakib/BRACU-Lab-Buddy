import React from 'react'
import { Button } from '../ui/button'
import { Github } from 'lucide-react'
import { Link } from 'react-router'

const Footer = () => {
    return (
        <div className='flex justify-center items-center border-t p-5'>
            <Link to="https://github.com/AffanHossainRakib/" target='_blank'>
                <Button className=" bg-[#cde3fd90] text-[#005ac4] hover:bg-[#cde3fd] dark:bg-[#00173190] dark:text-[#67aaf8] dark:hover:bg-[#001731]">
                    <Github /> Md. Affan Hossain Rakib
                </Button>
            </Link>
        </div>
    )
}

export default Footer