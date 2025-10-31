import React, { useState, useEffect } from "react";
import type { Expense } from "../types/types";

interface UpdateExpenseFormProps {
  expense: Expense | null;
  onUpdate: (id: string, data: Partial<Expense>) => void;
  onCancel: () => void;
}

const UpdateExpenseForm: React.FC<UpdateExpenseFormProps> = ({ expense, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  useEffect(() => {
    if (expense) {
      setFormData({
        title: expense.title,
        amount: String(expense.amount),
        category: expense.category,
        date: expense.date.slice(0, 10),
      });
    }
  }, [expense]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expense?._id) return;
    onUpdate(expense._id, {
      title: formData.title,
      amount: Number(formData.amount),
      category: formData.category,
      date: formData.date,
    });
    onCancel();
  };

  if (!expense) return null;

  return (
    <div className="w-full">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800 text-center">Edit Expense</h3>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="title" className="block mb-1 font-semibold text-gray-700 text-lg">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        <div>
          <label htmlFor="amount" className="block mb-1 font-semibold text-gray-700 text-lg">
            Amount
          </label>
          <input
            id="amount"
            type="number"
            placeholder="Amount"
            min="0"
            step="0.01"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        <div>
          <label htmlFor="category" className="block mb-1 font-semibold text-gray-700 text-lg">
            Category
          </label>
          <input
            id="category"
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        <div>
          <label htmlFor="date" className="block mb-1 font-semibold text-gray-700 text-lg">
            Date
          </label>
          <input
            id="date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateExpenseForm;
