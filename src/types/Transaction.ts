export type Category =
  | "Food"
  | "Transport"
  | "Bills"
  | "Entertainment"
  | "Other";

export type TransactionType = "Income" | "Expense";

export type Transaction = {
  id: string;
  title: string;
  amount: number;
  category: Category;
  type: TransactionType;
  createdAt: Date;
};
