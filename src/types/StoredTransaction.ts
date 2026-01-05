import type { Transaction } from "./Transaction";

export type StoredTransaction = Omit<Transaction, "createdAt"> & {
    createdAt: string;
  };
