import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import { setSingleJob } from '@/redux/jobSlice';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { ArrowLeftSquare, BackpackIcon } from 'lucide-react';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const [isApplied, setIsApplied] = useState(false);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                setIsApplied(true);
                const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
                dispatch(setSingleJob(updatedSingleJob));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto my-10  mt-36 p-6 bg-white shadow-md rounded-lg">
                <div className="flex items-center justify-between mx-10 mb-6">
                    <div>
                        <h1 className="font-bold text-2xl text-gray-800">{singleJob?.title}</h1>
                        <div className="flex items-center gap-2 mt-2">
                            <Badge className="text-purple-600 border-purple-500 font-bold" variant="ghost">{singleJob?.position} Positions</Badge>
                            <Badge className="text-purple-600 border-purple-500 font-bold" variant="ghost">{singleJob?.jobType}</Badge>
                            <Badge className="text-purple-600 border-purple-500 font-bold" variant="ghost">{singleJob?.salary} LPA</Badge>
                        </div>
                    </div>
                    <Button
                        onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied}
                        className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}`}>
                        {isApplied ? 'Already Applied' : 'Apply Now'}
                    </Button>
                </div>
                <h1 className="border-b-2 border-purple-600 font-medium py-4 mx-5 text-lg">Job Description</h1>
                <div className="my-4 mx-5">
                    {[
                        { label: 'Role', value: singleJob?.title },
                        { label: 'Location', value: singleJob?.location },
                        { label: 'Description', value: singleJob?.description },
                        { label: 'Experience', value: `${singleJob?.experience} yrs` },
                        { label: 'Salary', value: `${singleJob?.salary} LPA` },
                        { label: 'Total Applicants', value: singleJob?.applications?.length },
                        { label: 'Posted Date', value: singleJob?.createdAt.split("T")[0] },
                    ].map((item, index) => (
                        <h1 key={index} className="font-semibold my-2">
                            {item.label}: <span className="pl-4 font-normal text-gray-700">{item.value}</span>
                        </h1>
                    ))}
                </div>
                <Button className="hover:bg-purple-600 mx-5 flex items-center" onClick={() => navigate('/jobs')}>
                    <ArrowLeftSquare className="mr-2" />
                    Back
                </Button>
            </div>
        </div>
    );
};

export default JobDescription;
