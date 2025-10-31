import axios from "axios";
import type { Expense } from "../types/types";

const API_URL = `${import.meta.env.VITE_BASE_URL}/expenses`;

const getToken = () => localStorage.getItem("token");

export const getExpenses = (filters?: {
  category?: string;
  title?: string;
  startDate?: string; 
  endDate?: string; 
  minAmount?: number;
  maxAmount?: number;
}) =>
  axios.get(API_URL, {
    headers: { Authorization: `Bearer ${getToken()}` },
    params: filters,
  });


export const addExpense = (data: Expense) =>
  axios.post(API_URL, data, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

export const deleteExpense = (id: string) =>
  axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });

export const updateExpense = (id: string, data: Partial<Expense>) =>
  axios.put(`${API_URL}/${id}`, data, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
