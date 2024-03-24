import { DataTable } from "@/components/ui/data-table"
import { TypographyMuted, TypographySmall } from "@/components/ui/typography"
import { formatNumberToCurrency } from "@/helpers/numberHelper"
import GetInvoiceSectionModel from "@/types/getInvoiceSectionModel"
import { ColumnDef } from "@tanstack/react-table"

export default function InvoiceSectionsDataTable({
  data,
  isLoading,
}: {
  data: GetInvoiceSectionModel[]
  isLoading: boolean
}) {
  return (
    <DataTable columns={columnDef} data={data ?? []} isLoading={isLoading} />
  )
}

const columnDef: ColumnDef<GetInvoiceSectionModel>[] = [
  {
    header: "Item",
    cell: ({ row }) => {
      const section = row.original
      return (
        <div className="flex flex-col gap-2">
          <TypographySmall className="font-bold">
            {section.name}
          </TypographySmall>
          <TypographyMuted>{section.orderNumbers.join(", ")}</TypographyMuted>
        </div>
      )
    },
  },
  {
    accessorKey: "quantity",
    header: () => <div className="text-right">Quantity</div>,
    cell: ({ row }) => {
      const section = row.original
      return (
        <TypographySmall className="font-normal float-right">
          {section.quantity}
        </TypographySmall>
      )
    },
  },
  {
    accessorKey: "rate",
    header: () => <div className="text-right">Rate</div>,
    cell: ({ row }) => {
      const section = row.original
      return (
        <TypographySmall className="font-normal float-right">
          {formatNumberToCurrency(section.rate)}
        </TypographySmall>
      )
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const section = row.original
      return (
        <TypographySmall className="font-normal float-right">
          {formatNumberToCurrency(section.amount)}
        </TypographySmall>
      )
    },
  },
]
