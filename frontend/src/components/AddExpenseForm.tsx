import React, { useState, type ChangeEvent, type FormEvent } from "react";

export interface Expense {
  title: string;
  amount: string;
  category: string;
  date: string;
}

interface AddExpenseFormProps {
  onAdd: (expense: Expense) => void;
  onCancel: () => void;
}

const AddExpenseForm: React.FC<AddExpenseFormProps> = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ title: "", amount: "", category: "", date: "" });
  };

  return (
    <div className="w-full">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        Add Expense
      </h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="title"
            className="block mb-1 font-semibold text-gray-700 text-lg"
          >
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>
        <div>
          <label
            htmlFor="amount"
            className="block mb-1 font-semibold text-gray-700 text-lg"
          >
            Amount
          </label>
          <input
            id="amount"
            name="amount"
            type="number"
            placeholder="Amount"
            min="0"
            step="0.01"
            value={formData.amount}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block mb-1 font-semibold text-gray-700 text-lg"
          >
            Category
          </label>
          <input
            id="category"
            name="category"
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>
        <div>
          <label
            htmlFor="date"
            className="block mb-1 font-semibold text-gray-700 text-lg"
          >
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-md
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 rounded-md border border-gray-300 text-gray-700 
                       hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded-md bg-indigo-600 text-white font-medium 
                       hover:bg-indigo-700 transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExpenseForm;
