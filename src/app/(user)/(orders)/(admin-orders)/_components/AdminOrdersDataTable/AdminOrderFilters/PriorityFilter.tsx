import Filter from "@/components/custom/Filter"
import FilterOption from "@/types/filterOption"
import GetOrdersModel from "@/types/getOrdersModel"
import { useMemo } from "react"

export default function PriorityFilter({
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

    const options: FilterOption[] = [
      {
        label: "Yes",
        value: "Yes",
        count: data.filter((o) => o.priority).length,
      },
      {
        label: "No",
        value: "No",
        count: data.filter((o) => !o.priority).length,
      },
    ]

    return options
  }, [data])

  return (
    <Filter
      title="Priority"
      options={options}
      values={values}
      onSelect={onSelect}
    />
  )
}
