const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const { findOneAndDelete } = require('../models/Job')
const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userID }).sort('createdAt')
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}
const getSingleJob = async (req, res) => {
  const {
    user: { userID },
    params: { id: jobId },
  } = req
  const job = await Job.findOne({
    _id: jobId,
    createdBy: userID,
  })
  if (!job) {
    throw new NotFoundError('Job Not Found')
  }
  res.status(StatusCodes.OK).json({ job })
}

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userID //passed from middleware next()
  //passed from middleware next()

  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}
const UpdateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userID },
    params: { id: jobId },
  } = req
  if (!company || !position) {
    throw new BadRequestError("The company and position can't be empty")
  }
  const jobupdate = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userID },
    req.body,
    { new: true, runValidators: true }
  )
  if (!jobupdate) {
    throw new NotFoundError('Job Not Found')
  }
  res.status(StatusCodes.OK).json({ jobupdate })
}
const deleteJob = async (req, res) => {
  const {
    user: { userID },
    params: { id: jobId },
  } = req
  const deletejob = await findOneAndDelete({ _id: jobId, createdBy: userID })
  if (!deletejob) {
    throw new NotFoundError('Job Not Found')
  }
  res.status(StatusCodes.OK).json({ deletejob })
}
module.exports = {
  getAllJobs,
  getSingleJob,
  createJob,
  UpdateJob,
  deleteJob,
}
