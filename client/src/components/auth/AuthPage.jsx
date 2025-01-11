import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader, Eye, EyeOff } from 'lucide-react';

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: 'student',
    file: '',
  });
  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((store) => store.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    if (!input.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error('Invalid email format.');
      return false;
    }
    if (isSignup) {
      if (!input.fullname || !input.phoneNumber || input.phoneNumber.length < 10) {
        toast.error('Please fill in all required fields.');
        return false;
      }
    }
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      dispatch(setLoading(true));
      if (isSignup) {
        const formData = new FormData();
        formData.append('fullname', input.fullname);
        formData.append('email', input.email);
        formData.append('phoneNumber', input.phoneNumber);
        formData.append('password', input.password);
        formData.append('role', input.role);
        if (input.file) {
          formData.append('file', input.file);
        }
        const res = await axios.post(`${USER_API_END_POINT}/signup`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setUser(res.data.user));
          toast.success(res.data.message);
        }
      } else {
        const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setUser(res.data.user));
          toast.success(res.data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center md:max-w-4xl mx-auto mt-14 p-5">
        <form onSubmit={submitHandler} className="w-full bg-white shadow-xl border rounded-lg p-6">
          <h1 className="text-2xl font-bold text-center text-purple-600 mb-5">
            {isSignup ? 'Create Your Account' : 'Welcome Back'}
          </h1>

          {isSignup && (
            <div className="my-4">
              <Label className="text-purple-600 mb-1">Full Name</Label>
              <Input
                type="text"
                placeholder="Enter Your Name"
                value={input.fullname}
                onChange={changeEventHandler}
                name="fullname"
              />
            </div>
          )}

          <div className="my-4">
            <Label className="text-purple-600 mb-1">Email</Label>
            <Input
              type="email"
              placeholder="xyz@gmail.com"
              value={input.email}
              onChange={changeEventHandler}
              name="email"
            />
          </div>

          {isSignup && (
            <div className="my-4">
              <Label className="text-purple-600 mb-1">Phone Number</Label>
              <Input
                type="text"
                placeholder="+91 1234567890"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                name="phoneNumber"
              />
            </div>
          )}

          <div className="my-4 relative">
            <Label className="text-purple-600 mb-1">Password</Label>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="********"
              value={input.password}
              onChange={changeEventHandler}
              name="password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-9 text-purple-600"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <div className="my-4">
            <Label className="text-purple-600 mb-1">Role</Label>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                />
                <span>Student</span>
              </label>
              <label className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                />
                <span>Recruiter</span>
              </label>
            </div>
          </div>

          {isSignup && (
            <div className="my-4">
              <Label className="text-purple-600 mb-1">Profile Picture</Label>
              <Input type="file" accept="image/*" onChange={changeFileHandler} />
              {preview && <img src={preview} alt="Preview" className="w-16 h-16 mt-3 rounded-full" />}
            </div>
          )}

          <Button type="submit" className="w-full bg-purple-600 text-white py-2 mt-5">
            {loading ? (
              <span className="flex items-center justify-center">
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </span>
            ) : (
              isSignup ? 'Sign Up' : 'Login'
            )}
          </Button>

          <div className="text-center mt-4">
            <span>
              {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                className="text-purple-600 underline"
                onClick={() => setIsSignup(!isSignup)}
              >
                {isSignup ? 'Login' : 'Sign Up'}
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
