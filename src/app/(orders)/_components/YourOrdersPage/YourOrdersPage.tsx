import { TypographyH3 } from "@/components/ui/typography"
import YourOrdersDataTable from "./YourOrdersDataTable"

export default function YourOrdersPage({
  title,
  url,
}: {
  title: string
  url: string
}) {
  return (
    <div className="flex flex-col gap-4">
      <TypographyH3 withSeparator>{title}</TypographyH3>
      <YourOrdersDataTable url={url} />
    </div>
  )
}
