import Filter from "@/components/custom/Filter"
import GetOrdersModel from "@/types/getOrdersModel"
import { useMemo } from "react"

export default function ArtistFilter({
  data,
  values,
  onSelect,
}: {
  data: GetOrdersModel[]
  values: string[]
  onSelect: (values: string[]) => void
}) {
  const options = useMemo(() => {
    const orderWithArtists = data.filter((o) => o.artistId)

    const uniqueArtistIds = Array.from(
      new Set(orderWithArtists.map((o) => o.artistId!))
    )

    const result = uniqueArtistIds.map((n) => {
      return {
        label: orderWithArtists.find((o) => o.artistId === n)!.artistName!,
        value: n,
      }
    })

    result.sort((a, b) => a.label.localeCompare(b.label))

    return result
  }, [data])

  return (
    <Filter
      title="Artist"
      options={options}
      values={values}
      onSelect={onSelect}
    />
  )
}
