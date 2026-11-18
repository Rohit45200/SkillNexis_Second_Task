const mongoose = require('mongoose');
const Task = require('../models/Task');

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Public
const createTask = async (req, res, next) => {
  try {
    const { title, description, completed } = req.body;

    if (!title || typeof title !== 'string' || !title.trim()) {
      res.status(400);
      throw new Error('Please provide a valid task title');
    }

    if (description !== undefined && typeof description !== 'string') {
      res.status(400);
      throw new Error('Description must be a string');
    }

    if (completed !== undefined && typeof completed !== 'boolean') {
      res.status(400);
      throw new Error('Completed must be a boolean (true or false)');
    }

    const task = await Task.create({
      title: title.trim(),
      description: description ? description.trim() : '',
      completed: completed !== undefined ? completed : false,
    });

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Public
const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single task by ID
// @route   GET /api/tasks/:id
// @access  Public
const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error('Invalid task ID format');
    }

    const task = await Task.findById(id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update task by ID
// @route   PUT /api/tasks/:id
// @access  Public
const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error('Invalid task ID format');
    }

    const { title, description, completed } = req.body;
    const updates = {};

    if (title !== undefined) {
      if (typeof title !== 'string' || !title.trim()) {
        res.status(400);
        throw new Error('Title must be a non-empty string');
      }
      updates.title = title.trim();
    }

    if (description !== undefined) {
      if (typeof description !== 'string') {
        res.status(400);
        throw new Error('Description must be a string');
      }
      updates.description = description.trim();
    }

    if (completed !== undefined) {
      if (typeof completed !== 'boolean') {
        res.status(400);
        throw new Error('Completed must be a boolean (true or false)');
      }
      updates.completed = completed;
    }

    if (Object.keys(updates).length === 0) {
      res.status(400);
      throw new Error('Please provide at least one field to update');
    }

    const updatedTask = await Task.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      res.status(404);
      throw new Error('Task not found');
    }

    res.status(200).json({
      success: true,
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete task by ID
// @route   DELETE /api/tasks/:id
// @access  Public
const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400);
      throw new Error('Invalid task ID format');
    }

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      res.status(404);
      throw new Error('Task not found');
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: deletedTask,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
