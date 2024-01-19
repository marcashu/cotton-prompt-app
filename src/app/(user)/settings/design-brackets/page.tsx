import { getDesignBrackets } from "./_lib/designBracketService"
import { TypographyH3, TypographyH4 } from "@/components/ui/typography"
import DesignBracketItem from "./_components/DesignBracketItem"
import DesignBracketDisabledItem from "./_components/DesignBracketDisabledItem"
import DesignBracketCreate from "./_components/DesignBracketCreate"

export default async function DesignBracketsPage() {
  const activeBracketsData = getDesignBrackets(true, true)
  const inactiveBracketsData = getDesignBrackets(true, false)
  const [activeBrackets, inactiveBrackets] = await Promise.all([
    activeBracketsData,
    inactiveBracketsData,
  ])

  return (
    <div className="px-8 max-w-3xl">
      <TypographyH3 withSeparator>Design Brackets</TypographyH3>
      <ul className=" space-y-2 py-4">
        {activeBrackets.map((db, i) => (
          <DesignBracketItem
            key={db.id}
            data={db}
            {...(i > 0 && {
              leftId: activeBrackets[i - 1].id,
            })}
            {...(i < activeBrackets.length - 1 && {
              rightId: activeBrackets[i + 1].id,
            })}
          />
        ))}
      </ul>
      <DesignBracketCreate />
      {inactiveBrackets.length > 0 && (
        <>
          <TypographyH4 className="mt-4">Disabled</TypographyH4>
          <ul className=" space-y-2 py-4">
            {inactiveBrackets.map((ib) => (
              <DesignBracketDisabledItem key={ib.id} data={ib} />
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
