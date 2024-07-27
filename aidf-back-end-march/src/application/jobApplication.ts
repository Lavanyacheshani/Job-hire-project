import { NextFunction, Request, Response } from "express";
import JobApplication from "../infrastructure/schemas/jobApplication";
import { generateRating } from "./rating";

export const createJobApplication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jobApplication = req.body;
    console.log(jobApplication);

    const createdJobApplication = await JobApplication.create(jobApplication);
    // call the method that updates the created job application with the rating
    generateRating(createdJobApplication._id);

    return res.status(201).send();
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};

export const getJobApplications = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.query;
    console.log(jobId);

    if (jobId) {
      const jobApplications = await JobApplication.find({ job: jobId });
      return res.status(200).json(jobApplications);
    }

    const jobApplications = await JobApplication.find().populate("job").exec();
    return res.status(200).json(jobApplications);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};

export const getJobApplicationById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const jobApplication = await JobApplication.findById(id).populate("job");
    if (jobApplication === null) {
      return res.status(404).send();
    }
    return res.status(200).json(jobApplication);
  } catch (error) {
    console.log(error);
    return res.status(500).send();
  }
};
