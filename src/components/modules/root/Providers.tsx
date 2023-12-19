"use client"

import { SWRConfig } from "swr"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher: (resource: string) =>
          fetch(`${process.env.NEXT_PUBLIC_API_URL}${resource}`, {
            cache: "no-store",
          }).then((res) => res.json()),
      }}
    >
      {children}
    </SWRConfig>
  )
}
