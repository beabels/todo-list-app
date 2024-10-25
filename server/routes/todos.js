import express from 'express';
import Todo from '../models/todos.js'; 

const router = express.Router();

router.get('/todos/:userId', async (req, res) => {
  const userId = req.params.userId;
  const todoId = req.query.id; 

  try {
    if (todoId) {
      const todo = await Todo.findOne({ _id: todoId, user: userId });
      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      res.json(todo);
    } else {
      const todos = await Todo.find({ user: userId });
      res.json(todos);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos", error });
  }
});

router.get('/todos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todo", error });
  }
});

router.post('/todos/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { title, description } = req.body;

  try {
    const newTodo = new Todo({
      user: userId,
      title,
      description
    });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ message: "Error creating todo", error });
  }
});

router.put('/todos/:userId/:id', async (req, res) => {
  const userId = req.params.userId;
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, user: userId },
      { title, description },
      { new: true } 
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "Error updating todo", error });
  }
});

router.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo", error });
  }
});

export default router;