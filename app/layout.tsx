import type React from "react"
import type { Metadata } from "next"
import { Open_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-opensans",
})

export const metadata: Metadata = {
  title: "DomuSync - Aplicación Familiar",
  description: "Calendario, agenda, notas e IA compartidos con toda la familia",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${openSans.className} font-opensans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
