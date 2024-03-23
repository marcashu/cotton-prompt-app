import { TypographyH2 } from "@/components/ui/typography";
import InvoicesDataTable from "./_components/InvoicesDataTable";

export default async function InvoicesPage() {
  return (
    <div className="flex flex-col gap-4">
      <TypographyH2>Invoices</TypographyH2>
      <InvoicesDataTable />
    </div>
  )
}