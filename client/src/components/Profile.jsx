import React from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'

const Profile = () => {
  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto bg-white border border-gray200 rounded-2xl my-5 p-8'>
        <div className='flex justify-between'>
          <div className='flex items-center gap-4'>
            <Avatar className='h-24 w-24'>
              <AvatarImage src='ss' alt='profile image' />
            </Avatar>
            <div className=' flex items-center gap-4'>
              <h1 className='font-medium text-xl'>Full name</h1>
              <p>Add Your Bio "Lorem ipsum dolor sit amet.</p>
            </div>
          </div>
          <Button className='text-right' variant="outline"><Pen /></Button>
        </div>
        <div className='my-5'>
          <div className=' flex items-center gap-'>
            <Mail />
            <span>xyz@gmail.com</span>
          </div>
          <div className='flex item-center gap-2'>
            <Contact />z
            <span>234789234</span>
          </div>
        </div>
        <div>
          <h1>Skills</h1>
          {
            [1, 2, 3,].map((item, index) =>
              <Badge key={index}> {item}</Badge>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Profile