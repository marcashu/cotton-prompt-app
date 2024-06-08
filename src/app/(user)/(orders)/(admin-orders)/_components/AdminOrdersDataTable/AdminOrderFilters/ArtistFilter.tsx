import Filter from "@/components/custom/Filter"
import GetOrdersModel from "@/types/getOrdersModel"
import { useMemo } from "react"

export default function ArtistFilter({
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
    const orderWithArtists = data.filter((o) => o.artistId)

    const uniqueArtistIds = Array.from(
      new Set(orderWithArtists.map((o) => o.artistId!))
    )

    const result = uniqueArtistIds
      .map((n) => {
        return {
          label: orderWithArtists.find((o) => o.artistId === n)!.artistName!,
          value: n,
          count: currentData.filter((o) => o.artistId === n).length,
        }
      })
      .toSorted((a, b) => a.label.localeCompare(b.label))

    return result
  }, [currentData, data])

  return (
    <Filter
      title="Artist"
      options={options}
      values={values}
      onSelect={onSelect}
    />
  )
}
