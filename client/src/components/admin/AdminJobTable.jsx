import { JOB_API_END_POINT } from '@/utils/constant';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import axios from 'axios';
import { Delete, Eye, MoreHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AdminJobTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const [deleteTrigger, setDeleteTrigger] = useState(false); // Trigger for re-filtering
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) {
        return true;
      }
      return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText, deleteTrigger]); // Add deleteTrigger to dependencies

  const deleteJob = async (jobId) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await axios.delete(`${JOB_API_END_POINT}/delete/${jobId}`, { withCredentials: true });
        setFilterJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
        setDeleteTrigger(prev => !prev); // Toggle deleteTrigger to re-trigger useEffect
        toast.success("Job deleted successfully"); // Optional: success message
      } catch (error) {
        console.error('Failed to delete job', error);
        toast.error("Error deleting Job. Please try again.");
      }
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent posted jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs.length > 0 ? (
            filterJobs.map((job, index) => (
              <TableRow key={job._id || index}>
                <TableCell>
                  <img src={job?.company?.logo || 'default-logo.png'} className="w-10 h-10 rounded-full" alt="Company Logo" />
                </TableCell>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>{job?.createdAt?.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-40 flex flex-col items-start justify-center p-4 shadow-2xl rounded-md bg-white">
                      <div
                        onClick={() => deleteJob(job._id)}
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Delete className="w-4" />
                        <span>Delete</span>
                      </div>
                      <div
                        onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Eye />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="5" className="text-center">
                No jobs found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobTable;
