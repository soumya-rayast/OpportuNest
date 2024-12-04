import { FacebookIcon, Instagram, Linkedin, Twitter } from 'lucide-react';
import React from 'react';

const Footer = () => {
    return (
        <footer className='bg-gray-100 border-t border-gray-300 py-8'>
            <div className='container mx-auto px-4'>
                <div className='flex flex-col md:flex-row justify-between items-center'>
                    <div className='mb-4 md:mb-0 flex items-center gap-3 flex-col md:flex-row'>
                        <h2 className='text-2xl font-bold text-purple-600'>
                            Opportu<span className='text-purple-700'>Nest</span>
                        </h2>
                        <p className='text-gray-600'>2024: All rights reserved</p>
                    </div>
                    <div className='flex space-x-6 mt-4 md:mt-0'>
                        <a href="/" className='flex flex-col items-center text-purple-600 hover:text-purple-800 transition-colors duration-300'>
                            <FacebookIcon className="h-6 w-6" />
                            <span className="text-sm">Facebook</span>
                        </a>
                        <a href="/" className='flex flex-col items-center text-purple-600 hover:text-purple-800 transition-colors duration-300'>
                            <Instagram className="h-6 w-6" />
                            <span className="text-sm">Instagram</span>
                        </a>
                        <a href="/" className='flex flex-col items-center text-purple-600 hover:text-purple-800 transition-colors duration-300'>
                            <Twitter className="h-6 w-6" />
                            <span className="text-sm">Twitter</span>
                        </a>
                        <a href="/" className='flex flex-col items-center text-purple-600 hover:text-purple-800 transition-colors duration-300'>
                            <Linkedin className="h-6 w-6" />
                            <span className="text-sm">Linkedin</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
