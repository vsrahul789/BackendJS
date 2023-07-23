import ErrorHandler from "../middlewares/error.js"
import { Task } from "../models/task.js"

export const newTask = async (req, res, next) => {
    try {
        const { title, description } = req.body

        await Task.create({
            title,
            description,
            user: req.user,
        })
        res.status(201).json({
            success: true,
            message: "Task added successfully"
        })
    } catch (error) {
        error
    }
}

export const myTask = async (req, res, next) => {
    try {
        const userID = req.user._id

        const tasks = await Task.find({ user: userID })

        res.status(200).json({
            success: true,
            tasks,
        })
    } catch (error) {
        next(error)
    }
}
export const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id)
        if (!task) return next(new ErrorHandler("Task not found", 404))

        task.isCompleted = !task.isCompleted
        console.log(task)
        await task.save();

        res.status(200).json({
            success: true,
            message: `task is updated`
        })
    } catch (error) {
        next(error)
    }
}
export const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id)

        if (!task) return next(new ErrorHandler("Task not found", 404))
        await task.deleteOne()

        res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        })
    } catch (error) {
        error
    }
}