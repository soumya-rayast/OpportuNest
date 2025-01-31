import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobTable from './AdminJobTable'
import useGetAllAdminJob from '../hooks/useGetAllAdminJob'
import { setSearchJobByText } from '@/redux/jobSlice'

const AdminJob = () => {
    useGetAllAdminJob()
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchJobByText(input));
    }, [input]);
    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto my-10'>
                <div className='flex items-center justify-between my-5 mt-20 mx-2'>
                    <Input
                        className="w-fit"
                        placeholder="Filter by name,role"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button onClick={() => navigate("/admin/job/create")} 
                        className='bg-purple-600'>Post New Job</Button>
                </div>
                <AdminJobTable />
            </div>
        </div>
    )
}

export default AdminJob
