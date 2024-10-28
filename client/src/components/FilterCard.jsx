import { Label } from '@radix-ui/react-label'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import React, { useEffect, useState } from 'react'
import { useScroll } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '@/redux/jobSlice'

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
    const [selectedValue, setSelectedValue] = useState("");
    const dispatch = useDispatch()
    const handleChange = (value) => {
        setSelectedValue(value)
    }
    useEffect(() => {
        dispatch(setSearchQuery(selectedValue))
    }, [selectedValue])
    return (
        <div className='w-full bg-white p-3 rounded-md shadow-md '>
            <h1>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup onValueChange={handleChange} value={selectedValue}>
                {
                    filterData.map((data, index) => (
                        <div >
                            <h1 className='font-bold text-lg'>{data.filterType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `r${index}-${idx}`
                                    return (
                                        <div className='flex items-center space-x-2 my-2'>
                                            <RadioGroupItem value={item} />
                                            <Label htmlFor={itemId}>{item}</Label>
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
