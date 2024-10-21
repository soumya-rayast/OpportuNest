import React from 'react';
import LatestJobCards from './LatestJobCards';

const randomJob = [1, 2, 3, 4, 5, 6, 7];

const LatestJobs = () => {
    return (
        <div className='max-w-7xl mx-auto my-20'>
            <h1 className='text-4xl font-bold'>
                <span className='text-purple-600'>Latest & Top</span> Job Openings
            </h1>
            {/* Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5'>
                {randomJob.slice(0, 6).map((job) => (
                    <LatestJobCards key={job} job={job}/>
                ))}
            </div>
        </div>
    );
};

export default LatestJobs;