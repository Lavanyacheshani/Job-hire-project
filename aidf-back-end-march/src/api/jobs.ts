import express from "express";
import { createJob, deleteJob, getAllJobs, getJobById, updateJob } from "../application/jobs";

const jobsRouter = express.Router();

jobsRouter.route("/").get(getAllJobs).post(createJob);
jobsRouter.route("/:_id").get(getJobById).put(updateJob).delete(deleteJob);

export default jobsRouter;