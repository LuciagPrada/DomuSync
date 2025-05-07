"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ClipboardList, ChevronRight, Clock } from "lucide-react"

// Datos de ejemplo
const upcomingTasks = [
  {
    id: 1,
    title: "Reunión de padres",
    time: "18:00",
    date: "Hoy",
  },
  {
    id: 2,
    title: "Comprar material escolar",
    time: "12:00",
    date: "Mañana",
  },
]

export function AgendaWidget() {
  return (
    <Card className="border-teal-green">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <h3 className="text-sm font-semibold text-primary-green">Agenda</h3>
        <ChevronRight className="h-4 w-4 text-primary-green" />
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-3">
          {upcomingTasks.map((task) => (
            <div key={task.id} className="flex items-start gap-2">
              <ClipboardList className="h-4 w-4 text-primary-green mt-0.5" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-primary-green">{task.title}</h3>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{task.time}</span>
                  <span>·</span>
                  <span>{task.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
