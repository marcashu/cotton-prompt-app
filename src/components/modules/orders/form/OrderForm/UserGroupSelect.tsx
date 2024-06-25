import { Control } from "react-hook-form"
import { OrderFormValues } from "./orderFormSchema"
import { SelectItem } from "@/components/ui/select"
import useSWR from "swr"
import GetUserGroupsModel from "@/types/getUserGroupsModel"
import Select from "@/components/custom/Select"

export default function UserGroupSelect({
  control,
  className,
}: {
  control: Control<OrderFormValues>
  className?: string
}) {
  const { data, isLoading } = useSWR<GetUserGroupsModel[]>(
    "/api/UserGroups/artist-groups"
  )

  return (
    <Select
      label="User Group"
      control={control}
      name="userGroupId"
      className={className}
      placeholder="Select a user group"
      loading={isLoading}
    >
      {!!data &&
        data?.length > 0 &&
        data.map((item) => (
          <SelectItem key={item.id} value={item.id.toString()}>
            {item.name}
          </SelectItem>
        ))}
    </Select>
  )
}
