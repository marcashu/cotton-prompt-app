import Filter from "@/components/custom/Filter"
import GetOrdersModel from "@/types/getOrdersModel"
import { useMemo } from "react"

export default function CustomerFilter({
  data,
  values,
  onSelect,
}: {
  data: GetOrdersModel[]
  values: string[]
  onSelect: (values: string[]) => void
}) {
  const options = useMemo(() => {
    const result = Array.from(new Set(data.map((o) => o.customerName)))
      .map((n) => ({
        label: n,
        value: n,
      }))
      .toSorted((a, b) => a.label.localeCompare(b.label))

    return result
  }, [data])

  return (
    <Filter
      title="Customer"
      options={options}
      values={values}
      onSelect={onSelect}
    />
  )
}
