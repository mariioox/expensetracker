import { useState, useEffect } from "react";
import type {
  Category,
  Transaction,
  TransactionType,
} from "../types/Transaction";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  onAddTransaction: (transaction: Transaction) => void;
  onUpdateTransaction: (transaction: Transaction) => void;
  editingTransaction?: Transaction | null;
  clearEditing: () => void;
};

function AddTransactionForm({
  onAddTransaction,
  editingTransaction,
  onUpdateTransaction,
}: Props) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<Category>("Food");
  const [type, setType] = useState<TransactionType>("Income");

  useEffect(() => {
    if (!editingTransaction) return;

    setTitle(editingTransaction.title);
    setAmount(editingTransaction.amount.toString());
    setCategory(editingTransaction.category);
    setType(editingTransaction.type);
  }, [editingTransaction]);

  const resetForm = () => {
    setTitle("");
    setAmount("");
    setCategory("Food");
    setType("Expense");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !amount) return;

    if (editingTransaction) {
      onUpdateTransaction({
        ...editingTransaction,
        title,
        amount: Number(amount),
        category,
        type,
      });
    } else {
      onAddTransaction({
        id: crypto.randomUUID(),
        title,
        amount: Number(amount),
        category,
        type,
        createdAt: new Date(),
      });
    }

    resetForm();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">
          {editingTransaction ? "Edit transaction" : "Add transaction"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex">
            <label className="self-center m-2">Title:</label>
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="flex">
            <label className="self-center m-2">Amount:</label>
            <Input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <label>Category:</label>

            <Select
              value={category}
              onValueChange={(value) => setCategory(value as Category)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Food">Food</SelectItem>
                <SelectItem value="Transport">Transport</SelectItem>
                <SelectItem value="Bills">Bills</SelectItem>
                <SelectItem value="Entertainment">Entertainment</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <label>Type:</label>

            <Select
              value={type}
              onValueChange={(value) => setType(value as TransactionType)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Expense">Expense</SelectItem>
                <SelectItem value="Income">Income</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full">
            {editingTransaction ? "Update transaction" : "Add transaction"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default AddTransactionForm;
