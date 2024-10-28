import React, { useMemo, useState } from 'react';
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
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }
    const saveForLaterHandler = async () => {
        try {
            const res = await axios.post(`${JOB_API_END_POINT}/saveForLater/${job._id}`, {}, { withCredentials: true });
            if (res.data.success) {
                toast.success("Job saved for later!");
            } else {
                throw new Error("Failed to save job");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to save the job');
        }
    }
    if (!job) {
        return <div>Loading...</div>;
    }

    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 shadow-purple-300'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500'>
                    <p className='text-sm text-gray-500'>{daysAgo(job?.createdAt) === 0 ? "Today" : `${daysAgo(job?.createdAt)} days ago`}</p>
                </p>
                <Button className="rounded-full" size='icon' variant="outline" onClick={saveForLaterHandler} >
                    <Bookmark className={isSaved ? "text-purple-500":""} />
                </Button>
            </div>
            <div className='flex items-center gap-3 my-2'>
                <Button className='p-6' variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo || '/default-logo.png'} alt='logo' />
                    </Avatar>
                </Button>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name || 'Company Name'}</h1>
                    <p>{job?.location || 'Location not specified'}</p>
                </div>
            </div>
            <div className=''>
                <h1 className='font-bold text-lg my-2'>{job?.title || 'Job Title'}</h1>
                <p className='text-sm text-gray-600'>{job?.description || 'No description available'}</p>
            </div>
            <div className='flex items-center gap-3 mt-4'>
                <Badge className='text-purple-600 font-bold' variant="ghost">{job?.position || 'N/A'} Positions</Badge>
                <Badge className='text-purple-600 font-bold' variant="ghost">{job?.jobType || 'Full'} Time</Badge>
                <Badge className='text-purple-600 font-bold' variant="ghost">{job?.salary ? `${job.salary} LPA` : 'Salary not specified'}</Badge>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <Button onClick={() => navigate(`/description/${job?._id}`)} variant='outline'>Details</Button>
                <Button className="bg-purple-500" onClick={saveForLaterHandler} >Save For Later</Button>
            </div>
        </div>
    );
};

export default Job;
