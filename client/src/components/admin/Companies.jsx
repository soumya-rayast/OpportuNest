import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompany from '../hooks/useGetAllCompany';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '@/redux/CompanySlice.js';
import { Plus } from 'lucide-react';

const Companies = () => {
    useGetAllCompany();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className='max-w-6xl mx-auto my-10 mt-20'>
                <div className='flex items-center justify-between my-5 mx-4'>
                    <Input
                        className="border border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring-purple-500 py-2 px-4 w-1/2 md:w-1/3"
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button 
                        onClick={() => navigate("/admin/companies/create")}
                        className="flex items-center space-x-2 bg-purple-600 text-white rounded-md shadow-md hover:bg-purple-500 transition duration-200 py-2 px-4"
                    >
                        <Plus className="h-5 w-5" />
                        <span>Create Company</span>
                    </Button>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <CompaniesTable />
                </div>
            </div>
        </div>
    );
}

export default Companies;
