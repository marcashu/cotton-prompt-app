import Filter from "@/components/custom/Filter"
import GetOrdersModel from "@/types/getOrdersModel"
import { useMemo } from "react"

export default function UserGroupFilter({
  data,
  values,
  onSelect,
}: {
  data: GetOrdersModel[]
  values: string[]
  onSelect: (values: string[]) => void
}) {
  const options = useMemo(() => {
    const uniqueUserGroupIds = Array.from(
      new Set(data.map((o) => o.userGroupId!))
    )

    const result = uniqueUserGroupIds.map((n) => {
      return {
        label: data.find((o) => o.userGroupId === n)!.userGroupName,
        value: n.toString(),
      }
    })

    result.sort((a, b) => a.label.localeCompare(b.label))

    return result
  }, [data])

  return (
    <Filter
      title="User Group"
      options={options}
      values={values}
      onSelect={onSelect}
    />
  )
}
