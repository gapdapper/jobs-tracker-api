import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import Job from "../models/Job.js";
import xss from 'xss';


// sanitize input data using xss
const sanitizeJobData = (data) => {
  const fieldsToSanitize = ['company', 'position', 'status', 'jobLocation'];
  const sanitized = { ...data };
  
  fieldsToSanitize.forEach(field => {
    if (sanitized[field]) {
      sanitized[field] = xss(sanitized[field]);
    }
  });
  
  return sanitized;
};




export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

export const getJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  });

  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const sanitizedData = sanitizeJobData(req.body);
  const job = await Job.create(sanitizedData);
  res.status(StatusCodes.CREATED).json({ job });
};

export const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  if (company === "" || position === "") {
    throw new BadRequestError("Company or Position fields cannot be empty");
  }

  const sanitizedData = sanitizeJobData(req.body);
  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },    
    sanitizedData,
    { new: true, runValidators: true }
  );

  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

export const deleteJob = async (req, res) => {
    const {
        user: { userId },
        params: { id: jobId },
      } = req;

      const job = await Job.findOneAndDelete({
        _id:jobId,
        createdBy:userId
      })

      if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`);
      }
      res.status(StatusCodes.OK).send()
};
