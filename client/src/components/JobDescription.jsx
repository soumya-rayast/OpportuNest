import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import { setSingleJob } from '@/redux/jobSlice';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const [isApplied, setIsApplied] = useState(false);
    const { id: jobId } = useParams();
    const dispatch = useDispatch();

    const applyJobHandle = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                setIsApplied(true);
                const updatedJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
                dispatch(setSingleJob(updatedJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error('Apply Job Error:', error);
            toast.error(error.response?.data?.message || 'Failed to apply for the job');
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
                } else {
                    console.error('Unexpected response:', res);
                    toast.error('Failed to load job details');
                }
            } catch (error) {
                console.error('Fetch Job Error:', error);
                toast.error(error.response?.data?.message || 'Failed to load job details');
            }
        };
        if (jobId) {
            fetchSingleJob();
        } else {
            toast.error('Invalid job ID');
        }
    }, [jobId, dispatch, user?._id]);

    const formatPostedDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                        <div className='flex items-center gap-3 mt-4'>
                            <Badge className='text-purple-600 font-bold' variant="ghost">{singleJob?.position} Positions</Badge>
                            <Badge className='text-purple-600 font-bold' variant="ghost">{singleJob?.jobType}</Badge>
                            <Badge className='text-purple-600 font-bold' variant="ghost">{singleJob?.salary} LPA</Badge>
                        </div>
                    </div>
                    <Button
                        onClick={!isApplied ? applyJobHandle : undefined}
                        disabled={isApplied}
                        className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-purple-500 hover:bg-purple-400'}`}
                    >
                        {isApplied ? "Already Applied" : "Apply Now"}
                    </Button>
                </div>
                <div>
                    <h1 className='border-b-2 border-b-gray-300 font-medium py-5'>Job Description</h1>
                </div>
                <div className='m-4'>
                    <h1 className='font-bold my-1'>Role: <span className='pl-4 font-normal text-gray-800'>{singleJob?.title}</span></h1>
                    <h1 className='font-bold my-1'>Location: <span className='pl-4 font-normal text-gray-800'>{singleJob?.location || 'Location not specified'}</span></h1>
                    <h1 className='font-bold my-1'>Description: <span className='pl-4 font-normal text-gray-800'>{singleJob?.description || 'No description available'}</span></h1>
                    <h1 className='font-bold my-1'>Experience: <span className='pl-4 font-normal text-gray-800'>{singleJob?.experience} yrs</span></h1>
                    <h1 className='font-bold my-1'>Salary: <span className='pl-4 font-normal text-gray-800'>{singleJob?.salary} LPA</span></h1>
                    <h1 className='font-bold my-1'>Total Applicants: <span className='pl-4 font-normal text-gray-800'>{singleJob?.applications?.length || 0}</span></h1>
                    <h1 className='font-bold my-1'>Posted Date: <span className='pl-4 font-normal text-gray-800'>{singleJob?.createdAt ? formatPostedDate(singleJob.createdAt) : 'N/A'}</span></h1>
                </div>
            </div>
        </div>
    );
};

export default JobDescription;
