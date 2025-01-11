import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';
import { useSelector } from 'react-redux';
import { Button } from './ui/button';

const AppliedJobTable = () => {
    const { allAppliedJobs, loading } = useSelector(store => store.job); 

    if (loading) {
        return <div className="text-center">Loading applied jobs...</div>; 
    }

    return (
        <div className='mx-4'>
            <Table>
                <TableCaption>A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        !allAppliedJobs || allAppliedJobs.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">
                                    <span>You haven't applied for any job yet.</span>
                                    <div className="mt-2">
                                        <Button onClick={() => {/* Navigate to jobs page or show available jobs */}}>
                                            View Available Jobs
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            allAppliedJobs.map((appliedJob) => (
                                <TableRow key={appliedJob._id} className="hover:bg-gray-100 transition">
                                    <TableCell>{new Date(appliedJob?.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>{appliedJob.job?.title}</TableCell>
                                    <TableCell>{appliedJob.job?.company?.name}</TableCell>
                                    <TableCell className='text-right'>
                                        <Badge className={`${appliedJob?.status === "rejected" ? "bg-red-500" : appliedJob.status === "pending" ? 'bg-gray-400' : 'bg-green-400'}`}>
                                            {appliedJob.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        )
                    }
                </TableBody>
            </Table>
        </div>
    );
};

export default AppliedJobTable;
