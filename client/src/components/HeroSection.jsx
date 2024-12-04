import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchQuery(query));
        navigate("/browse");
    };

    return (
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white text-center py-20">
            <div className="flex flex-col gap-5 my-10">
                <span className="mx-auto px-4 py-2 rounded-full bg-white text-purple-800 font-medium">
                    No. 1 Job Seeker Website
                </span>
                <h1 className="text-4xl md:text-5xl font-bold">
                    Find, apply, & <br /> land your <span className="text-purple-200">dream job today!</span>
                </h1>
                <p className="text-purple-200 italic max-w-2xl mx-auto">
                    "Turn your ambition into action: search, apply, and land the job of your dreams. Every opportunity is a step closer to the career you've always wanted. Start today—your dream job awaits!"
                </p>
                <div className="flex w-full max-w-md mx-auto shadow-lg border border-purple-300 rounded-full items-center gap-4 overflow-hidden">
                    <input
                        type="text"
                        placeholder="Find Your Dream Jobs"
                        className="outline-none border-none w-full py-3 px-4 bg-white text-gray-800"
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Button onClick={searchJobHandler} className="rounded-full bg-purple-800 hover:bg-purple-600 transition duration-200 ease-in-out">
                        <Search className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;