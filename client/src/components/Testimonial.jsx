import React, { useEffect, useState } from 'react';

const testimonials = [
    {
        name: "John Doe",
        text: "OpportuNest helped me land my dream job in tech! The process was seamless and the support was fantastic.",
        position: "Software Engineer at TechCorp"
    },
    {
        name: "Jane Smith",
        text: "I had a great experience using OpportuNest. The job recommendations were spot on and the application process was easy.",
        position: "Data Analyst at DataSolutions"
    },
    {
        name: "Alice Johnson",
        text: "Thanks to OpportuNest, I found a job that matches my skills and passion. Highly recommended!",
        position: "Project Manager at CreativeAgency"
    },
    {
        name: "Michael Brown",
        text: "The resources and tools provided by OpportuNest made my job search much easier. I am grateful for their support.",
        position: "Marketing Specialist at MarketPro"
    },
    {
        name: "Emily Davis",
        text: "OpportuNest is a game changer! I found multiple job opportunities that aligned perfectly with my career goals.",
        position: "UX Designer at DesignCo"
    }
];

const Testimonial = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    // Change testimonial every 10 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % testimonials.length);
        }, 10000); // Change every 10 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <div className="relative overflow-hidden max-w-xl mx-auto my-10">
            <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="min-w-full p-6 bg-white border rounded-lg shadow-md">
                        <p className="italic text-center text-gray-600">"{testimonial.text}"</p>
                        <div className="mt-4 text-center">
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-gray-500">{testimonial.position}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Testimonial;
