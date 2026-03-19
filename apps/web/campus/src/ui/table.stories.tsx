import type { TypedMetaOptions } from "@/integrations/storybook/sb.types";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/table";
import { cn } from "@/utils/cn";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

function TableDemo() {
  return (
    <Table className={cn(`border-primary-400 dark:border-primary-600 border`)}>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow
          className={cn(
            `bg-primary-100 dark:bg-primary-50 border-primary-400 dark:border-primary-600`,
          )}
        >
          <TableHead className={cn(`w-25`)}>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className={cn(`text-right`)}>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow
            key={invoice.invoice}
            className={cn(`border-primary-400 dark:border-primary-600`)}
          >
            <TableCell className={cn("font-medium")}>
              {invoice.invoice}
            </TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className={cn("text-right")}>
              {invoice.totalAmount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter className={cn(`border-primary-400 dark:border-primary-600`)}>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className={cn("text-right")}>$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

const meta: Meta<typeof TableDemo> & TypedMetaOptions = {
  component: TableDemo,
};

export default meta;

type Story = StoryObj<typeof TableDemo>;

export const TableDemoStory: Story = {
  args: {},
};
