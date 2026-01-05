import type { Transaction } from "../types/Transaction";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
  if (transactions.length === 0) {
    return (
      <p className="text-muted-foreground text-sm text-2xl">
        No transactions yet.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {transactions.map((transaction) => (
        <Card key={transaction.id}>
          <CardContent className="flex items-center justify-between p-4">
            {/* LEFT SIDE: info */}
            <div className="space-y-1">
              <p className="font-medium">{transaction.title}</p>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{transaction.category}</span>
                <span>•</span>
                <span>{transaction.createdAt.toLocaleString()}</span>
              </div>
            </div>

            {/* RIGHT SIDE: amount + actions */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p
                  className={`font-semibold ${
                    transaction.type === "Income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type === "Income" ? "+" : "-"}$
                  {transaction.amount}
                </p>

                <Badge
                  variant={
                    transaction.type === "Income" ? "default" : "destructive"
                  }
                >
                  {transaction.type}
                </Badge>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEditTransaction(transaction)}
                >
                  Edit
                </Button>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDeleteTransaction(transaction.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default TransactionList;
