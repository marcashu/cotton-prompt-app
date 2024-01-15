"use client"

import { SWRConfig } from "swr"
import TeamsSessionProvider from "./TeamsSessionProvider"
import SessionProvider from "./SessionProvider"

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <TeamsSessionProvider>
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
      </TeamsSessionProvider>
    </SessionProvider>
  )
}
