import { Badge } from './ui/badge'
import React from 'react'

const LatestJobCards = () => {
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
            <div>
                <h1 className='font-medium text-lg'>Company Name</h1>
                <p className='text-sm text-gray-500'>India</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>Job Title</h1>
                <p className='text-sm text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi facilis fugit repellat?</p>
            </div>
            <div className='flex items-center gap-3 mt-4'>
                <Badge className='text-purple-600 font-bold' variant="ghost">12 Positions</Badge>
                <Badge className='text-purple-600 font-bold' variant="ghost">Part Time</Badge>
                <Badge className='text-purple-600 font-bold' variant="ghost">12 LPA</Badge>
            </div>
        </div>
    )
}

export default LatestJobCards
