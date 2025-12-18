"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"
import GetOrdersModel from "@/types/getOrdersModel"
import { TypographyMuted, TypographySmall } from "@/components/ui/typography"

const baseUrl = process.env.NEXT_PUBLIC_API_URL

export default function GlobalOrderSearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<GetOrdersModel[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const searchOrders = async () => {
      if (query.length < 2) {
        setResults([])
        setIsOpen(false)
        return
      }

      setIsLoading(true)
      try {
        const response = await fetch(`${baseUrl}/api/orders/search?orderNumber=${encodeURIComponent(query)}`)
        const data = await response.json()
        setResults(data)
        setIsOpen(true)
      } catch (error) {
        console.error("Search error:", error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(searchOrders, 300)
    return () => clearTimeout(debounceTimer)
  }, [query])

  const getStatusDisplay = (order: GetOrdersModel) => {
    if (order.customerStatus === "Accepted") {
      return order.artistStatus === "Completed" ? "Sent for Printing" : "Completed"
    }
    if (order.customerStatus === "ChangeRequested") return "Rejected"
    if (order.customerStatus) return order.customerStatus
    if (order.checkerStatus) return order.checkerStatus
    if (order.artistStatus) return order.artistStatus
    return "Ongoing"
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-sm">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search all orders..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && results.length > 0 && setIsOpen(true)}
          className="pl-8"
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
          {isLoading ? (
            <div className="p-3 text-center">
              <TypographyMuted>Searching...</TypographyMuted>
            </div>
          ) : results.length === 0 ? (
            <div className="p-3 text-center">
              <TypographyMuted>No orders found</TypographyMuted>
            </div>
          ) : (
            <ul className="py-1">
              {results.map((order) => (
                <li key={order.id}>
                  <Link
                    href={`/view-order/${order.id}`}
                    className="flex items-center justify-between px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setIsOpen(false)
                      setQuery("")
                    }}
                  >
                    <div className="flex flex-col">
                      <TypographySmall className="font-medium">
                        {order.orderNumber}
                      </TypographySmall>
                      <TypographyMuted className="text-xs">
                        {order.userGroupName} {order.artistName && `- ${order.artistName}`}
                      </TypographyMuted>
                    </div>
                    <TypographyMuted className="text-xs">
                      {getStatusDisplay(order)}
                    </TypographyMuted>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
