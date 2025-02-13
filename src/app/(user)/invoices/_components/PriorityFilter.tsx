import Filter from "@/components/custom/Filter"
import FilterOption from "@/types/filterOption"

export default function StatusFilter({
  values,
  onSelect,
}: {
  values: string[]
  onSelect: (values: string[]) => void
}) {
  const options: FilterOption[] = [
    {
      label: "Ongoing",
      value: "Ongoing",
    },
    {
      label: "Completed",
      value: "Completed",
    },
  ]

  return (
    <Filter
      title="Status"
      options={options}
      values={values}
      onSelect={onSelect}
    />
  )
}
