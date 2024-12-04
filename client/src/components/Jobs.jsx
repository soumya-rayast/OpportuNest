import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Filter } from 'lucide-react';
import Pagination from './shared/Pagination';


const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [jobsPerPage] = useState(12); 

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

    // Calculate the jobs to display on the current page
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = filterJobs.slice(indexOfFirstJob, indexOfLastJob);
    const totalPages = Math.ceil(filterJobs.length / jobsPerPage);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-20'>
                <div className='flex gap-5'>
                    {/* Filter Sidebar */}
                    <div className='w-[18%] hidden sm:block'>
                        <FilterCard />
                    </div>
                    <div className='flex-1'>
                        {/* Show Filter Icon Only on Small Screens */}
                        <div className="block sm:hidden mb-4">
                            <button 
                                className="text-xl flex items-center gap-2"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <Filter /> Filter Jobs
                            </button>
                        </div>
                        {/* FilterCard for mobile */}
                        {showFilters && (
                            <div className='mb-4'>
                                <FilterCard />
                            </div>
                        )}
                        {/* Job Cards Grid */}
                        <div className='h-[88vh] ml-28 overflow-y-auto pb-5'>
                            {currentJobs.length === 0 ? (
                                <span className='text-red-500'>Job Not Found</span>
                            ) : (
                                <div className='flex flex-wrap gap-2 mt-5'>
                                    {currentJobs.map((job) => (
                                        <motion.div key={job._id}
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
                        {/* Pagination Controls */}
                        <Pagination 
                            currentPage={currentPage} 
                            totalPages={totalPages} 
                            onPageChange={setCurrentPage} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobs;
