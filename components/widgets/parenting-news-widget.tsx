"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Newspaper, ChevronRight } from "lucide-react"

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
]

export function ParentingNewsWidget() {
  return (
    <Card className="border-teal-green">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <h3 className="text-sm font-semibold text-primary-green">Novedades</h3>
        <ChevronRight className="h-4 w-4 text-primary-green" />
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
