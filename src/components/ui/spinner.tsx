import { cn } from "@/lib/utils"
import { Icons } from "./icons"

export default function Spinner({ className }: { className?: string }) {
  return (
    <Icons.spinner className={cn("h-4 w-4 animate-spin m-auto", className)} />
  )
}
