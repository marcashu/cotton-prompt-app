import Filter from "@/components/custom/Filter"
import GetOrdersModel from "@/types/getOrdersModel"
import OrderFiltersModel from "@/types/orderFiltersModel"
import { SetStateAction, useMemo } from "react"

export default function OrderNumberFilter({
  data,
  values,
  onSelect,
}: {
  data?: GetOrdersModel[]
  values: string[]
  onSelect: (value: SetStateAction<OrderFiltersModel>) => void
}) {
  const options = useMemo(() => {
    if (!data) return []

    const orderNumbers = Array.from(
      new Set(
        data
          .toSorted((a, b) => a.orderNumber.localeCompare(b.orderNumber))
          .map((o) => o.orderNumber)
          .map((n) => ({ label: n, value: n }))
      )
    )

    return orderNumbers
  }, [data])

  const handleOrderNumbersSelect = (orderNumbers: string[]) => {
    onSelect((prevValues) => ({
      ...prevValues,
      orderNumbers,
    }))
  }

  return (
    <Filter
      title="Order Number"
      options={options}
      values={values}
      onSelect={handleOrderNumbersSelect}
    />
  )
}
