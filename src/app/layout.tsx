import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import Providers from "@/app/_components/Providers"
import Header from "@/app/_components/Header"
import Main from "@/app/_components/Main"
import { Toaster } from "@/components/ui/toaster"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Cotton Prompt",
  description: "Platform for Cotton Prompt",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <Header />
          <Main>{children}</Main>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
