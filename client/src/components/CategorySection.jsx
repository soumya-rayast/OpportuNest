import React, { useState } from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchQuery } from '@/redux/jobSlice'

const category = [
    "Frontend Developer",
    'Backend Developer',
    "Data Science",
    "Software Developer",
    "Graphic Developer",
    "Game Developer",
    "Full Stack Developer"
]
const CategorySection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = () => {
        dispatch(setSearchQuery(query));
        navigate("/browse")
    }
    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-20">

                <CarouselContent>
                    {
                        category.map((cat, index) =>
                        (
                            <CarouselItem key={index} className="basis-1/2 lg:basis-1/3 ">
                                <Button onClick={()=>searchJobHandler(cat)} variant="outline" className="rounded-full hover:bg-purple-600 hover:text-white">{cat}</Button>
                            </CarouselItem>
                        )
                        )}
                </CarouselContent>
                <CarouselPrevious  className="hover:bg-purple-600 hover:text-white"/>
                <CarouselNext  className="hover:bg-purple-600 hover:text-white"/>
            </Carousel>
        </div>
    )
}

export default CategorySection
