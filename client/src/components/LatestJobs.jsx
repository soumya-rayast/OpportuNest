import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);
    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl font-bold'>
                <span className='text-purple-600'>Latest & Top</span> Job Openings
            </h1>
            {/* Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5'>
                {
                    allJobs.length <= 0 ? (
                        allJobs.slice(0, 6).map((item) => (
                            <LatestJobCards key={item._id} job={item} />
                        ))
                    ) : (
                        <p className='text-center text-gray-500'>No job openings available at the moment.</p>
                    )
                }
            </div>
        </div>
    );
};

export default LatestJobs;