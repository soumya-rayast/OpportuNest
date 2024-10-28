import { Job } from "../models/job.model.js"
import { User } from "../models/User.js";
// recruiter 
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id; //user id 
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({ message: "Fill all the forms", success: false })
        }
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId,
        })
        return res.status(201).json({
            message: "New Job Created Successfully",
            job,
            success: true,
        })
    } catch (error) {
        console.log(error)
    }

}
// students 
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        }
        const jobs = await Job.find(query).populate({ path: "company" }).sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs Not Found",
                success: false,
            })
        }
        return res.status(200).json({ jobs, success: true })
    } catch (error) {
        console.log(error)
    }
}

//students 
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications"
        });
        if (!job) {
            return res.status(404).json({ message: "Job Not Found,", success: false })
        }
        return res.status(200).json({ job, success: true })
    } catch (error) {
        console.log(error)
    }
}

export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: "company",
            createdAt: -1
        });
        if (!jobs) {
            return res.status(404).json({ message: "Jobs Not found.", success: false })
        }
        return res.status(200).json({ jobs, success: true })
    } catch (error) {
        console.log(error)
    }
}

// save for later 
export const saveForLater = async (req, res) => {
    try {
        const userId = req.id; // Assuming `req.user` is set after authentication middleware
        const { jobId } = req.params; // Corrected to access jobId from req.params

        if (!jobId) {
            return res.status(400).json({ message: "Job ID is required", success: false });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        const isSaved = user.saveForLater.includes(jobId);

        if (isSaved) {
            // Remove jobId from saveForLater if it is already saved
            user.saveForLater = user.saveForLater.filter((id) => id.toString() !== jobId);
            await user.save(); // Save changes to the user document
            return res.json({ success: true, message: "Job removed from saved for later" });
        } else {
            // Add jobId to saveForLater if it is not saved
            user.saveForLater.push(jobId);
            await user.save(); // Save changes to the user document
            return res.json({ success: true, message: "Job saved for later" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};


export const getSavedJobs = async (req, res) => {
    try {
        const userId = req.id; // Extract user ID from request
        const user = await User.findById(userId).populate("saveForLater");

        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        const savedJobs = user.saveForLater;

        // Check if the user has saved jobs
        if (!savedJobs || savedJobs.length === 0) {
            return res.status(200).json({ message: "No saved jobs found", success: true, jobs: [] });
        }

        // Return saved jobs
        return res.status(200).json({ jobs: savedJobs, success: true });
    } catch (error) {
        console.error(error); // Use console.error for better error logging
        res.status(500).json({ message: "Failed to get saved jobs", success: false });
    }
};
