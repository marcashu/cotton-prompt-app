import { Control } from "react-hook-form"
import { OrderFormValues } from "./orderFormSchema"
import { SelectItem } from "@/components/ui/select"
import useSWR from "swr"
import GetUserGroupModel from "@/types/getUserGroupModel"
import Select from "@/components/custom/Select"
import { toast } from "@/components/ui/use-toast"
import { useEffect } from "react"

export default function AuthorSelect({
  control,
  className,
}: {
  control: Control<OrderFormValues>
  className?: string
}) {
  const { data, isLoading } = useSWR<GetUserGroupModel>(
    "/api/UserGroups/concept-authors"
  )

  return (
    <Select
      label="Author"
      control={control}
      name="authorId"
      className={className}
      placeholder="Select an author"
      loading={isLoading}
    >
      <SelectItem value="none">No author</SelectItem>
      {!!data &&
        data.users?.length > 0 &&
        data.users.map((user) => (
          <SelectItem key={user.id} value={user.id}>
            {user.name}
          </SelectItem>
        ))}
    </Select>
  )
}
