import { getPrintColors } from "@/app/settings/print-colors/_lib/printColorService"
import { TypographyH3, TypographyH4 } from "@/components/ui/typography"
import PrintColorItem from "@/app/settings/print-colors/_components/PrintColorItem"
import PrintColorDisabledItem from "@/app/settings/print-colors/_components/PrintColorDisabledItem"
import PrintColorCreate from "@/app/settings/print-colors/_components/PrintColorCreate"

export default async function PrintColorsPage() {
  const activePrintColorsData = getPrintColors(true, true)
  const inactivePrintColorsData = getPrintColors(true, false)
  const [activePrintColors, inactivePrintColors] = await Promise.all([
    activePrintColorsData,
    inactivePrintColorsData,
  ])

  return (
    <div className="px-8 max-w-3xl">
      <TypographyH3 withSeparator>Print Colors</TypographyH3>
      <ul className=" space-y-2 py-4">
        {activePrintColors.map((db, i) => (
          <PrintColorItem
            key={db.id}
            data={db}
            {...(i > 0 && {
              leftId: activePrintColors[i - 1].id,
            })}
            {...(i < activePrintColors.length - 1 && {
              rightId: activePrintColors[i + 1].id,
            })}
          />
        ))}
      </ul>
      <PrintColorCreate />
      {inactivePrintColors.length > 0 && (
        <>
          <TypographyH4 className="mt-4">Disabled</TypographyH4>
          <ul className=" space-y-2 py-4">
            {inactivePrintColors.map((ib) => (
              <PrintColorDisabledItem key={ib.id} data={ib} />
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
