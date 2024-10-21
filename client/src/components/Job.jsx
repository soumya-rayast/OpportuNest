import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Badge } from './ui/badge'

const Job = () => {
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>2 days ago</p>
                <Button className="rounded-full" size='icon' variant="outline">
                    <Bookmark />
                </Button>
            </div>
            <div className='flex items-center gap-3 my-2'>
                <Button className='p-6' variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src="" alt='logo' />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>Company name</h1>
                    <p>India</p>
                </div>
            </div>
            <div className=''>
                <h1 className='font-bold text-lg my-2'>Title</h1>
                <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, officia!</p>
            </div>
            <div className='flex items-center gap-3 mt-4'>
                <Badge className='text-purple-600 font-bold' variant="ghost">12 Positions</Badge>
                <Badge className='text-purple-600 font-bold' variant="ghost">Part Time</Badge>
                <Badge className='text-purple-600 font-bold' variant="ghost">12 LPA</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button variant='outline'>Details</Button>
                <Button className="bg-purple-500">Save For Later</Button>
            </div>
        </div>
    )
}

export default Job