import React, { useState } from 'react';
import Navbar from './Navbar';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Button } from '../ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Label } from '@radix-ui/react-label';
import AppliedJobTable from '../AppliedJobTable';
import UpdateProfileDialogue from '../UpdateProfileDialogue';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '../hooks/useGetAppliedJob';

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);

  return (
    <div className="min-h-screen bg-gray-50 ">
      <Navbar />
      <div className='max-w-4xl mt-28 mx-10 bg-white border border-purple-300 shadow-md rounded-2xl my-10 p-6 md:p-8'>
        <div className='flex justify-between items-start'>
          <div className='flex items-center gap-4'>
            <Avatar className='h-24 w-24'>
              <AvatarImage src={user?.profile?.profilePhoto} className='rounded-full h-24 w-24' alt='Profile image' />
            </Avatar>
            <div>
              <h1 className='font-semibold text-2xl'>{user?.fullname}</h1>
              <p className='text-gray-600'>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            className="bg-purple-600 text-white hover:bg-purple-700 transition"
            onClick={() => setOpen(true)}
            variant="outline">
            <Pen className="w-5 h-5" />
          </Button>
        </div>
        <div className='my-5'>
          <div className='flex items-center gap-2 text-gray-700'>
            <Mail className="text-gray-500" />
            <span>{user?.email}</span>
          </div>
          <div className='flex items-center gap-2 text-gray-700'>
            <Contact className="text-gray-500" />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div className='my-5'>
          <h1 className='font-bold text-lg'>Skills</h1>
          <div className='flex items-center gap-2 mt-1'>
            {user?.profile?.skills.length ? (
              user.profile.skills.map((item, index) => (
                <Badge className="bg-purple-600 text-white" key={index}>
                  {item}
                </Badge>
              ))
            ) : (
              <span className='text-gray-500'>N/A</span>
            )}
          </div>
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label className='text-md font-bold'>Resume</Label>
          {isResume ? (
            <a 
              target='_blank' 
              rel="noopener noreferrer" 
              href={user?.profile?.resume} 
              className='text-blue-500 hover:underline cursor-pointer'>
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className='text-gray-500'>N/A</span>
          )}
        </div>
      </div>
      <div className='max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-4'>
        <h1 className='font-bold text-lg m-1'>Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      <UpdateProfileDialogue open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
