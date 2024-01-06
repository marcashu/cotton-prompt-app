import { getDesignBrackets } from "@/components/modules/settings/design-bracket/designBracketService"
import { TypographyH3, TypographyH4 } from "@/components/ui/typography"
import DesignBracketItem from "@/components/modules/settings/design-bracket/DesignBracketItem"
import DesignBracketDisabledItem from "@/components/modules/settings/design-bracket/DesignBracketDisabledItem"
import DesignBracketCreate from "@/components/modules/settings/design-bracket/DesignBracketCreate"

export default async function DesignBrackets() {
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
            leftId={i > 0 ? activeBrackets.at(i - 1)?.id : undefined}
            rightId={
              i < activeBrackets.length - 1
                ? activeBrackets.at(i + 1)?.id
                : undefined
            }
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
