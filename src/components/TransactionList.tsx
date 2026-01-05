import type { Transaction } from "../types/Transaction";

type Props = {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
  onEditTransaction: (transaction: Transaction) => void;
};

function TransactionList({
  transactions,
  onDeleteTransaction,
  onEditTransaction,
}: Props) {
  return (
    <div className="m-1">
      <ul>
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: transaction.type === "Income" ? "green" : "red",
            }}
          >
            <div className="m-1">
              <span className="self-center m-5">
                {transaction.title} ({transaction.category})
              </span>
              <span className="self-center m-5">
                {transaction.type === "Income" ? "+" : "-"}${transaction.amount}
              </span>
              <span className="self-center m-5">
                {transaction.createdAt.toLocaleString()}
              </span>
              <button
                className="border"
                onClick={() => onDeleteTransaction(transaction.id)}
              >
                Delete
              </button>
              <button
                className="border"
                onClick={() => onEditTransaction(transaction)}
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;
