import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '@/redux/jobSlice';
import { motion } from 'framer-motion';

import Navbar from '../shared/Navbar';
import Job from '../Job';
import userGetAllJobs from '../hooks/userGetAllJobs';
import Footer from '../shared/Footer';


const Browse = () => {
    userGetAllJobs();
    const { allJobs, loading } = useSelector(store => store.job); // Assuming loading is in job slice
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchQuery(""));
        };
    }, [dispatch]);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <div className='max-w-7xl mx-auto my-10 flex-1 p-5'>
                <h1 className='font-bold text-2xl my-5 mx-2 text-gray-800'>Search Results ({allJobs.length})</h1>
                {loading ? (
                    <div className='flex justify-center items-center h-full'>
                        
                    </div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                        {
                            allJobs.map((job) => (
                                <motion.div key={job._id}
                                    initial={{ opacity: 0, x: 100 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 100 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className=' duration-300 p-5'>
                                        <Job job={job} />
                                    </div>
                                </motion.div>
                            ))
                        }
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default Browse;
