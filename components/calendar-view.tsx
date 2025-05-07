"use client"

import { Calendar } from "@/components/ui/calendar"

import { useState, useRef, useEffect } from "react"
import { CalendarIcon, ChevronLeft, ChevronRight, Plus, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, addHours } from "date-fns"
import { es } from "date-fns/locale"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"

// Datos de ejemplo de miembros de la familia (igual que en agenda-view)
const familyMembers = [
  {
    id: 1,
    name: "Juan Pérez",
    email: "juan@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "JP",
  },
  {
    id: 2,
    name: "Ana Pérez",
    email: "ana@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "AP",
  },
  {
    id: 3,
    name: "Carlos Pérez",
    email: "carlos@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "CP",
  },
  {
    id: 4,
    name: "María Pérez",
    email: "maria@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "MP",
  },
]

// Datos de ejemplo - Usando las mismas tareas que en agenda-view
const initialTasks = [
  {
    id: 1,
    title: "Reunión de padres",
    description: "Reunión con el tutor de Carlos para hablar sobre su progreso",
    date: new Date(2025, 4, 15),
    time: "18:00",
    endTime: "19:30",
    priority: "high",
    assignedTo: [1], // Juan
    status: "scheduled",
    completed: false,
  },
  {
    id: 2,
    title: "Comprar material escolar",
    description: "Libretas, lápices y material para el proyecto de ciencias",
    date: new Date(2025, 4, 10),
    time: "12:00",
    endTime: "13:30",
    priority: "medium",
    assignedTo: [2], // Ana
    status: "scheduled",
    completed: false,
  },
  {
    id: 3,
    title: "Pagar facturas",
    description: "Electricidad, agua e internet",
    date: new Date(2025, 4, 8),
    time: "10:00",
    endTime: "11:00",
    priority: "high",
    assignedTo: [1], // Juan
    status: "scheduled",
    completed: true,
  },
  {
    id: 4,
    title: "Llevar el coche al taller",
    description: "Revisión anual y cambio de aceite",
    date: new Date(2025, 4, 9),
    time: "09:30",
    endTime: "11:30",
    priority: "medium",
    assignedTo: [1], // Juan
    status: "scheduled",
    completed: false,
  },
  {
    id: 5,
    title: "Clase de natación - María",
    description: "Llevar bañador y toalla",
    date: new Date(2025, 4, 12),
    time: "17:00",
    endTime: "18:30",
    priority: "low",
    assignedTo: [2, 4], // Ana y María
    status: "scheduled",
    completed: false,
  },
  // Añadiendo más tareas para toda la semana actual
  {
    id: 10,
    title: "Visita al dentista",
    description: "Revisión anual dental para toda la familia",
    date: new Date(),
    time: "15:00",
    endTime: "16:30",
    priority: "medium",
    assignedTo: [1, 2, 3, 4], // Toda la familia
    status: "scheduled",
    completed: false,
  },
  {
    id: 11,
    title: "Partido de fútbol - Carlos",
    description: "Campeonato escolar",
    date: addDays(new Date(), 1),
    time: "16:00",
    endTime: "18:00",
    priority: "low",
    assignedTo: [1, 3], // Juan y Carlos
    status: "scheduled",
    completed: false,
  },
  {
    id: 12,
    title: "Compra semanal",
    description: "Comprar alimentos para toda la semana",
    date: addDays(new Date(), 2),
    time: "10:00",
    endTime: "12:00",
    priority: "medium",
    assignedTo: [2], // Ana
    status: "scheduled",
    completed: false,
  },
  {
    id: 13,
    title: "Cita médica - María",
    description: "Revisión pediátrica",
    date: addDays(new Date(), 2),
    time: "17:30",
    endTime: "18:30",
    priority: "high",
    assignedTo: [2, 4], // Ana y María
    status: "scheduled",
    completed: false,
  },
  {
    id: 14,
    title: "Reparación lavadora",
    description: "Visita del técnico para reparar la lavadora",
    date: addDays(new Date(), 3),
    time: "09:00",
    endTime: "11:00",
    priority: "high",
    assignedTo: [1], // Juan
    status: "scheduled",
    completed: false,
  },
  {
    id: 15,
    title: "Clase de piano - Carlos",
    description: "Clase semanal de piano",
    date: addDays(new Date(), 3),
    time: "17:00",
    endTime: "18:00",
    priority: "low",
    assignedTo: [3], // Carlos
    status: "scheduled",
    completed: false,
  },
  {
    id: 20,
    title: "Visita al museo con los niños",
    description: "Exposición especial de dinosaurios en el Museo de Ciencias Naturales",
    date: addDays(new Date(), 3),
    time: "11:30",
    endTime: "14:00",
    priority: "medium",
    assignedTo: [1, 3, 4], // Juan, Carlos y María
    status: "scheduled",
    completed: false,
  },
  {
    id: 16,
    title: "Reunión de vecinos",
    description: "Discusión sobre mejoras en la comunidad",
    date: addDays(new Date(), 4),
    time: "19:00",
    endTime: "20:30",
    priority: "medium",
    assignedTo: [1], // Juan
    status: "scheduled",
    completed: false,
  },
  {
    id: 17,
    title: "Taller de manualidades - María",
    description: "Taller de manualidades en el centro cultural",
    date: addDays(new Date(), 4),
    time: "16:00",
    endTime: "18:00",
    priority: "low",
    assignedTo: [2, 4], // Ana y María
    status: "scheduled",
    completed: false,
  },
  {
    id: 18,
    title: "Cena familiar",
    description: "Cena especial en casa con toda la familia",
    date: addDays(new Date(), 5),
    time: "20:00",
    endTime: "22:00",
    priority: "medium",
    assignedTo: [1, 2, 3, 4], // Toda la familia
    status: "scheduled",
    completed: false,
  },
  {
    id: 19,
    title: "Excursión al parque natural",
    description: "Día completo de excursión con picnic",
    date: addDays(new Date(), 6),
    time: "09:00",
    endTime: "17:00",
    priority: "medium",
    assignedTo: [1, 2, 3, 4], // Toda la familia
    status: "scheduled",
    completed: false,
  },
]

// Reemplazar los eventos de ejemplo con las tareas de la agenda
const events = initialTasks
  .map((task) => ({
    id: task.id,
    title: task.title,
    date: task.date ? new Date(task.date) : null,
    endDate: task.date
      ? (() => {
          const [hours, minutes] = task.endTime.split(":").map(Number)
          const endDate = new Date(task.date)
          endDate.setHours(hours, minutes)
          return endDate
        })()
      : null,
    type: task.priority === "high" ? "family" : task.priority === "medium" ? "health" : "sport",
    description: task.description,
    location: "",
    assignedTo: task.assignedTo,
    completed: task.completed,
  }))
  .filter((event) => event.date !== null)

export function CalendarView() {
  const [date, setDate] = useState<Date>(new Date())
  const [view, setView] = useState<"month" | "week" | "day">("month")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: new Date(),
    endDate: addHours(new Date(), 1),
    type: "family",
    description: "",
    location: "",
    assignedTo: [] as number[],
  })
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: "Juan Pérez",
    role: "parent",
  })

  // Filtrar eventos según el usuario actual
  const filteredEvents = events.filter((event) => {
    if (currentUser.role === "parent") return true
    return event.assignedTo.includes(currentUser.id)
  })

  // Función para obtener el color según el tipo de evento
  const getEventColor = (type: string, completed = false) => {
    if (completed) {
      return "bg-primary-green/20 border-primary-green text-primary-green dark:bg-primary-green/30 dark:text-white"
    }

    // Usar los mismos colores que en la agenda
    return "bg-light-green/30 border-teal-green text-primary-green dark:bg-teal-green/30 dark:text-white"
  }

  // Función para formatear la hora
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })
  }

  // Función para navegar a la fecha anterior
  const goToPrevious = () => {
    if (view === "month") {
      setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))
    } else if (view === "week") {
      setDate(addDays(date, -7))
    } else {
      setDate(addDays(date, -1))
    }
  }

  // Función para navegar a la fecha siguiente
  const goToNext = () => {
    if (view === "month") {
      setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))
    } else if (view === "week") {
      setDate(addDays(date, 7))
    } else {
      setDate(addDays(date, 1))
    }
  }

  // Función para ir a la fecha actual
  const goToToday = () => {
    setDate(new Date())
  }

  // Obtener los días de la semana actual
  const weekDays = eachDayOfInterval({
    start: startOfWeek(date, { weekStartsOn: 1 }),
    end: endOfWeek(date, { weekStartsOn: 1 }),
  })

  // Filtrar eventos para la fecha seleccionada (vista diaria)
  const dayEvents = filteredEvents.filter((event) => event.date && isSameDay(event.date, date))

  // Filtrar eventos para la semana seleccionada (vista semanal)
  const weekEvents = filteredEvents.filter((event) => event.date && weekDays.some((day) => isSameDay(day, event.date)))

  // Efecto para hacer scroll a la hora actual en la vista diaria
  useEffect(() => {
    if (view === "day" && containerRef.current) {
      const now = new Date()
      const currentHour = now.getHours()
      const hourElement = containerRef.current.querySelector(`[data-hour="${currentHour}"]`)
      if (hourElement) {
        hourElement.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }, [view])

  // Función para obtener los miembros asignados a un evento
  const getAssignedMembers = (memberIds) => {
    return familyMembers.filter((member) => memberIds.includes(member.id))
  }

  // Función para obtener el tamaño del círculo según el número de tareas
  const getCircleSize = (count) => {
    if (count >= 5) return "w-8 h-8 text-sm"
    if (count >= 3) return "w-7 h-7 text-xs"
    if (count >= 1) return "w-6 h-6 text-xs"
    return "w-0 h-0"
  }

  // Renderizar la vista mensual
  const renderMonthView = () => {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    const startDate = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 })
    const endDate = endOfWeek(lastDayOfMonth, { weekStartsOn: 1 })

    const days = eachDayOfInterval({ start: startDate, end: endDate })

    // Nombres de los días de la semana
    const weekDayNames = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]

    return (
      <div className="bg-white rounded-lg border border-teal-green overflow-hidden dark:bg-gray-800 dark:border-gray-700">
        <div className="grid grid-cols-7 border-b border-teal-green dark:border-gray-700">
          {weekDayNames.map((day, index) => (
            <div key={index} className="p-2 text-center font-medium text-primary-green dark:text-white">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 auto-rows-fr">
          {days.map((day, i) => {
            const isCurrentMonth = day.getMonth() === date.getMonth()
            const isToday = isSameDay(day, new Date())
            const dayEvents = filteredEvents.filter((event) => event.date && isSameDay(event.date, day))

            return (
              <div
                key={i}
                className={cn(
                  "min-h-[100px] p-1 border-b border-r border-teal-green dark:border-gray-700",
                  !isCurrentMonth && "bg-gray-50 text-gray-400 dark:bg-gray-900 dark:text-gray-500",
                  isToday && "bg-teal-green/20 dark:bg-teal-green/10",
                )}
              >
                <div className="flex justify-between items-start">
                  <span
                    className={cn(
                      "inline-flex items-center justify-center w-6 h-6 rounded-full text-sm",
                      isToday && "bg-primary-green text-white font-bold dark:bg-primary-green/80",
                    )}
                  >
                    {format(day, "d")}
                  </span>
                </div>
                <div className="mt-1 space-y-1 max-h-[80px] overflow-y-auto">
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className={cn("text-xs p-1 rounded truncate", getEventColor(event.type, event.completed))}
                    >
                      {formatTime(event.date)} {event.title}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Renderizar la vista semanal
  const renderWeekView = () => {
    return (
      <div className="bg-white rounded-lg border border-teal-green overflow-hidden dark:bg-gray-800 dark:border-gray-700">
        <div className="grid grid-cols-8 border-b border-teal-green dark:border-gray-700">
          <div className="p-2 text-center font-medium text-primary-green border-r border-teal-green dark:text-white dark:border-gray-700">
            Hora
          </div>
          {weekDays.map((day, index) => (
            <div
              key={index}
              className={cn(
                "p-2 text-center font-medium",
                isSameDay(day, new Date())
                  ? "bg-teal-green text-primary-green dark:bg-teal-green/30 dark:text-white"
                  : "text-primary-green dark:text-white",
              )}
            >
              <div>{format(day, "EEE", { locale: es })}</div>
              <div className="text-lg">{format(day, "d", { locale: es })}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-8" style={{ height: "600px" }}>
          <div className="border-r border-teal-green dark:border-gray-700">
            {Array.from({ length: 24 }).map((_, hour) => (
              <div
                key={hour}
                className="h-12 border-b border-teal-green px-2 text-xs text-primary-green flex items-center justify-center dark:border-gray-700 dark:text-white"
              >
                {hour}:00
              </div>
            ))}
          </div>
          {weekDays.map((day, dayIndex) => (
            <div key={dayIndex} className="relative">
              {Array.from({ length: 24 }).map((_, hour) => (
                <div key={hour} className="h-12 border-b border-r border-teal-green dark:border-gray-700" />
              ))}
              {weekEvents
                .filter((event) => event.date && isSameDay(event.date, day))
                .map((event) => {
                  const startHour = event.date.getHours()
                  const startMinute = event.date.getMinutes()
                  const endHour = event.endDate.getHours()
                  const endMinute = event.endDate.getMinutes()
                  const durationHours = endHour - startHour + (endMinute - startMinute) / 60

                  return (
                    <div
                      key={event.id}
                      className={cn(
                        "absolute left-0 right-0 mx-1 p-1 rounded text-xs overflow-hidden",
                        getEventColor(event.type, event.completed),
                      )}
                      style={{
                        top: `${(startHour + startMinute / 60) * 48}px`,
                        height: `${durationHours * 48}px`,
                      }}
                    >
                      <div className="font-medium">{event.title}</div>
                      <div>
                        {formatTime(event.date)} - {formatTime(event.endDate)}
                      </div>
                      {event.assignedTo && event.assignedTo.length > 0 && (
                        <div className="flex -space-x-2 mt-1">
                          {getAssignedMembers(event.assignedTo).map((member) => (
                            <Avatar key={member.id} className="h-4 w-4 border border-white">
                              <AvatarFallback className="text-[8px] bg-teal-green text-primary-green dark:bg-gray-600 dark:text-white">
                                {member.initials}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Renderizar la vista diaria
  const renderDayView = () => {
    return (
      <div className="bg-white rounded-lg border border-teal-green overflow-hidden dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4 border-b border-teal-green text-center dark:border-gray-700">
          <div className="text-xl font-semibold text-primary-green dark:text-white">
            {format(date, "EEEE, d MMMM yyyy", { locale: es })}
          </div>
        </div>
        <div ref={containerRef} className="overflow-y-auto" style={{ height: "600px" }}>
          {Array.from({ length: 24 }).map((_, hour) => (
            <div key={hour} data-hour={hour} className="relative">
              <div className="flex border-b border-teal-green dark:border-gray-700">
                <div className="w-16 py-2 text-center text-sm text-primary-green dark:text-white">{hour}:00</div>
                <div className="flex-1 h-12 border-l border-teal-green dark:border-gray-700"></div>
              </div>
              {dayEvents
                .filter((event) => event.date.getHours() === hour)
                .map((event) => {
                  const startMinute = event.date.getMinutes()
                  const endHour = event.endDate.getHours()
                  const endMinute = event.endDate.getMinutes()
                  const durationHours = endHour - hour + (endMinute - startMinute) / 60

                  return (
                    <div
                      key={event.id}
                      className={cn(
                        "absolute left-16 right-0 mx-1 p-2 rounded",
                        getEventColor(event.type, event.completed),
                      )}
                      style={{
                        top: `${startMinute * 0.2 + hour * 48}px`,
                        height: `${durationHours * 48}px`,
                        minHeight: "24px",
                      }}
                    >
                      <div className="font-medium">{event.title}</div>
                      <div className="text-xs flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatTime(event.date)} - {formatTime(event.endDate)}
                      </div>
                      <div className="text-xs mt-1">{event.description}</div>
                      {event.assignedTo && event.assignedTo.length > 0 && (
                        <div className="flex -space-x-2 mt-1">
                          {getAssignedMembers(event.assignedTo).map((member) => (
                            <Avatar key={member.id} className="h-5 w-5 border border-white">
                              <AvatarFallback className="text-[10px] bg-teal-green text-primary-green dark:bg-gray-600 dark:text-white">
                                {member.initials}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={goToToday}
            className="border-teal-green text-primary-green dark:border-gray-600 dark:text-white"
          >
            <CalendarIcon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={goToPrevious} className="text-primary-green dark:text-white">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={goToNext} className="text-primary-green dark:text-white">
            <ChevronRight className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold text-primary-green dark:text-white">
            {view === "month"
              ? format(date, "MMMM yyyy", { locale: es })
              : view === "week"
                ? `${format(weekDays[0], "d MMM", { locale: es })} - ${format(weekDays[6], "d MMM yyyy", {
                    locale: es,
                  })}`
                : format(date, "d MMMM yyyy", { locale: es })}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <Tabs value={view} onValueChange={(v) => setView(v as "month" | "week" | "day")}>
            <TabsList className="bg-teal-green dark:bg-gray-700">
              <TabsTrigger
                value="month"
                className="data-[state=active]:bg-primary-green data-[state=active]:text-white text-primary-green dark:text-white dark:data-[state=active]:bg-gray-900"
              >
                Mes
              </TabsTrigger>
              <TabsTrigger
                value="week"
                className="data-[state=active]:bg-primary-green data-[state=active]:text-white text-primary-green dark:text-white dark:data-[state=active]:bg-gray-900"
              >
                Semana
              </TabsTrigger>
              <TabsTrigger
                value="day"
                className="data-[state=active]:bg-primary-green data-[state=active]:text-white text-primary-green dark:text-white dark:data-[state=active]:bg-gray-900"
              >
                Día
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary-green hover:bg-primary-green/90 text-white dark:bg-gray-700 dark:hover:bg-gray-600">
                <Plus className="h-4 w-4" />
                Nuevo evento
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-cream dark:bg-gray-800">
              <DialogHeader>
                <DialogTitle className="text-primary-green dark:text-white">Crear nuevo evento</DialogTitle>
                <DialogDescription className="dark:text-gray-300">
                  Añade un nuevo evento al calendario familiar
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title" className="text-primary-green dark:text-white">
                    Título
                  </Label>
                  <Input
                    id="title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    placeholder="Título del evento"
                    className="border-teal-green dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div className="grid gap-2">
                  <Label className="text-primary-green dark:text-white">Fecha y hora de inicio</Label>
                  <div className="flex gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal border-teal-green dark:border-gray-600 dark:text-white",
                            !newEvent.date && "text-muted-foreground dark:text-gray-400",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-primary-green dark:text-gray-400" />
                          {newEvent.date ? (
                            format(newEvent.date, "PPP", { locale: es })
                          ) : (
                            <span>Selecciona una fecha</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-cream dark:bg-gray-800">
                        <Calendar
                          mode="single"
                          selected={newEvent.date}
                          onSelect={(date) => date && setNewEvent({ ...newEvent, date })}
                          initialFocus
                          classNames={{
                            day_selected: "bg-primary-green text-white hover:bg-primary-green hover:text-white",
                            day_today: "bg-teal-green text-primary-green dark:bg-teal-green/30 dark:text-white",
                            day: "text-primary-green hover:bg-teal-green hover:text-primary-green dark:text-white dark:hover:bg-teal-green/30",
                            head_cell: "text-primary-green dark:text-white",
                            caption: "text-primary-green dark:text-white",
                            nav_button:
                              "text-primary-green hover:bg-teal-green hover:text-primary-green dark:text-white dark:hover:bg-teal-green/30",
                            table: "font-opensans",
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                    <Input
                      type="time"
                      value={format(newEvent.date, "HH:mm")}
                      onChange={(e) => {
                        const [hours, minutes] = e.target.value.split(":").map(Number)
                        const newDate = new Date(newEvent.date)
                        newDate.setHours(hours, minutes)
                        setNewEvent({
                          ...newEvent,
                          date: newDate,
                          endDate: addHours(newDate, 1),
                        })
                      }}
                      className="border-teal-green dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label className="text-primary-green dark:text-white">Fecha y hora de fin</Label>
                  <div className="flex gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal border-teal-green dark:border-gray-600 dark:text-white",
                            !newEvent.endDate && "text-muted-foreground dark:text-gray-400",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4 text-primary-green dark:text-gray-400" />
                          {newEvent.endDate ? (
                            format(newEvent.endDate, "PPP", { locale: es })
                          ) : (
                            <span>Selecciona una fecha</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-cream dark:bg-gray-800">
                        <Calendar
                          mode="single"
                          selected={newEvent.endDate}
                          onSelect={(date) => date && setNewEvent({ ...newEvent, endDate: date })}
                          initialFocus
                          classNames={{
                            day_selected: "bg-primary-green text-white hover:bg-primary-green hover:text-white",
                            day_today: "bg-teal-green text-primary-green dark:bg-teal-green/30 dark:text-white",
                            day: "text-primary-green hover:bg-teal-green hover:text-primary-green dark:text-white dark:hover:bg-teal-green/30",
                            head_cell: "text-primary-green dark:text-white",
                            caption: "text-primary-green dark:text-white",
                            nav_button:
                              "text-primary-green hover:bg-teal-green hover:text-primary-green dark:text-white dark:hover:bg-teal-green/30",
                            table: "font-opensans",
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                    <Input
                      type="time"
                      value={format(newEvent.endDate, "HH:mm")}
                      onChange={(e) => {
                        const [hours, minutes] = e.target.value.split(":").map(Number)
                        const newEndDate = new Date(newEvent.endDate)
                        newEndDate.setHours(hours, minutes)
                        setNewEvent({ ...newEvent, endDate: newEndDate })
                      }}
                      className="border-teal-green dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type" className="text-primary-green dark:text-white">
                    Tipo
                  </Label>
                  <Select value={newEvent.type} onValueChange={(value) => setNewEvent({ ...newEvent, type: value })}>
                    <SelectTrigger className="border-teal-green text-primary-green dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                      <SelectValue placeholder="Selecciona un tipo" />
                    </SelectTrigger>
                    <SelectContent className="bg-cream dark:bg-gray-700">
                      <SelectItem value="family">Familiar</SelectItem>
                      <SelectItem value="health">Salud</SelectItem>
                      <SelectItem value="sport">Deporte</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="assignedTo" className="text-primary-green dark:text-white">
                    Asignar a
                  </Label>
                  <div className="space-y-2">
                    {familyMembers.map((member) => (
                      <div key={member.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`assign-${member.id}`}
                          checked={newEvent.assignedTo.includes(member.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setNewEvent({ ...newEvent, assignedTo: [...newEvent.assignedTo, member.id] })
                            } else {
                              setNewEvent({
                                ...newEvent,
                                assignedTo: newEvent.assignedTo.filter((id) => id !== member.id),
                              })
                            }
                          }}
                        />
                        <Label htmlFor={`assign-${member.id}`} className="flex items-center gap-2 cursor-pointer">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                            <AvatarFallback className="bg-teal-green text-primary-green text-xs dark:bg-gray-600 dark:text-white">
                              {member.initials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-primary-green dark:text-white">{member.name}</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description" className="text-primary-green dark:text-white">
                    Descripción
                  </Label>
                  <Textarea
                    id="description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                    placeholder="Descripción del evento"
                    className="border-teal-green dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="border-primary-green text-primary-green dark:border-gray-600 dark:text-white"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={() => {
                    // Aquí se añadiría la lógica para guardar el evento
                    setIsDialogOpen(false)
                    // Resetear el formulario
                    setNewEvent({
                      title: "",
                      date: new Date(),
                      endDate: addHours(new Date(), 1),
                      type: "family",
                      description: "",
                      location: "",
                      assignedTo: [],
                    })
                  }}
                  className="bg-primary-green hover:bg-primary-green/90 text-white dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  Guardar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="border-teal-green dark:border-gray-700 dark:bg-gray-800">
        <CardContent className="p-0">
          {view === "month" && renderMonthView()}
          {view === "week" && renderWeekView()}
          {view === "day" && renderDayView()}
        </CardContent>
      </Card>
    </div>
  )
}
