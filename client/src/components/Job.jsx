import React, { useState } from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';

const Job = ({ job }) => {
    const navigate = useNavigate();
    const [isSaved, setIsSaved] = useState(false);

    const daysAgo = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    };

    const saveForLaterHandler = async () => {
        try {
            const res = await axios.post(`${JOB_API_END_POINT}/saveForLater/${job._id}`, {}, { withCredentials: true });
            if (res.data.success) {
                toast.success("Job saved for later!");
                setIsSaved(true);
            } else {
                throw new Error("Failed to save job");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to save the job');
        }
    };

    if (!job) {
        return <div className="flex justify-center items-center h-full">Loading...</div>;
    }

    return (
        <div className='p-4 rounded-lg shadow-lg bg-white border border-gray-200 transition-transform duration-300 hover:scale-105'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>{daysAgo(job.createdAt) === 0 ? "Today" : `${daysAgo(job.createdAt)} days ago`}</p>
                <Button className="rounded-full" size='icon' variant="outline" onClick={saveForLaterHandler} aria-label={isSaved ? "Unsave job" : "Save job"}>
                    <Bookmark className={isSaved ? "text-purple-500" : "text-gray-500"} />
                </Button>
            </div>
            <div className='flex items-center gap-3 my-3'>
                <Avatar>
                    <AvatarImage src={job.company?.logo || '/default-logo.png'} alt={`${job.company?.name} logo`} className='w-[40px] h-[40px]' />
                </Avatar>
                <div>
                    <h1 className='font-medium text-lg truncate'>{job.company?.name || 'Company Name'}</h1>
                    <p className='truncate text-gray-600'>{job.location || 'Location not specified'}</p>
                </div>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2 truncate'>{job.title || 'Job Title'}</h1>
                <p className='text-sm text-gray-600 overflow-hidden text-ellipsis'>{job.description || 'No description available'}</p>
            </div>
            <div className='flex items-center gap-3 mt-4'>
                <Badge className='text-purple-600 font-bold' variant="ghost">{job.position || 'N/A'} Positions</Badge>
                <Badge className='text-purple-600 font-bold' variant="ghost">{job.jobType || 'Full'} Time</Badge>
                <Badge className='text-purple-600 font-bold' variant="ghost">{job.salary ? `${job.salary} LPA` : 'Salary not specified'}</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={() => navigate(`/description/${job._id}`)} variant='outline'>Details</Button>
                <Button className="bg-purple-500 text-white hover:bg-purple-600" onClick={saveForLaterHandler}>Save For Later</Button>
            </div>
        </div>
    );
};

export default Job;
