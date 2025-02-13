import GetInvoicesModel from "@/types/getInvoicesModel"
import PriorityFilter from "./PriorityFilter"
import ArtistFilter from "./ArtistFilter"

export default function InvoicesDataFilters({
  invoices,
  setInvoices,
  allInvoices,
}: {
  invoices: GetInvoicesModel[]
  setInvoices: (invoices: GetInvoicesModel[]) => void
  allInvoices: GetInvoicesModel[]
}) {
  return (
    <div className="flex w-full gap-2 items-center">
      <PriorityFilter
        values={invoices.map((invoice) => invoice.status)}
        onSelect={(values) => {
          setInvoices(
            allInvoices.filter((invoice) => values.includes(invoice.status))
          )
        }}
      />
      <ArtistFilter
        values={invoices.map((invoice) => invoice.user)}
        onSelect={(values) => {
          setInvoices(
            allInvoices.filter((invoice) => values.includes(invoice.user))
          )
        }}
        options={allInvoices
          .map((invoice) => invoice.user)
          .filter((value, index, self) => self.indexOf(value) === index)
          .map((user) => {
            return { label: user, value: user }
          })}
      />
    </div>
  )
}
