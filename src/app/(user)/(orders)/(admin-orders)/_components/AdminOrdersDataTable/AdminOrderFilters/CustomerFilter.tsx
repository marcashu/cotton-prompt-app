import Filter from "@/components/custom/Filter"
import GetOrdersModel from "@/types/getOrdersModel"
import { useMemo } from "react"

export default function CustomerFilter({
  data,
  currentData,
  values,
  onSelect,
}: {
  data: GetOrdersModel[]
  currentData: GetOrdersModel[]
  values: string[]
  onSelect: (values: string[]) => void
}) {
  const options = useMemo(() => {
    const result = Array.from(new Set(data.map((o) => o.customerName)))
      .map((n) => ({
        label: n,
        value: n,
        count: currentData.filter((o) => o.customerName === n).length,
      }))
      .toSorted((a, b) => a.label.localeCompare(b.label))

    return result
  }, [currentData, data])

  return (
    <Filter
      title="Customer"
      options={options}
      values={values}
      onSelect={onSelect}
    />
  )
}
