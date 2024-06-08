import Filter from "@/components/custom/Filter"
import FilterOption from "@/types/filterOption"
import GetOrdersModel from "@/types/getOrdersModel"

export default function PriorityFilter({
  values,
  onSelect,
}: {
  values: string[]
  onSelect: (values: string[]) => void
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

  return (
    <Filter
      title="Priority"
      options={options}
      values={values}
      onSelect={onSelect}
    />
  )
}
