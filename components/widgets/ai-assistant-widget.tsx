"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { MessageSquareText, ChevronRight } from "lucide-react"

export function AIAssistantWidget() {
  return (
    <Card className="border-teal-green">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <h3 className="text-sm font-semibold text-primary-green">Asistente IA</h3>
        <ChevronRight className="h-4 w-4 text-primary-green" />
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <MessageSquareText className="h-4 w-4 text-primary-green mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-primary-green">¿En qué puedo ayudarte hoy?</h3>
              <p className="text-xs text-muted-foreground">Pregúntame cualquier cosa sobre la organización familiar</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <MessageSquareText className="h-4 w-4 text-primary-green mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-primary-green">Sugerencias populares</h3>
              <p className="text-xs text-muted-foreground">
                Planificar comidas, organizar actividades, ideas para el fin de semana
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
