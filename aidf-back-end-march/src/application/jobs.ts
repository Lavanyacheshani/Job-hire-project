import { NextFunction, Request, Response } from "express";
import Job from "../infrastructure/schemas/job";
import NotFoundError from "../domain/errors/not-found-error";
import ValidationError from "../domain/errors/validation-error";
import { z } from "zod";

export const getAllJobs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jobs = await Job.find();
        return res.status(200).json(jobs);
    } catch (error) {
        next(error)
    }
}

export const createJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const job = z.object({ title: z.string(), description: z.string(), type: z.string(), location: z.string(), questions: z.string().array().optional() }).safeParse(req.body)
        if (!job.success) {
            throw new ValidationError(job.error.message)
        }

        await Job.create(job);
        return res.status(201).send();
    } catch (error) {
        next(error)
    }
}


export const getJobById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const job = await Job.findById(req.params._id);
        if (!job) {
            throw new NotFoundError("Job not found")
        }
        return res.status(200).json(job);

    } catch (error) {
        next(error)
    }
}

export const deleteJob = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const job = await Job.findByIdAndDelete(req.params._id);
        if (!job) {
            throw new NotFoundError("Job not found")
        }
        return res.status(204).send();
    } catch (error) {
        next(error)
    }
}

export const updateJob = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const jobToUpdate = Job.findById(req.params._id);
        if (!jobToUpdate) {
            throw new NotFoundError("Job not found")
        }
        const job = z.object({ title: z.string(), description: z.string(), type: z.string(), location: z.string(), questions: z.string().array().optional() }).safeParse(req.body)
        if (!job.success) {
            throw new ValidationError(job.error.message)
        }
        await Job.findByIdAndUpdate(req.params._id, { title: req.body.title, description: req.body.description, location: req.body.location, type: req.body.type });
        return res.status(204).send();
    } catch (error) {
        next(error)
    }

}