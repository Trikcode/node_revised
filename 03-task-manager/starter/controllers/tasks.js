const Task = require('../model/Task')
const asyncWrapper = require('../middleware/async')

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body)
  res.status(201).json({ task })
})
const getAllTasks = asyncWrapper(async (req, res) => {
  const task = await Task.find({})
  res.status(201).json({ task })
})
const getTask = asyncWrapper(async (req, res) => {
  const { id: TaskId } = req.params
  const task = await Task.findOne({ _id: TaskId })
  if (!task) {
    return res.status(404).json({ msg: `We can't find id ${taskID}` })
  }
  res.status(201).json({ task })
})
const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params
  const task = await Task.findOneAndDelete({ _id: taskID })
  if (!task) {
    return res.status(404).json({ msg: `We can't find id : ${taskID}` })
  }
  res.status(200).json({ task })
})
const updateTask = asyncWrapper(async (req, res) => {
  const { id: TaskID } = req.params
  const task = await Task.findOneAndUpdate({ _id: TaskID }, req.body, {
    new: true,
    runValidators: true,
  })
  if (!task) {
    res.status(404).json({ msg: `We can't find id : ${taskID}` })
  }
  res.status(200).json({ task })
})
module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
}
