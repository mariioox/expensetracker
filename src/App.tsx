import "./App.css";
import { useState, useEffect } from "react";
import type { Transaction } from "./types/Transaction";
import type { StoredTransaction } from "./types/StoredTransaction";
import Summary from "./components/Summary";
import AddTransactionForm from "./components/AddTransactionForm";
import TransactionList from "./components/TransactionList";

function App() {
  const STORAGE_KEY = "transactions";

  const loadTransactions = (): Transaction[] => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored) as StoredTransaction[];

    return parsed.map((t) => ({
      ...t,
      createdAt: new Date(t.createdAt),
    }));
  };

  const [transactions, setTransactions] =
    useState<Transaction[]>(loadTransactions);

  useEffect(() => {
    const stored: StoredTransaction[] = transactions.map((transaction) => ({
      ...transaction,
      createdAt: transaction.createdAt.toISOString(),
    }));

    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
  }, [transactions]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== id)
    );
  };

  const [typeFilter, setTypeFilter] = useState<"all" | Transaction["type"]>(
    "all"
  );

  const [categoryFilter, setCategoryFilter] = useState<
    "all" | Transaction["category"]
  >("all");

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesType =
      typeFilter === "all" ? true : transaction.type === typeFilter;

    const matchesCategory =
      categoryFilter === "all" ? true : transaction.category === categoryFilter;

    return matchesType && matchesCategory;
  });

  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);

  const updateTransaction = (updated: Transaction) => {
    setTransactions((prev) =>
      prev.map((transaction) =>
        transaction.id === updated.id ? updated : transaction
      )
    );
    setEditingTransaction(null);
  };

  return (
    <>
      <h1 className="font-bold m-5">Expense Tracker</h1>
      <AddTransactionForm
        onAddTransaction={addTransaction}
        onUpdateTransaction={updateTransaction}
        editingTransaction={editingTransaction}
        clearEditing={() => setEditingTransaction(null)}
      />
      <h2 className="font-bold mt-10 mb-2">Transactions</h2>
      <div className="flex justify-end">
        <h2>Filter: </h2>
        <select
          className="border border-black ml-2 rounded-md p-1"
          value={typeFilter}
          onChange={(e) =>
            setTypeFilter(e.target.value as "all" | "Income" | "Expense")
          }
        >
          <option value="all">All</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>

        <select
          className="border border-black ml-2 rounded-md p-1"
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(e.target.value as "all" | Transaction["category"])
          }
        >
          <option value="all">All Categories</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Bills">Bills</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <TransactionList
        transactions={filteredTransactions}
        onDeleteTransaction={deleteTransaction}
        onEditTransaction={setEditingTransaction}
      />
      <div className="mt-10">
        <Summary transactions={transactions} />
      </div>
    </>
  );
}

export default App;
