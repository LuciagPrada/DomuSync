"use client"

import { useState } from "react"
import { Bot, Send, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

// Datos de ejemplo para las sugerencias
const suggestions = [
  "¿Qué podemos cocinar hoy con los ingredientes que tenemos?",
  "Organiza nuestro fin de semana",
  "Crea una lista de tareas para la limpieza de primavera",
  "Sugiere actividades para niños en días de lluvia",
  "Planifica nuestra próxima reunión familiar",
]

// Datos de ejemplo para las conversaciones
const initialMessages = [
  {
    role: "assistant",
    content: "¡Hola! Soy tu asistente familiar. ¿En qué puedo ayudarte hoy?",
  },
]

export function AIAssistant() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Función para enviar un mensaje
  const sendMessage = () => {
    if (!input.trim()) return

    setIsLoading(true)

    // Añadir mensaje del usuario
    const userMessage = {
      role: "user",
      content: input,
    }

    setMessages([...messages, userMessage])
    setInput("")

    // Simular respuesta del asistente (en una aplicación real, aquí se llamaría a una API)
    setTimeout(() => {
      const assistantMessage = {
        role: "assistant",
        content: getSimulatedResponse(input),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1000)
  }

  // Función para simular respuestas del asistente
  const getSimulatedResponse = (message: string) => {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("cocinar") || lowerMessage.includes("receta") || lowerMessage.includes("comida")) {
      return "Basándome en los ingredientes típicos que suelen tener las familias, te sugiero preparar una pasta con verduras salteadas y pollo. Es rápido, nutritivo y le gusta a toda la familia. ¿Necesitas la receta detallada?"
    }

    if (lowerMessage.includes("fin de semana") || lowerMessage.includes("planes")) {
      return "Para este fin de semana, os recomiendo: \n\n- Sábado por la mañana: Visita al mercado local\n- Sábado por la tarde: Cine en familia o juegos de mesa\n- Domingo: Excursión al parque natural cercano con picnic\n\n¿Te gustaría que desarrolle alguna de estas ideas?"
    }

    if (lowerMessage.includes("niños") || lowerMessage.includes("actividades")) {
      return "Algunas actividades divertidas para niños en casa:\n\n1. Búsqueda del tesoro con pistas por toda la casa\n2. Taller de manualidades con materiales reciclados\n3. Preparar galletas o pizza juntos\n4. Construir un fuerte con sábanas y cojines\n5. Sesión de cuentacuentos con disfraces"
    }

    return "Entiendo. ¿Podrías darme más detalles para poder ayudarte mejor con eso?"
  }

  // Función para usar una sugerencia
  const useSuggestion = (suggestion: string) => {
    setInput(suggestion)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      <Card className="flex flex-col flex-1 border-teal-green">
        <CardHeader>
          <CardTitle className="text-primary-green">Asistente Familiar IA</CardTitle>
          <CardDescription>Tu asistente inteligente para organizar y facilitar la vida familiar</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex rounded-lg px-4 py-3",
                  message.role === "user"
                    ? "ml-auto bg-primary-green text-white max-w-[80%]"
                    : "bg-teal-green text-primary-green max-w-[80%]",
                )}
              >
                <div className="flex gap-3 w-full">
                  <span className="mt-0.5 flex-shrink-0">
                    {message.role === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                  </span>
                  <div className="whitespace-pre-line overflow-hidden">{message.content}</div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex rounded-lg px-4 py-3 bg-teal-green text-primary-green max-w-[80%]">
                <div className="flex gap-3">
                  <span className="mt-0.5">
                    <Bot className="h-5 w-5" />
                  </span>
                  <div className="flex items-center gap-1">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-primary-green"></div>
                    <div
                      className="h-2 w-2 animate-bounce rounded-full bg-primary-green"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="h-2 w-2 animate-bounce rounded-full bg-primary-green"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => useSuggestion(suggestion)}
                className="text-xs border-teal-green text-primary-green"
              >
                {suggestion}
              </Button>
            ))}
          </div>
          <div className="flex w-full items-center gap-2">
            <Input
              placeholder="Escribe tu mensaje..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage()
                }
              }}
              className="border-teal-green"
            />
            <Button
              size="icon"
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="bg-primary-green hover:bg-primary-green/90 text-white"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Enviar mensaje</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
