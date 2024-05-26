"use client"

import Tiptap from "@/components/custom/Tiptap"
import { useState } from "react"
import { updateOrderProof } from "../../_lib/emailTemplatesActions"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function EmailTemplatesForm({
  value: initialValue,
}: {
  value: string
}) {
  const [error, setError] = useState(false)
  const [value, setValue] = useState(initialValue)
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const handleChange = (newValue: string) => {
    if (newValue.includes("{link}")) {
      setValue(newValue)
      setError(false)
    } else {
      setError(true)
    }
  }

  const handleSave = () => {
    setLoading(true)

    updateOrderProof(value)
      .then(() =>
        toast({
          title: "Email Template has been saved successfully",
          description: new Date().toLocaleString(),
        })
      )
      .finally(() => setLoading(false))
  }

  return (
    <div>
      <Tiptap value={initialValue} onChange={handleChange} />
      {error && (
        <p className="text-sm font-medium text-destructive mt-2">
          {
            "Email should contain {link} as placeholder for the order proof URL."
          }
        </p>
      )}
      <Button
        className="mt-4"
        onClick={handleSave}
        loading={loading}
        disabled={error}
      >
        Save
      </Button>
    </div>
  )
}
