import express from "express";

import isAuthenticated from "../middleware/Authenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/Job.Controller.js";

const router = express.Router()

router.route("/post").post(isAuthenticated, postJob);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjobs").post(isAuthenticated, getAdminJobs);
router.route("/get/:id").post(isAuthenticated, getJobById)


export default router;