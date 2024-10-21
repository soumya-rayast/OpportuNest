import { Application } from "../models/Application.model";
import { Job } from "../models/job.model";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required",
                success: true,
            })
        }
        // if user is already applied 
        const existApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existApplication) {
            return res.status(400).json({
                message: "You have already applied for this role.",
                success: false
            })
        }
        // check if the job exists

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not Found",
                success: false
            })
        }
        //  create new application 
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        })
        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message: "Job Applied successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const application = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: "Job",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "company"
            }
        });
        if (!application) {
            return res.status(404).json({
                message: "No Applications",
                success: false
            })
        }
        return res.status(200).json({
            application,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

export const getApplicants = async (req, res) => {
    try {
        const jonId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant'
            }
        })
        if (!job) {
            return res.status(404).json({
                message: "Job not Found",
                success: false
            })
        }
        return res.status(200).json({ job, success: true })
    } catch (error) {
        console.log(error)
    }
}

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;
        if (!status) {
            return res.status(400).json({
                message: 'status is required',
                success: false
            })
        }
        // Find the application by application id 
        const application = await Application.findOne({ _id: applicationId });
        if (!application) {
            return res.status({
                message: "Application not found ",
                success: false
            })
        }
        application.status = status.toLowerCase();
        await application.save();
        return res.status(200).json({
            message: 'Status updated successfully.',
            success: true,
        })
    } catch (error) {
        console.log(error)
    }
}