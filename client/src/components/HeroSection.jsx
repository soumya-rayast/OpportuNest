import { Search } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchQuery(query));
        navigate("/browse")
    }
    return (
        <div className="text-center  ">
            <div className="flex flex-col gap-5 my-20">
                <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-purple-600 font-medium">
                    No. 1 Job Hunt Website
                </span>
                <h1 className="text-5xl font-bold">Find, apply, & <br /> land your<span className="text-purple-600">dream job today!</span></h1>
                <p className="text-purple-500 italic">"Turn your ambition into action: search, apply, and land the job of your dreams. Every opportunity is a step closer to the career you've always wanted. Start today—your dream job awaits!"</p>
                <div className="flex w-[40%] shadow-lg  shadow-purple-600 border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto ">
                    <input
                        type="text"
                        placeholder="Find Your Dream jobs"
                        className="outline-none border-none w-full "
                        onChange={(e) => setQuery(e.target.value)} />
                    <Button onClick={searchJobHandler} className="rounded-full bg-purple-600  hover:bg-purple-400">
                        <Search className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
