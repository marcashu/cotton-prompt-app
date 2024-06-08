import Filter from "@/components/custom/Filter"
import GetOrdersModel from "@/types/getOrdersModel"
import { useMemo } from "react"

export default function CheckerFilter({
  data,
  values,
  onSelect,
}: {
  data: GetOrdersModel[]
  values: string[]
  onSelect: (values: string[]) => void
}) {
  const options = useMemo(() => {
    const orderWithCheckers = data.filter((o) => o.checkerId)

    const uniqueCheckerIds = Array.from(
      new Set(orderWithCheckers.map((o) => o.checkerId!))
    )

    const result = uniqueCheckerIds.map((n) => {
      return {
        label: orderWithCheckers.find((o) => o.checkerId === n)!.checkerName!,
        value: n,
      }
    })

    result.sort((a, b) => a.label.localeCompare(b.label))

    return result
  }, [data])

  return (
    <Filter
      title="Checker"
      options={options}
      values={values}
      onSelect={onSelect}
    />
  )
}
