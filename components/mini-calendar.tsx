"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { es } from "date-fns/locale"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

export function MiniCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Card className="border-teal-green">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-primary-green">Calendario</CardTitle>
          <Link href="/calendario" className="flex items-center text-xs text-primary-green hover:underline">
            Ver más <ChevronRight className="h-3 w-3 ml-1" />
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border-0"
          locale={es}
          modifiers={{
            event: (date) => {
              // Ejemplo de días con eventos
              const eventDays = [10, 15, 20, 25]
              return eventDays.includes(date.getDate())
            },
          }}
          modifiersClassNames={{
            event: "bg-light-green font-bold text-primary-green",
          }}
          classNames={{
            day_selected: "bg-primary-green text-white hover:bg-primary-green hover:text-white",
            day_today: "bg-teal-green text-primary-green",
            day: "text-primary-green hover:bg-teal-green hover:text-primary-green",
            head_cell: "text-primary-green",
            caption: "text-primary-green",
            nav_button: "text-primary-green hover:bg-teal-green hover:text-primary-green",
            table: "font-opensans",
          }}
        />
      </CardContent>
    </Card>
  )
}
