import { useState, useEffect } from "react";
import type {
  Category,
  Transaction,
  TransactionType,
} from "../types/Transaction";

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
    <form onSubmit={handleSubmit}>
      <h2 className="font-bold m-1">Add Transaction</h2>

      <div className="m-2">
        <label>Title:</label>
        <input
          className="border border-black ml-2 rounded-md"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="m-2">
        <label>Amount:</label>
        <input
          className="border border-black ml-2 rounded-md"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <select
        className="border border-black ml-2 rounded-md p-1"
        value={category}
        onChange={(e) => setCategory(e.target.value as Category)}
      >
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Bills">Bills</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Other">Other</option>
      </select>

      <select
        className="border border-black ml-2 rounded-md p-1"
        value={type}
        onChange={(e) => setType(e.target.value as TransactionType)}
      >
        <option value="Expense">Expense</option>
        <option value="Income">Income</option>
      </select>

      <button className="border ml-2" type="submit">
        Add
      </button>
    </form>
  );
}

export default AddTransactionForm;
