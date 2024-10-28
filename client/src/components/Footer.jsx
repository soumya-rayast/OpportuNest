import { FacebookIcon, Instagram, Linkedin, Twitter } from 'lucide-react'
import React from 'react'

const Footer = () => {
    return (

        <footer className='border-t border-t-gray-200 py-8'>
            <div className=' container mx-auto px-4'>
                <div className='flex flex-col md:flex-row justify-between items-center'>
                    <div className='mb-4 md:mb-0 flex items-center gap-3 flex-col'>
                        <h2 className='text-xl font-bold'>
                            Opportu<span className='text-purple-600'>Nest</span>
                        </h2>
                        <p> 2024: All rights reserved</p>
                    </div>
                    <div className='flex space-x-4 mt-4 md:mt-0'>
                        <a href="/" className='flex flex-col items-center text-purple-600'>
                            <FacebookIcon />
                            Facebook</a>
                        <a href="/" className='flex flex-col items-center text-purple-600'>
                            <Instagram />
                            Instagram</a>
                        <a href="/" className='flex flex-col items-center text-purple-600'>
                            <Twitter />
                            Twitter</a>
                        <a href="/" className='flex flex-col items-center text-purple-600'>
                            <Linkedin />
                            Linkedin</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer
