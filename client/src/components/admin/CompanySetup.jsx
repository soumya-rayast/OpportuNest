import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ArrowLeft, Loader } from 'lucide-react';
import { Label } from '../ui/label';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetCompanyById from '../hooks/useGetCompanyById';

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null,
    });
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: null, // Reset file input
        });
    }, [singleCompany]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className='max-w-xl mx-auto my-10 border p-8 mt-20 rounded-md border-purple-600 bg-white shadow-lg'>
                <form onSubmit={submitHandler}>
                    <div className='flex items-center gap-5 mb-6'>
                        <Button onClick={() => navigate('/admin/companies')} variant='outline' className="flex items-center gap-2 font-semibold">
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-bold text-xl'>Company Setup</h1>
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div>
                            <Label>Company Name</Label>
                            <Input 
                                type="text" 
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler} 
                                required 
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input 
                                type="text" 
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler} 
                                required 
                            />
                        </div>
                        <div>
                            <Label>Website</Label>
                            <Input 
                                type="text" 
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler} 
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input 
                                type="text" 
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler} 
                            />
                        </div>
                        <div>
                            <Label>Logo</Label>
                            <Input 
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler} 
                            />
                        </div>
                    </div>
                    <div className='mt-6'>
                        {
                            loading ? (
                                <Button className='w-full my-4' disabled>
                                    <Loader className='mr-2 h-4 w-4 animate-spin' />
                                    Please wait...
                                </Button>
                            ) : (
                                <Button type='submit' className='w-full my-4 bg-purple-500 text-white hover:bg-purple-600'>
                                    Update
                                </Button>
                            )
                        }
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompanySetup;
