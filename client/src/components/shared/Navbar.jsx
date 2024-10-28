import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { LogOut, Menu, MenuIcon, Save, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { useState } from 'react'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true })
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }
    return (
        <div className='bg-white fixed w-full top-0 shadow-md'>
            <div className='flex items-center justify-between mx-auto max-w-7xl  h-16'>
                <div className='m-2'>
                    <h1 className='text-2xl font-bold cursor-pointer'>Opportu<span className='text-purple-700'>Nest</span></h1>
                </div>
                <div className='md:flex items-center gap-12 hidden '>
                    <ul className='flex font-medium items-center gap-5 '>
                        {
                            user && user.role === "recruiter" ? (
                                <>
                                    <li>
                                        <Link to='/admin/companies'>Companies</Link>
                                    </li>
                                    <li>
                                        <Link to='/admin/jobs'>Jobs</Link>
                                    </li>
                                </>
                            ) :
                                (
                                    <>
                                        <li>
                                            <Link to='/'>Home</Link>
                                        </li>
                                        <li>
                                            <Link to='/browse'>Browse</Link>
                                        </li>
                                        <li>
                                            <Link to='/jobs'>Jobs</Link>
                                        </li>
                                    </>
                                )
                        }
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to='/login'><Button variant='outline' className='text-purple-600 border-purple-600'>Login</Button></Link>
                                <Link to='/signup'><Button className='bg-purple-700 hover:bg-purple-800'>SignUp</Button></Link>
                            </div>
                        ) : (
                            <Popover >
                                <PopoverTrigger asChild>
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage src={user?.profile?.profilePhoto} alt='profile' className='w-10 h-10 rounded-full' />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className='w-60 bg-white p-2 shadow-md rounded-md'>
                                    <div className='flex gap-4 space-y-2'>
                                        <Avatar className='flex items-center justify-center'>
                                            <AvatarImage src={user?.profile?.profilePhoto} alt='profile' className='w-10 h-10 rounded-full' />
                                        </Avatar>
                                        <div className='flex flex-col items-start justify-center'>
                                            <h4 className='font-medium'>{user?.fullname}</h4>
                                            <h5 className='text-sm text-muted-foreground'>{user?.profile?.bio}</h5>
                                        </div>
                                    </div>
                                    <div className=' flex flex-col text-gray-600'>
                                        {
                                            user && user.role === "student" && (
                                                <div>
                                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                        <User2 />
                                                        <Button variant="link"><Link to='/profile'>View Profile</Link></Button>
                                                    </div>
                                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                        <Save />
                                                        <Button variant="link"><Link to='/saveForLater'>Saved Jobs</Link></Button>
                                                    </div>
                                                </div>
                                            )
                                        }

                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <LogOut />
                                            <Button onClick={logoutHandler} variant="link">Logout</Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>

                <div className='md:hidden m-2'>
                    <Button onClick={toggleMenu} className="text-3xl bg-purple-600">
                        {isMenuOpen ? <Menu /> : <MenuIcon />}
                    </Button>
                </div>
                {
                    isMenuOpen && (
                        <div className='flex flex-col gap-5 text-lg font-semibold text-black bg-white w-full mt-3 p-5 absolute top-16 left-0 shadow-md'>
                            <ul className='flex flex-col font-medium bg-white gap-5 '>
                                {
                                    user && user.role === "recruiter" ? (
                                        <>
                                            <li>
                                                <Link to='/admin/companies'>Companies</Link>
                                            </li>
                                            <li>
                                                <Link to='/admin/jobs'>Jobs</Link>
                                            </li>
                                        </>
                                    ) :
                                        (
                                            <>
                                                <li>
                                                    <Link to='/'>Home</Link>
                                                </li>
                                                <li>
                                                    <Link to='/browse'>Browse</Link>
                                                </li>
                                                <li>
                                                    <Link to='/jobs'>Jobs</Link>
                                                </li>
                                            </>
                                        )
                                }
                            </ul>
                            {
                                !user ? (
                                    <div className='flex flex-col  gap-2'>
                                        <Link to='/login'><Button variant='outline' className='text-purple-600 border-purple-600'>Login</Button></Link>
                                        <Link to='/signup'><Button className='bg-purple-700 hover:bg-purple-800'>SignUp</Button></Link>
                                    </div>
                                ) : (
                                    <div className='flex flex-col  gap-2'>
                                        <Link onClick={() => navigate('/profile')}>Profile</Link>
                                        <Link onClick={logoutHandler}>Logout</Link>
                                    </div>
                                )
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar
