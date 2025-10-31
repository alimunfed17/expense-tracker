import React from "react";
import type { Expense } from "../types/types";

interface SummaryProps {
  expenses: Expense[];
}

const Summary: React.FC<SummaryProps> = ({ expenses }) => {
  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  const byCategory = expenses.reduce<Record<string, number>>((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + Number(e.amount);
    return acc;
  }, {});

  return (
    <div className="max-w-md mx-auto bg-white p-4 mb-6">
      <p className="text-lg font-semibold mb-4">Total: ${total.toFixed(2)}</p>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2 text-left">Category</th>
            <th className="border px-4 py-2 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(byCategory).map(([cat, amt]) => (
            <tr key={cat} className="odd:bg-white even:bg-gray-50">
              <td className="border px-4 py-2">{cat}</td>
              <td className="border px-4 py-2 text-right">${amt.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-100 font-semibold">
            <td className="border px-4 py-2">Total</td>
            <td className="border px-4 py-2 text-right">${total.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Summary;
