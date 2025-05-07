"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { FileText, ChevronRight } from "lucide-react"

// Datos de ejemplo
const latestNotes = [
  {
    id: 1,
    title: "Lista de compras",
    preview: "Leche, pan, huevos...",
    date: "Hace 2 días",
  },
  {
    id: 2,
    title: "Tareas pendientes",
    preview: "Llamar al fontanero, revisar facturas...",
    date: "Hace 3 días",
  },
]

export function LatestNotesWidget() {
  return (
    <Card className="border-teal-green">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <h3 className="text-sm font-semibold text-primary-green">Notas</h3>
        <ChevronRight className="h-4 w-4 text-primary-green" />
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-3">
          {latestNotes.map((note) => (
            <div key={note.id} className="flex items-start gap-2">
              <FileText className="h-4 w-4 text-primary-green mt-0.5" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-primary-green">{note.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-1">{note.preview}</p>
                <p className="text-xs text-muted-foreground mt-1">{note.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
