import "./App.css";
import { useState, useEffect } from "react";
import type { Transaction } from "./types/Transaction";
import type { StoredTransaction } from "./types/StoredTransaction";
import Summary from "./components/Summary";
import AddTransactionForm from "./components/AddTransactionForm";
import TransactionList from "./components/TransactionList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    <main className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">Expense Tracker</h1>
        <AddTransactionForm
          onAddTransaction={addTransaction}
          onUpdateTransaction={updateTransaction}
          editingTransaction={editingTransaction}
          clearEditing={() => setEditingTransaction(null)}
        />

        <Card>
          <CardHeader>
            <CardTitle>
              <h2 className="font-bold text-2xl mb-5">Transactions</h2>

              <div className="flex">
                <div className="flex items-center gap-2 m-2">
                  <span>Filter:</span>
                  <Select
                    value={typeFilter}
                    onValueChange={(value) =>
                      setTypeFilter(value as "all" | Transaction["type"])
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="Expense">Expense</SelectItem>
                      <SelectItem value="Income">Income</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2 m-2">
                  <span>Category:</span>
                  <Select
                    value={categoryFilter}
                    onValueChange={(value) =>
                      setCategoryFilter(
                        value as "all" | Transaction["category"]
                      )
                    }
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="Food">Food</SelectItem>
                      <SelectItem value="Transport">Transport</SelectItem>
                      <SelectItem value="Bills">Bills</SelectItem>
                      <SelectItem value="Entertainment">
                        Entertainment
                      </SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <TransactionList
                transactions={filteredTransactions}
                onDeleteTransaction={deleteTransaction}
                onEditTransaction={setEditingTransaction}
              />
            </div>
          </CardContent>
        </Card>

        <div className="mt-10">
          <Summary transactions={transactions} />
        </div>
      </div>
    </main>
  );
}

export default App;
