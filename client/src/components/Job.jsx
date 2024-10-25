import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
    const navigate = useNavigate();
    if (!job) {
        return <div>Loading...</div>; 
    }
    const daysAgo = (mongodbTime) => { 
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000*24*60*60))
    }
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>
                {daysAgo(job?.createdAt) === 0 ? 'Today' : `${daysAgo(job.createdAt)} days ago`}
                </p>
                <Button className="rounded-full" size='icon' variant="outline">
                    <Bookmark />
                </Button>
            </div>
            <div className='flex items-center gap-3 my-2'>
                <Button className='p-6' variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.logo} alt='logo' />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p>India</p>
                </div>
            </div>
            <div className=''>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
            </div>
            <div className='flex items-center gap-3 mt-4'>
                <Badge className='text-purple-600 font-bold' variant="ghost">{job?.position} Positions</Badge>
                <Badge className='text-purple-600 font-bold' variant="ghost">{job?.jobType} Time</Badge>
                <Badge className='text-purple-600 font-bold' variant="ghost">{job?.salary} LPA</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant='outline'>Details</Button>
                <Button className="bg-purple-500">Save For Later</Button>
            </div>
        </div>
    )
}

export default Job