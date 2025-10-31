export interface Expense {
  _id?: string;
  title: string;
  amount: number;
  category: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}