import React, { useState } from "react";
import type { Expense } from "../types/types";
import UpdateExpenseForm from "./UpdateExpenseForm";

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: Partial<Expense>) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onDelete, onUpdate }) => {
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  return (
    <div className="max-w-7xl mx-auto p-4">
      {expenses.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10">No expenses yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-400 to-indigo-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left uppercase font-semibold text-sm">#</th>
                <th className="py-3 px-6 text-left uppercase font-semibold text-sm">Title</th>
                <th className="py-3 px-6 text-left uppercase font-semibold text-sm">Category</th>
                <th className="py-3 px-6 text-left uppercase font-semibold text-sm">Date</th>
                <th className="py-3 px-6 text-right uppercase font-semibold text-sm">Amount</th>
                <th className="py-3 px-6 text-center uppercase font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((e, index) => (
                <tr
                  key={e._id}
                  className="hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                >
                  <td className="py-3 px-6">{index + 1}</td>
                  <td className="py-3 px-6 font-medium text-gray-800">{e.title}</td>
                  <td className="py-3 px-6 text-gray-600">{e.category}</td>
                  <td className="py-3 px-6 text-gray-600">{new Date(e.date).toLocaleDateString()}</td>
                  <td className="py-3 px-6 text-right font-semibold text-indigo-600">${e.amount.toFixed(2)}</td>
                  <td className="py-3 px-6 text-center space-x-2">
                    <button
                      onClick={() => setEditingExpense(e)}
                      className="px-3 py-1 text-yellow-400 hover:text-yellow-500 rounded-md transition"
                      aria-label={`Edit expense ${e.title}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => e._id && onDelete(e._id)}
                      className="px-3 py-1 text-red-500 hover:text-red-600 rounded-md transition"
                      aria-label={`Delete expense ${e.title}`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editingExpense && (
        <div className="fixed inset-0 backdrop-blur-xs flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <UpdateExpenseForm
              expense={editingExpense}
              onUpdate={onUpdate}
              onCancel={() => setEditingExpense(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
