import { Label } from '@radix-ui/react-label'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import React from 'react'

const filterData = [
    {
        filterType: "Location",
        array: [
            "Delhi",
            "Hyderabad",
            "Nagpur",
            "Mumbai",
            "Chennai",
            "Bangalore"
        ]
    },
    {
        filterType: "Industry",
        array: [
            "Frontend Developer",
            "Backend Developer",
            "Data Science",
            "Software Developer",
            "Graphic Developer",
            "Game Developer",
            "Full Stack Developer"
        ]
    },
    {
        filterType: "Salary",
        array: [
            "0-20k",
            "21-50k",
            "51K-1LPA"
        ]
    }


]
const FilterCard = () => {
    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup>
                {
                    filterData.map((data, index) => (
                        <div>
                            <h1 className='font-bold text-lg'>{data.filterType}</h1>
                            {
                                data.array.map((item, index) => {
                                    return (
                                        <div className='flex items-center space-x-2 my-2'>
                                            <RadioGroupItem value={item} />
                                            <Label >{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard
