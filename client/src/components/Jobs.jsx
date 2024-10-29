import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.salary.toString().toLowerCase().includes(searchedQuery.toLowerCase());
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-20'>
                <div className='flex gap-5'>
                    {/* Filter Sidebar */}
                    <div className='w-[18%]'>
                        {/* Show Filter Icon Only on Small Screens */}
                        <div className="block sm:hidden mb-4">
                            <button 
                                className="text-xl flex items-center gap-2"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <Filter /> Filter Jobs
                            </button>
                        </div>
                        {/* FilterCard always shown on desktop and conditionally on mobile */}
                        <div className={`${showFilters || window.innerWidth >= 640 ? 'block' : 'hidden'} mb-4`}>
                            <FilterCard />
                        </div>
                    </div>
                    {/* Job Cards Grid */}
                    <div className='flex-1  h-[88vh] overflow-y-auto pb-5 mx-5'>
                        {allJobs.length <= 0 ? (
                            <span>Job Not Found</span>
                        ) : (
                            <div className='flex flex-wrap gap-2 mt-5 '>
                                {filterJobs.map((job) => (
                                    <motion.div key={job?._id}
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 100 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Job job={job} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobs;
