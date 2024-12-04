import React, { useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchQuery } from '@/redux/jobSlice';

const categories = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Software Developer",
    "Graphic Developer",
    "Game Developer",
    "Full Stack Developer"
];

const CategorySection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (category) => {
        dispatch(setSearchQuery(category));
        navigate("/browse");
    };

    return (
        <div className="bg-gray-100 py-10">
            <Carousel className="w-full max-w-xl mx-auto">
                <CarouselContent>
                    {categories.map((cat, index) => (
                        <CarouselItem key={index} className="basis-1/2 lg:basis-1/3 flex justify-center">
                            <Button
                                onClick={() => searchJobHandler(cat)}
                                variant="outline"
                                className="rounded-full bg-white border border-purple-500 text-purple-600 hover:bg-purple-600 hover:text-white transition duration-200 ease-in-out p-3 text-lg"
                            >
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hover:bg-purple-600 hover:text-white p-2 rounded-full transition duration-200 ease-in-out" />
                <CarouselNext className="hover:bg-purple-600 hover:text-white p-2 rounded-full transition duration-200 ease-in-out" />
            </Carousel>
        </div>
    );
};

export default CategorySection;
