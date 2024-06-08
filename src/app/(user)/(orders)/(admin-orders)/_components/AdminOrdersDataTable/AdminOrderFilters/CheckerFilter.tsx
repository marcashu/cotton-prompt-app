import Filter from "@/components/custom/Filter"
import GetOrdersModel from "@/types/getOrdersModel"
import { useMemo } from "react"

export default function CheckerFilter({
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
    const orderWithCheckers = data.filter((o) => o.checkerId)

    const uniqueCheckerIds = Array.from(
      new Set(orderWithCheckers.map((o) => o.checkerId!))
    )

    const result = uniqueCheckerIds
      .map((n) => {
        return {
          label: orderWithCheckers.find((o) => o.checkerId === n)!.checkerName!,
          value: n,
          count: currentData.filter((o) => o.checkerId === n).length,
        }
      })
      .toSorted((a, b) => a.label.localeCompare(b.label))

    return result
  }, [currentData, data])

  return (
    <Filter
      title="Checker"
      options={options}
      values={values}
      onSelect={onSelect}
    />
  )
}
