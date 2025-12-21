import { TypographyH2 } from "@/components/ui/typography"
import AdminOrdersDataTable from "../_components/AdminOrdersDataTable"
import AdminStatus from "@/enums/adminStatus"

export default function OngoingOrdersPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex justify-between">
        <TypographyH2 withSeparator>Ongoing Orders</TypographyH2>
        <div className="flex gap-4">
          <p className="text-sm">🟠 Orange - In Review</p>
          <p className="text-sm">🟢 Green - Customer Accepted</p>
          <p className="text-sm">🔴 Red - Change Requested</p>
          <p className="text-sm">🔵 Blue - Not Taken</p>
        </div>
      </div>
      <AdminOrdersDataTable adminStatus={AdminStatus.Ongoing} />
    </div>
  )
}
