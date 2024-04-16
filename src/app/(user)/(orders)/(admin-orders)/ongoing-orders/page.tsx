import { TypographyH2 } from "@/components/ui/typography"
import AdminOrdersDataTable from "../_components/AdminOrdersDataTable"

export default function OngoingOrdersPage() {
  return (
    <div className="flex flex-col gap-4">
      <TypographyH2 withSeparator>Ongoing Orders</TypographyH2>
      <AdminOrdersDataTable isOngoing={true} />
    </div>
  )
}
