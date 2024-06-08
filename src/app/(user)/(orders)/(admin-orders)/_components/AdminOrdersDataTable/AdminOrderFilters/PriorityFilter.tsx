import Filter from "@/components/custom/Filter"
import FilterOption from "@/types/filterOption"
import OrderFiltersModel from "@/types/orderFiltersModel"
import { SetStateAction } from "react"

export default function PriorityFilter({
  values,
  onSelect,
}: {
  values: string[]
  onSelect: (value: SetStateAction<OrderFiltersModel>) => void
}) {
  const options: FilterOption[] = [
    {
      label: "Yes",
      value: "Yes",
    },
    {
      label: "No",
      value: "No",
    },
  ]

  const handlePrioritiesSelect = (priorities: string[]) => {
    onSelect((prevValues) => ({
      ...prevValues,
      priorities,
    }))
  }

  return (
    <Filter
      title="Priority"
      options={options}
      values={values}
      onSelect={handlePrioritiesSelect}
    />
  )
}
