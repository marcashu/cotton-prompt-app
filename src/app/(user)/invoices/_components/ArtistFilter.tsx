import Filter from "@/components/custom/Filter"
import FilterOption from "@/types/filterOption"

export default function ArtistFilter({
  values,
  onSelect,
  options,
}: {
  values: string[]
  onSelect: (values: string[]) => void
  options: FilterOption[]
}) {
  return (
    <Filter
      title="Artist"
      options={options}
      values={values}
      onSelect={onSelect}
    />
  )
}
