import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { amountSeparator } from "@/lib/amount-separator";
import EmptyTransactions from "@/components/prompts/empty-transactions";
import { MyActiveInvestment } from "@/types/my-investments.types";
import truncate from "@/lib/truncate";

type TableProps = {
  data: MyActiveInvestment["investments"];
  sign?: string;
  isEmpty: boolean;
};
export default function InvestmentTable(props: TableProps) {
  if (props.isEmpty) return <EmptyTransactions />;

  // const getProduct = async (id: number) => {
  //   try {
  //     const product = await getProductDetails({ productId: id });
  //     return product.name;
  //   } catch (error) {
  //     return "Unknown";
  //   }
  // };

  return (
    <Table>
      <TableHeader className="!bg-neutral-100/50">
        <TableRow className="caption-standard whitespace-nowrap !text-neutral-700 [&_th]:!text-center">
          <TableHead>Date & Time </TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Amount Invested</TableHead>
          <TableHead>Units Purchased</TableHead>
          <TableHead>Interest Accrued</TableHead>
          {/* <TableHead>Status</TableHead> */}
          {/* <TableHead>Action</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.data.map((item) => {
          const date = new Date(item.created_at);

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
              <TableCell className="capitalize" title={item?.product?.name}>
                {truncate(item?.product?.name ?? "", 20)}
              </TableCell>
              <TableCell>
                {props.sign} {amountSeparator(item.total_invested)}
              </TableCell>
              <TableCell>
                {props.sign} {amountSeparator(item.units_purchased)}
              </TableCell>

              <TableCell>
                {" "}
                {props.sign} {amountSeparator(item.interest_accrued)}
              </TableCell>
              {/* <TableCell>
                <TableActions id={item.id.toString()} />
              </TableCell> */}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
