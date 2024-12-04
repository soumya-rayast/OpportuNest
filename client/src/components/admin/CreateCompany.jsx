import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/CompanySlice';

const CreateCompany = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [companyName, setCompanyName] = useState('');
    const [loading, setLoading] = useState(false);

    const registerNewCompany = async () => {
        setLoading(true);
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to create company. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className='max-w-4xl mx-auto mt-20 p-6 bg-white rounded-lg shadow-md'>
                <div className='mb-6'>
                    <h1 className='font-bold text-2xl'>Create Your Company</h1>
                    <p className='text-gray-500'>Please enter the name of your company below.</p>
                </div>
                <div className='mb-4'>
                    <Label className="block mb-2">Company Name</Label>
                    <Input
                        type="text"
                        className="border border-gray-300 rounded-md shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 my-2"
                        placeholder="Google, Microsoft, etc."
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        required
                    />
                </div>
                <div className='flex items-center justify-between'>
                    <Button variant="outline" onClick={() => navigate('/admin/companies')} className="border-gray-300 text-gray-700 hover:bg-gray-100">
                        Cancel
                    </Button>
                    <Button 
                        onClick={registerNewCompany} 
                        className={`bg-purple-600 text-white ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} 
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Continue'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CreateCompany;
