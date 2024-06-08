import Filter from "@/components/custom/Filter"
import FilterOption from "@/types/filterOption"
import GetOrdersModel from "@/types/getOrdersModel"
import { useMemo } from "react"

export default function PriorityFilter({
  currentData,
  values,
  onSelect,
}: {
  currentData: GetOrdersModel[]
  values: string[]
  onSelect: (values: string[]) => void
}) {
  const options = useMemo(() => {
    const options: FilterOption[] = [
      {
        label: "Yes",
        value: "Yes",
        count: currentData.filter((o) => o.priority).length,
      },
      {
        label: "No",
        value: "No",
        count: currentData.filter((o) => !o.priority).length,
      },
    ]

    return options
  }, [currentData])

  return (
    <Filter
      title="Priority"
      options={options}
      values={values}
      onSelect={onSelect}
    />
  )
}
