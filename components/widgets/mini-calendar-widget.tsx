"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isToday,
  getDay,
} from "date-fns"
import { es } from "date-fns/locale"

// Añadir los datos de ejemplo de tareas (simplificados de initialTasks)
const initialTasks = [
  {
    id: 1,
    title: "Reunión de padres",
    date: new Date(2025, 4, 15),
  },
  {
    id: 2,
    title: "Comprar material escolar",
    date: new Date(2025, 4, 10),
  },
  {
    id: 3,
    title: "Pagar facturas",
    date: new Date(2025, 4, 8),
  },
  {
    id: 4,
    title: "Llevar el coche al taller",
    date: new Date(2025, 4, 9),
  },
  {
    id: 5,
    title: "Clase de natación - María",
    date: new Date(2025, 4, 12),
  },
  // Añadir tareas para el mes actual
  {
    id: 10,
    title: "Visita al dentista",
    date: new Date(),
  },
  {
    id: 11,
    title: "Partido de fútbol - Carlos",
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
  },
  {
    id: 12,
    title: "Compra semanal",
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
  },
  {
    id: 13,
    title: "Cita médica - María",
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
  },
  {
    id: 14,
    title: "Reparación lavadora",
    date: new Date(new Date().setDate(new Date().getDate() + 3)),
  },
  {
    id: 15,
    title: "Clase de piano - Carlos",
    date: new Date(new Date().setDate(new Date().getDate() + 3)),
  },
  {
    id: 16,
    title: "Reunión de vecinos",
    date: new Date(new Date().setDate(new Date().getDate() + 4)),
  },
  {
    id: 17,
    title: "Taller de manualidades - María",
    date: new Date(new Date().setDate(new Date().getDate() + 4)),
  },
  {
    id: 18,
    title: "Cena familiar",
    date: new Date(new Date().setDate(new Date().getDate() + 5)),
  },
  {
    id: 19,
    title: "Excursión al parque natural",
    date: new Date(new Date().setDate(new Date().getDate() + 6)),
  },
]

export function MiniCalendarWidget() {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Obtener días del mes actual
  const firstDayOfMonth = startOfMonth(currentMonth)
  const lastDayOfMonth = endOfMonth(currentMonth)
  const daysInMonth = eachDayOfInterval({ start: firstDayOfMonth, end: lastDayOfMonth })

  // Obtener el día de la semana del primer día (0 = domingo, 1 = lunes, etc.)
  const startDay = getDay(firstDayOfMonth)

  // Ajustar para que la semana comience en lunes (0 = lunes, 6 = domingo)
  const adjustedStartDay = startDay === 0 ? 6 : startDay - 1

  // Nombres de los días de la semana
  const weekDays = ["L", "M", "X", "J", "V", "S", "D"]

  // Función para ir al mes anterior
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  // Función para ir al mes siguiente
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  // Función para obtener el número de tareas para un día específico
  const getTaskCount = (date) => {
    return initialTasks.filter((task) => isSameDay(new Date(task.date), date)).length
  }

  // Función para obtener el estilo del círculo según el número de tareas
  const getCircleStyle = (count) => {
    if (count >= 5) return "ring-4 ring-light-green dark:ring-teal-green/50"
    if (count >= 3) return "ring-3 ring-light-green dark:ring-teal-green/50"
    if (count >= 1) return "ring-2 ring-light-green dark:ring-teal-green/50"
    return ""
  }

  return (
    <Card className="border-teal-green dark:border-gray-700 dark:bg-gray-800">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <h3 className="text-sm font-semibold text-primary-green dark:text-white">Calendario</h3>
        <ChevronRight className="h-4 w-4 text-primary-green dark:text-white" />
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-2">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={prevMonth}
              className="text-primary-green hover:text-primary-green/80 dark:text-white dark:hover:text-white/80"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <h4 className="text-sm font-medium text-primary-green dark:text-white">
              {format(currentMonth, "MMMM yyyy", { locale: es })}
            </h4>
            <button
              onClick={nextMonth}
              className="text-primary-green hover:text-primary-green/80 dark:text-white dark:hover:text-white/80"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center">
            {weekDays.map((day, i) => (
              <div key={i} className="text-xs font-medium text-primary-green dark:text-white">
                {day}
              </div>
            ))}

            {/* Espacios vacíos para alinear el primer día */}
            {Array.from({ length: adjustedStartDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {/* Días del mes */}
            {daysInMonth.map((day) => {
              const isCurrentDay = isToday(day)
              const taskCount = getTaskCount(day)
              const circleStyle = getCircleStyle(taskCount)

              return (
                <div key={day.toString()} className="flex items-center justify-center">
                  <div
                    className={cn(
                      "flex items-center justify-center w-6 h-6 rounded-full text-xs",
                      isCurrentDay && "bg-primary-green text-white dark:bg-primary-green/80",
                      !isCurrentDay &&
                        "text-primary-green hover:bg-teal-green/30 dark:text-white dark:hover:bg-teal-green/30",
                      circleStyle,
                    )}
                  >
                    {format(day, "d")}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
