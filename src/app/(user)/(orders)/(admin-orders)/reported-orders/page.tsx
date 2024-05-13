import { TypographyH2 } from "@/components/ui/typography"
import AdminOrdersDataTable from "../_components/AdminOrdersDataTable"
import AdminStatus from "@/enums/adminStatus"

export default function ReportedOrders() {
  return (
    <div className="flex flex-col gap-4">
      <TypographyH2 withSeparator>Reported Orders</TypographyH2>
      <AdminOrdersDataTable adminStatus={AdminStatus.Reported} />
    </div>
  )
}
