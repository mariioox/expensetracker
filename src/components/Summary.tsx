import type { Transaction } from "../types/Transaction";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Summary</CardTitle>
        </CardHeader>

        <CardContent className="grid grid-cols-3">
          <div>
            <strong style={{ color: "green" }}>Income:</strong> ${income}
          </div>
          <div>
            <strong style={{ color: "red" }}>Expense:</strong> ${expense}
          </div>
          <div>
            <strong>Balance:</strong> ${balance}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Summary;
