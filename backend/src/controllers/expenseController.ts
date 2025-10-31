import type { Response } from "express";
import type { AuthRequest } from "../middleware/authMiddleware.js";
import { Expense } from "../models/Expense.js";

export const addExpense = async (req: AuthRequest, res: Response) => {
  try {
    const { title, amount, category, date } = req.body;
    if (!title || !amount || !category || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const expense = await Expense.create({
      userId: req.user.id,
      title,
      amount,
      category,
      date,
    });

    res.status(201).json(expense);
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getExpenses = async (req: AuthRequest, res: Response) => {
  try {
    const {
      category,
      title,
      startDate,
      endDate,
      minAmount,
      maxAmount,
      search,
    } = req.query as {
      category?: string;
      title?: string;
      startDate?: string;
      endDate?: string;
      minAmount?: string;
      maxAmount?: string;
      search?: string;
    };

    const userId = req.user.id;
    const query: any = { userId };

    if (category) query.category = { $regex: category, $options: "i" };
    if (title) query.title = { $regex: title, $options: "i" };

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    if (minAmount || maxAmount) {
      query.amount = {};
      if (minAmount) query.amount.$gte = parseFloat(minAmount);
      if (maxAmount) query.amount.$lte = parseFloat(maxAmount);
    }

    if (search) {
      const regex = new RegExp(search, "i");
      query.$or = [
        { title: regex },
        { category: regex },
      ];

      if (/\d{4}-\d{2}-\d{2}/.test(search)) {
        const date = new Date(search);
        query.$or.push({
          date: { $gte: date, $lte: new Date(date.getTime() + 86400000) },
        });
      }
    }

    const expenses = await Expense.find(query).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateExpense = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, amount, category, date } = req.body;

    const expense = await Expense.findOne({ _id: id, userId: req.user.id });
    if (!expense) return res.status(404).json({ message: "Expense not found" });

    if (title) expense.title = title;
    if (amount) expense.amount = amount;
    if (category) expense.category = category;
    if (date) expense.date = date;

    const updatedExpense = await expense.save();
    res.json(updatedExpense);
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteExpense = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findOneAndDelete({ _id: id, userId: req.user.id });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ message: "Server error" });
  }
};
