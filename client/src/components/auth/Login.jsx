import React, { useState } from 'react'
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
import { setLoading ,setUser} from '@/redux/authSlice'
import { Loader } from 'lucide-react'

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector(store => store.auth)
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  })
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        navigate('/')
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error); ``
      toast.error(error.response.data.message)
    } finally {
      dispatch(setLoading(false))
    }
  }
  return (
    <div>
      <Navbar />
      <div className=' flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
          <h1 className='font-bold text-xl mb-5'>Login</h1>
          <div className='my-2'>
            <Label>Email</Label>
            <Input
              type='email'
              placeholder='xyz@gmail.ccom'
              value={input.email}
              onChange={changeEventHandler}
              name="email"
            />
          </div>
          <div className='my-2'>
            <Label>Password</Label>
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
                <Label htmlFor="r2">Student</Label>
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
                <Label htmlFor="r3">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {
            loading ? <Button className='w-full my-4'> <Loader className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> :
              <Button type='submit' className='w-full my-4'>Login</Button>
          }
          <span>Don't have an account ? <Link to='/signup' className='text-purple-600'>Signup</Link> </span>
        </form>
      </div>
    </div>
  )
}

export default Login
