import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { FormEvent, createRef } from "react"

export default function AdminOrderFilters({
  onSearch,
}: {
  onSearch: (orderNumber?: string) => void
}) {
  const inputRef = createRef<HTMLInputElement>()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSearch(inputRef.current?.value)
  }

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Enter order number"
          className="pl-8"
          ref={inputRef}
        />
      </div>
      <Button variant="outline">Search</Button>
    </form>
  )
}
