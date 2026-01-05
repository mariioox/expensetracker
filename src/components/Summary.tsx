import type { Transaction } from "../types/Transaction";

type Props = {
  transactions: Transaction[];
};

function Summary({ transactions }: Props) {
  const income = transactions
    .filter((transaction) => transaction.type === "Income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const expense = transactions
    .filter((transaction) => transaction.type === "Expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const balance = income - expense;

  return (
    <div>
      <h2 className="font-bold m-1">Summary</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <div>
          <strong style={{ color: "green" }}>Income:</strong> ${income}
        </div>
        <div>
          <strong style={{ color: "red" }}>Expense:</strong> ${expense}
        </div>
        <div>
          <strong>Balance:</strong> ${balance}
        </div>
      </div>
    </div>
  );
}

export default Summary;
