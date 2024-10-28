import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import userGetAllJobs from './hooks/userGetAllJobs';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '@/redux/jobSlice';
import { motion } from 'framer-motion';
import Footer from './Footer';

const Browse = () => {
    userGetAllJobs();
    const { allJobs } = useSelector(store => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchQuery(""));
        };
    }, [dispatch]);

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className='max-w-7xl mx-auto my-10 flex-1'>
                <h1 className='font-bold text-xl my-10 mx-2'>Search Results ({allJobs.length})</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5 mx-2'>
                    {
                        allJobs.map((job) => (
                            <motion.div key={job._id}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 100 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Job job={job} />
                            </motion.div>
                        ))
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Browse;
