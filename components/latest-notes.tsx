"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ChevronRight, FileText } from "lucide-react"

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
  {
    id: 3,
    title: "Receta de tarta",
    preview: "3 manzanas, 200g de harina...",
    date: "Hace 1 semana",
  },
]

export function LatestNotes() {
  return (
    <Card className="border-teal-green">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-primary-green">Últimas notas</CardTitle>
          <Link href="/notas" className="flex items-center text-xs text-primary-green hover:underline">
            Ver más <ChevronRight className="h-3 w-3 ml-1" />
          </Link>
        </div>
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
