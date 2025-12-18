import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function Main({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("pb-4", className)}>
      <Card className="container max-w-[95rem] py-6 shadow">{children}</Card>
    </div>
  )
}
