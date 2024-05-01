import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

export default function ResendForCustomerReviewAction({
  id,
  onResend,
}: {
  id: number
  onResend: (id: number) => void
}) {
  return (
    <DropdownMenuItem className="cursor-pointer" onClick={() => onResend(id)}>
      Resend for Customer Review
    </DropdownMenuItem>
  )
}
