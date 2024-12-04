import express from "express";

import isAuthenticated from "../middleware/Authenticated.js";
import { deleteJob, getAdminJobs, getAllJobs, getJobById, getSavedJobs, postJob, saveForLater } from "../controllers/Job.Controller.js";

const router = express.Router()

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(isAuthenticated, getJobById)
router.route('/saveForLater/:jobId').post(isAuthenticated,saveForLater)
router.route('/getSavedJobs').get(isAuthenticated, getSavedJobs);
router.route('/delete/:id').delete(isAuthenticated,deleteJob)

export default router;