import Filter from "@/components/custom/Filter"
import FilterOption from "@/types/filterOption"
import GetOrdersModel from "@/types/getOrdersModel"
import OrderFiltersModel from "@/types/orderFiltersModel"
import { SetStateAction, useMemo } from "react"

export default function PriorityFilter({
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
