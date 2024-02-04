"use client"

import { Check, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import GetUsersModel from "@/types/getUsersModel"
import Spinner from "@/components/ui/spinner"

export function UsersComboBox({
  data,
  value,
  loading,
  onChange,
}: {
  data: GetUsersModel[]
  value: string
  loading: boolean
  onChange: (value: string) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={loading}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between font-normal"
        >
          <div className="flex items-center gap-2">
            {loading ? (
              <>
                <Spinner className="m-0" /> Fetching users...
              </>
            ) : value ? (
              data.find((u) => u.id === value)?.name
            ) : (
              "Select User"
            )}
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command
          filter={(value, search) => {
            const user = data.find((u) => u.id === value)
            if (
              user?.name
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase())
            )
              return 1
            return 0
          }}
        >
          <CommandInput placeholder="Search user..." />
          <CommandList>
            <CommandEmpty>No user found.</CommandEmpty>
            {data.map((u) => (
              <CommandItem
                key={u.id}
                value={u.id}
                onSelect={(currentValue) => {
                  onChange(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === u.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {u.name}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
