"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ChevronRight, Newspaper } from "lucide-react"

// Datos de ejemplo
const parentingNews = [
  {
    id: 1,
    title: "Actividades para estimular la creatividad",
    source: "Crianza Positiva",
    date: "Hoy",
  },
  {
    id: 2,
    title: "Cómo manejar las rabietas de forma efectiva",
    source: "Psicología Infantil",
    date: "Ayer",
  },
  {
    id: 3,
    title: "Recetas saludables para niños quisquillosos",
    source: "Nutrición Familiar",
    date: "Hace 3 días",
  },
]

export function ParentingNews() {
  return (
    <Card className="border-teal-green">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-primary-green">Novedades</CardTitle>
          <Link href="/novedades" className="flex items-center text-xs text-primary-green hover:underline">
            Ver más <ChevronRight className="h-3 w-3 ml-1" />
          </Link>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-3">
          {parentingNews.map((news) => (
            <div key={news.id} className="flex items-start gap-2">
              <Newspaper className="h-4 w-4 text-primary-green mt-0.5" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-primary-green">{news.title}</h3>
                <p className="text-xs text-muted-foreground">{news.source}</p>
                <p className="text-xs text-muted-foreground mt-1">{news.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
