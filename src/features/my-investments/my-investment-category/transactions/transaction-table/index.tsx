import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { amountSeparator } from "@/lib/amount-separator";
import TableActions from "./table-actions";
import EmptyTransactions from "@/components/prompts/empty-transactions";
import classNames from "classnames";
import { MyInvestmentTransactions } from "@/types/my-investments.types";

type TableProps = {
  data: MyInvestmentTransactions[];
  sign?: string;
  isEmpty: boolean;
};
export default function TransactionTable(props: TableProps) {
  if (props.isEmpty) return <EmptyTransactions />;

  return (
    <Table>
      <TableHeader className="!bg-neutral-100/50">
        <TableRow className="caption-standard whitespace-nowrap !text-neutral-700 [&_th]:!text-center">
          <TableHead>Date & Time </TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Transaction Type</TableHead>
          <TableHead>Charges</TableHead>
          {/* <TableHead>Unit Price</TableHead>
          <TableHead>Units</TableHead> */}
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.data.map((item) => {
          const date = new Date(item.created_at);
          const statusClx = classNames("capitalize", {
            "text-success-200": item.status === "success",
            "text-primary-500": item.status === "pending",
            "text-error-200": item.status === "failed",
          });
          return (
            <TableRow
              key={item.id}
              className="caption-standard whitespace-nowrap text-center !text-neutral-700"
            >
              <TableCell>
                {date.toLocaleDateString("en-us", {
                  dateStyle: "medium",
                })}{" "}
                {date.toLocaleTimeString("en-us", {
                  timeStyle: "short",
                })}
              </TableCell>
              <TableCell>
                {props.sign} {amountSeparator(item.amount)}
              </TableCell>
              <TableCell className="capitalize">
                {item.transaction_type}
              </TableCell>
              <TableCell className="text-error-200">
                {props.sign} {amountSeparator(item.fee)}
              </TableCell>

              {/* <TableCell className="text-error-200">
                {props.sign} {amountSeparator(item.fee)}
              </TableCell>

              <TableCell className="text-error-200">
                {props.sign} {amountSeparator(item.fee)}
              </TableCell> */}
              <TableCell className={statusClx}>{item.status}</TableCell>
              <TableCell>
                <TableActions id={item.id.toString()} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
