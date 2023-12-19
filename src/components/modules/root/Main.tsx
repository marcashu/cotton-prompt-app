import { Card } from "@/components/ui/card"

export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <div className="pb-4">
      <Card className="container py-6 shadow">{children}</Card>
    </div>
  )
}
