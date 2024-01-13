import { TypographyH3 } from "@/components/ui/typography"
import YourOrdersAsArtistDataTable from "./YourOrdersAsArtistDataTable"

export default function YourOrdersAsArtistSubPage({
  title,
  url,
}: {
  title: string
  url: string
}) {
  return (
    <div className="flex flex-col gap-4">
      <TypographyH3 withSeparator>{title}</TypographyH3>
      <YourOrdersAsArtistDataTable url={url} />
    </div>
  )
}
