import { TypographyH2 } from "@/components/ui/typography"
import AdminOrdersDataTable from "../_components/AdminOrdersDataTable"
import AdminStatus from "@/enums/adminStatus"

export default function AllOrdersPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex justify-between">
        <TypographyH2 withSeparator>All Orders</TypographyH2>
        <div className="flex gap-4 flex-wrap">
          <p className="text-sm">🟠 Orange - In Review</p>
          <p className="text-sm">🟢 Green - Customer Accepted</p>
          <p className="text-sm">🔴 Red - Change Requested</p>
          <p className="text-sm">🔵 Blue - Not Taken</p>
        </div>
      </div>
      <AdminOrdersDataTable adminStatus={AdminStatus.All} />
    </div>
  )
}
