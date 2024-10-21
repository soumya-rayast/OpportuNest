import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { LogOut, User2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'


const Navbar = () => {
    const user = useSelector(store=>store.auth)
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl  h-16'>
                <div>
                    <h1 className='text-2xl font-bold cursor-pointer'>Opportu<span className='text-purple-700'>Nest</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5 '>
                        <li>
                        <Link to='/'>Home</Link>
                        </li>
                        <li>
                        <Link to='/browse'>Browse</Link>
                        </li>
                        <li>
                        <Link to='/jobs'>Jobs</Link>
                        </li>
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to='/login'><Button variant='outline'>Login</Button></Link>
                                <Link to='/signup'><Button className='bg-purple-700 hover:bg-purple-800'>SignUp</Button></Link>
                            </div>
                        ) : (
                            <Popover >
                                <PopoverTrigger asChild>
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage src='' alt='profile' />
                                        gg
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className='w-80'>
                                    <div className='flex gap-4 space-y-2'>
                                        <Avatar>
                                            <AvatarImage src='' alt='profile' />
                                        </Avatar>
                                        <h4 className='font-medium'>Soumya Rayast</h4>
                                        <p className='text-sm text-muted-foreground'>Lorem ipsum dolor sit amet consectetur.</p>
                                    </div>
                                    <div className=' flex flex-col text-gray-600'>
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <User2 />
                                            <Button variant="link"><Link to='/profile'>View Profile</Link></Button>
                                        </div>
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <LogOut />
                                            <Button variant="link">Logout</Button>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default Navbar
