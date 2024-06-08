import Filter from "@/components/custom/Filter"
import GetOrdersModel from "@/types/getOrdersModel"
import { useMemo } from "react"

export default function OrderNumberFilter({
  data,
  values,
  onSelect,
}: {
  data?: GetOrdersModel[]
  values: string[]
  onSelect: (values: string[]) => void
}) {
  const options = useMemo(() => {
    if (!data) return []

    const uniqueOrderNumbers = Array.from(
      new Set(
        data
          .toSorted((a, b) => a.orderNumber.localeCompare(b.orderNumber))
          .map((o) => o.orderNumber)
      )
    )

    const result = uniqueOrderNumbers.map((n) => ({
      label: n,
      value: n,
      count: 0,
    }))

    return result
  }, [data])

  return (
    <Filter
      title="Order Number"
      options={options}
      values={values}
      onSelect={onSelect}
    />
  )
}
