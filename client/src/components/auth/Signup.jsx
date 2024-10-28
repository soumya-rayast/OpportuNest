import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from "@/components/ui/radio-group"
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader } from 'lucide-react'

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth)
    const { loading } = useSelector(store => store.auth)
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: "",
    })
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file)
        }
        try {
            dispatch(setLoading(true))
            const res = await axios.post(`${USER_API_END_POINT}/signup`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                navigate('/login')
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        } finally {
            dispatch(setLoading(false))
        }
    }
    useEffect(()=>{
        if(user){
            navigate('/')
        }
    },[])
    return (
        <div>
            <Navbar />
            <div className=' flex items-center justify-center max-w-7xl mx-auto mt-14 '>
                <form onSubmit={submitHandler} className='w-1/2 border border-purple-400 shadow-2xl rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5 text-purple-600'>Sign Up</h1>
                    <div className='my-2'>
                        <Label className='text-purple-600 m-1'>Full name</Label>
                        <Input
                            type='text'
                            placeholder='Enter Your name'
                            value={input.fullname}
                            onChange={changeEventHandler}
                            name="fullname"
                        />
                    </div>
                    <div className='my-2'>
                        <Label className='text-purple-600 m-1'>Email</Label>
                        <Input
                            type='email'
                            placeholder='xyz@gmail.ccom'
                            value={input.email}
                            onChange={changeEventHandler}
                            name="email"
                        />
                    </div>
                    <div className='my-2'>
                        <Label className='text-purple-600 m-1'>Phone Number</Label>
                        <Input
                            type='number'
                            placeholder='+91 1234567890'
                            value={input.phoneNumber}
                            onChange={changeEventHandler}
                            name="phoneNumber"
                        />
                    </div>
                    <div className='my-2'>
                        <Label className='text-purple-600 m-1'>Password</Label>
                        <Input
                            type='password'
                            placeholder='********'
                            value={input.password}
                            onChange={changeEventHandler}
                            name="password"
                        />
                    </div>
                    <div className=' flex items-center justify-between'>
                        <RadioGroup className=' flex items-center gap-4 my-5 '>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type='radio'
                                    name='role'
                                    value='student'
                                    className='cursor-pointer'
                                    checked={input.role === "student"}
                                    onChange={changeEventHandler}
                                />
                                <Label className='text-purple-600 m-1' htmlFor="r2">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input
                                    type='radio'
                                    name='role'
                                    value='recruiter'
                                    className='cursor-pointer'
                                    checked={input.role === "recruiter"}
                                    onChange={changeEventHandler}
                                />
                                <Label className='text-purple-600 m-1' htmlFor="r3">Recruiter</Label>
                            </div>
                        </RadioGroup>
                        <div>
                            <Label className='text-purple-600 m-1' >Profile</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                className="cursor-pointer"
                                onChange={changeFileHandler}
                            />
                        </div>
                    </div>
                    {
                        loading ? <Button className='w-full my-4'> <Loader className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> :
                            <Button type='submit' className='w-full my-4 bg-purple-600' >Signup</Button>
                    }
                    <span>Already have an account ? <Link to='/login' className='text-purple-600'>Login</Link> </span>
                </form>
            </div>
        </div>
    )
}

export default Signup
