import Filter from "@/components/custom/Filter"
import ArtistStatus from "@/enums/artistStatus"
import CheckerStatus from "@/enums/checkerStatus"
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
      label: ArtistStatus.Claimed,
      value: `ArtistStatus-${ArtistStatus.Claimed}`,
      group: "Artist Status",
    },
    {
      label: ArtistStatus.DesignSubmitted,
      value: `ArtistStatus-${ArtistStatus.DesignSubmitted}`,
      group: "Artist Status",
    },
    {
      label: ArtistStatus.ForReupload,
      value: `ArtistStatus-${ArtistStatus.ForReupload}`,
      group: "Artist Status",
    },
    {
      label: ArtistStatus.Completed,
      value: `ArtistStatus-${ArtistStatus.Completed}`,
      group: "Artist Status",
    },
    {
      label: CheckerStatus.Claimed,
      value: `CheckerStatus-${CheckerStatus.Claimed}`,
      group: "Checker Status",
    },
    {
      label: CheckerStatus.ForReview,
      value: `CheckerStatus-${CheckerStatus.ForReview}`,
      group: "Checker Status",
    },
    {
      label: CheckerStatus.ReuploadRequested,
      value: `CheckerStatus-${CheckerStatus.ReuploadRequested}`,
      group: "Checker Status",
    },
    {
      label: CheckerStatus.Approved,
      value: `CheckerStatus-${CheckerStatus.Approved}`,
      group: "Checker Status",
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
