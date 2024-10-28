import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { motion } from 'framer-motion';
import Job from './Job';

const SaveForLater = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const response = await axios.get(`${JOB_API_END_POINT}/getSavedJobs`, { withCredentials: true });
        if (response.data.success) {
          setSavedJobs(response.data.jobs);
        } else {
          setError("Failed to fetch saved jobs.");
        }
      } catch (error) {
        console.error("Error fetching saved jobs:", error);
        setError("An error occurred while fetching saved jobs.");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedJobs();
  }, []);

  if (loading) {
    return <div>Loading saved jobs...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (savedJobs.length === 0) {
    return <div>No jobs saved for later.</div>;
  }

  return (
    <div>
      <Navbar />
      <div className='mt-20 max-w-7xl mx-auto'>
        <h1 className='text-xl font-bold mx-2'>Your Saved Jobs</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-5 mx-2">
          {savedJobs.map((job) => (
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
      </div>
    </div>
  );
}

export default SaveForLater;
