import { Label } from '@radix-ui/react-label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchQuery } from '@/redux/jobSlice';

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
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState("");
    const dispatch = useDispatch();

    const handleChange = (value) => {
        setSelectedValue(value);
    };

    useEffect(() => {
        dispatch(setSearchQuery(selectedValue));
    }, [selectedValue, dispatch]);

    return (
        <div className='w-60 ml-5 bg-white p-4 rounded-lg shadow-md border border-purple-500'>
            <h1 className='text-xl font-semibold mb-2'>Filter Jobs</h1>
            <hr className='my-3' />
            <RadioGroup onValueChange={handleChange} value={selectedValue}>
                {
                    filterData.map((data, index) => (
                        <div key={index} className='mb-4'>
                            <h2 className='font-bold text-lg mb-2'>{data.filterType}</h2>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `r${index}-${idx}`;
                                    return (
                                        <div key={idx} className='flex items-center space-x-2 my-2'>
                                            <RadioGroupItem value={item} id={itemId} className="appearance-none border rounded-full w-5 h-5 border-gray-300 checked:bg-purple-500 checked:border-transparent cursor-pointer transition duration-200 ease-in-out hover:border-purple-400" />
                                            <Label htmlFor={itemId} className='cursor-pointer hover:text-purple-600'>{item}</Label>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    );
};

export default FilterCard;
