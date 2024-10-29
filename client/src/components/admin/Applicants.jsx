import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationsSlice';
import { toast } from 'sonner';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                setLoading(true); // Set loading state
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                if (res.data) {
                    dispatch(setAllApplicants(res.data.job));
                }
            } catch (error) {
                toast.error("Failed to fetch applicants. Please try again.");
                console.log(error);
            } finally {
                setLoading(false); // Reset loading state
            }
        };
        fetchAllApplicants();
    }, [params.id, dispatch]); // Added params.id to dependency array

    if (loading) {
        return <div className="text-center">Loading...</div>; // Loading indicator
    }

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-20'>
                <h1 className='text-xl my-5 font-bold mx-10'>Applicants: {applicants?.applications?.length || 0}</h1>
                <ApplicantsTable />
            </div>
        </div>
    );
};

export default Applicants;
