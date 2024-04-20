import { TypographyH2 } from "@/components/ui/typography"
import AdminOrdersDataTable from "../_components/AdminOrdersDataTable"

export default function CompletedOrdersPage() {
  return (
    <div className="flex flex-col gap-4">
      <TypographyH2 withSeparator>Completed Orders</TypographyH2>
      <AdminOrdersDataTable adminStatus="completed" />
    </div>
  )
}
