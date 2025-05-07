"use client"

import { Checkbox } from "@/components/ui/checkbox"

import { useState } from "react"
import { CalendarIcon, Clock, Plus, Filter, AlertCircle, Check, Edit, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, isAfter, isBefore, addDays } from "date-fns"
import { es } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Datos de ejemplo de miembros de la familia
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

// Datos de ejemplo - Añadiendo más tareas para que ocupen toda la pantalla
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
  {
    id: 6,
    title: "Organizar fiesta de cumpleaños",
    description: "Planificar la fiesta de cumpleaños de Carlos",
    date: null,
    time: "",
    endTime: "",
    priority: "medium",
    assignedTo: [],
    status: "unscheduled",
    completed: false,
  },
  {
    id: 7,
    title: "Revisar deberes de matemáticas",
    description: "Ayudar a María con los ejercicios de fracciones",
    date: null,
    time: "",
    endTime: "",
    priority: "high",
    assignedTo: [],
    status: "unscheduled",
    completed: false,
  },
  {
    id: 8,
    title: "Comprar regalo de aniversario",
    description: "Buscar un regalo para el aniversario",
    date: null,
    time: "",
    endTime: "",
    priority: "medium",
    assignedTo: [],
    status: "unscheduled",
    completed: false,
  },
  {
    id: 9,
    title: "Reunión con el jefe",
    description: "Discutir el nuevo proyecto",
    date: new Date(2025, 4, 15),
    time: "18:00",
    endTime: "19:00",
    priority: "high",
    assignedTo: [1], // Juan
    status: "conflict",
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
  // Añadir una nueva tarea para el jueves (día actual + 3)
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

// Slots de tiempo disponibles para programar tareas
const availableSlots = [
  { date: new Date(2025, 4, 10), time: "09:00", endTime: "10:30" },
  { date: new Date(2025, 4, 11), time: "14:00", endTime: "15:30" },
  { date: new Date(2025, 4, 12), time: "11:00", endTime: "12:30" },
]

export function AgendaView() {
  const [tasks, setTasks] = useState(initialTasks)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isResolveDialogOpen, setIsResolveDialogOpen] = useState(false)
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false)
  const [newTask, setNewTask] = useState({
    id: 0,
    title: "",
    description: "",
    date: null as Date | null,
    time: "",
    endTime: "",
    priority: "medium",
    assignedTo: [] as number[],
    status: "unscheduled",
    completed: false,
  })
  const [activeTab, setActiveTab] = useState<"scheduled" | "optimization">("scheduled")
  const [filter, setFilter] = useState<"all" | "mine" | "others">("all")
  const [includeDate, setIncludeDate] = useState(true)
  const [selectedTask, setSelectedTask] = useState(null)
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: "Juan Pérez",
    role: "parent",
  })

  // Obtener los días de la semana actual
  const today = new Date()
  const weekStart = startOfWeek(today, { weekStartsOn: 1 }) // Lunes como inicio de semana
  const weekEnd = endOfWeek(today, { weekStartsOn: 1 }) // Domingo como fin de semana
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd })

  // Filtrar tareas según la pestaña activa y el filtro seleccionado
  const filteredTasks = tasks
    .filter((task) => {
      // Filtrar por usuario actual
      if (currentUser.role === "child") {
        return task.assignedTo.includes(currentUser.id)
      }

      // Continuar con los filtros existentes
      if (activeTab === "scheduled") {
        return task.status === "scheduled" && task.date !== null
      } else {
        return task.status === "unscheduled" || task.status === "conflict"
      }
    })
    .filter((task) => {
      if (filter === "all") return true
      if (filter === "mine") return task.assignedTo.includes(1) // Juan tiene ID 1
      if (filter === "others") return task.assignedTo.length > 0 && !task.assignedTo.includes(1)
      return true
    })

  // Agrupar tareas por día de la semana
  const tasksByDay = weekDays.map((day) => {
    return {
      date: day,
      tasks: filteredTasks
        .filter((task) => task.date && isSameDay(new Date(task.date), day) && activeTab === "scheduled")
        .sort((a, b) => a.time.localeCompare(b.time)),
    }
  })

  // Función para obtener el color según el estado de la tarea (completada o no)
  const getTaskCardStyle = (task) => {
    if (task.completed) {
      return "bg-primary-green/20 border-primary-green text-primary-green" // Verde oscuro para completadas
    } else {
      return "bg-light-green/30 border-teal-green text-primary-green" // Verde claro para pendientes
    }
  }

  // Función para crear una nueva tarea
  const createTask = () => {
    setNewTask({
      id: Date.now(),
      title: "",
      description: "",
      date: includeDate ? new Date() : null,
      time: includeDate ? "" : "",
      endTime: includeDate ? "" : "",
      priority: "medium",
      assignedTo: [],
      status: includeDate ? "scheduled" : "unscheduled",
      completed: false,
    })
    setIsDialogOpen(true)
  }

  // Función para guardar una tarea
  const saveTask = () => {
    const status =
      newTask.date === null
        ? "unscheduled"
        : tasks.some(
              (task) =>
                task.date &&
                newTask.date &&
                isSameDay(new Date(task.date), new Date(newTask.date)) &&
                task.time === newTask.time &&
                task.id !== newTask.id &&
                task.assignedTo.some((person) => newTask.assignedTo.includes(person)),
            )
          ? "conflict"
          : "scheduled"

    setTasks([...tasks, { ...newTask, status }])
    setIsDialogOpen(false)
  }

  // Función para editar una tarea
  const editTask = (task) => {
    setSelectedTask(task)
    setIsEditDialogOpen(true)
  }

  // Función para guardar los cambios de una tarea editada
  const saveEditedTask = () => {
    setTasks(tasks.map((task) => (task.id === selectedTask.id ? selectedTask : task)))
    setIsEditDialogOpen(false)
  }

  // Función para marcar una tarea como completada
  const completeTask = (taskId) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: true } : task)))
  }

  // Función para abrir el diálogo de programación de tarea
  const openScheduleDialog = (task) => {
    setSelectedTask(task)
    setIsScheduleDialogOpen(true)
  }

  // Función para programar una tarea con un slot específico
  const scheduleTaskWithSlot = (slot) => {
    setTasks(
      tasks.map((task) =>
        task.id === selectedTask.id
          ? {
              ...task,
              date: slot.date,
              time: slot.time,
              endTime: slot.endTime,
              status: "scheduled",
            }
          : task,
      ),
    )
    setIsScheduleDialogOpen(false)
  }

  // Función para abrir el diálogo de resolución de conflictos
  const openResolveDialog = (task) => {
    setSelectedTask(task)
    setIsResolveDialogOpen(true)
  }

  // Función para resolver un conflicto con un slot específico
  const resolveConflictWithSlot = (slot) => {
    setTasks(
      tasks.map((task) =>
        task.id === selectedTask.id
          ? {
              ...task,
              date: slot.date,
              time: slot.time,
              endTime: slot.endTime,
              status: "scheduled",
            }
          : task,
      ),
    )
    setIsResolveDialogOpen(false)
  }

  // Función para obtener los miembros asignados a una tarea
  const getAssignedMembers = (memberIds) => {
    return familyMembers.filter((member) => memberIds.includes(member.id))
  }

  // Función para obtener el estado de una tarea
  const getTaskStatus = (task) => {
    if (task.completed) {
      return { label: "Completada", color: "bg-green-600 text-white" }
    }

    const now = new Date()
    const taskDate = task.date ? new Date(task.date) : null

    if (!taskDate) {
      return { label: "Sin programar", color: "bg-gray-100 text-gray-800" }
    }

    const taskStartTime = task.time.split(":").map(Number)
    const taskEndTime = task.endTime.split(":").map(Number)

    const startDateTime = new Date(taskDate)
    startDateTime.setHours(taskStartTime[0], taskStartTime[1])

    const endDateTime = new Date(taskDate)
    endDateTime.setHours(taskEndTime[0], taskEndTime[1])

    if (isAfter(now, endDateTime)) {
      return { label: "Finalizada", color: "bg-green-600 text-white" }
    }

    if (isAfter(now, startDateTime) && isBefore(now, endDateTime)) {
      return { label: "En proceso", color: "bg-blue-100 text-primary-green" }
    }

    return { label: "Pendiente", color: "bg-amber-100 text-primary-green" }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-primary-green">Agenda Familiar</h2>
        <div className="flex items-center gap-2">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "scheduled" | "optimization")}>
            <TabsList className="bg-teal-green">
              <TabsTrigger
                value="scheduled"
                className="data-[state=active]:bg-primary-green data-[state=active]:text-white text-primary-green"
              >
                Tareas
              </TabsTrigger>
              <TabsTrigger
                value="optimization"
                className="data-[state=active]:bg-primary-green data-[state=active]:text-white text-primary-green"
              >
                Optimización
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="border-teal-green text-primary-green">
                <Filter className="h-4 w-4 mr-2" />
                Filtrar
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 bg-cream">
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-primary-green">Mostrar tareas de:</h4>
                <div className="space-y-1">
                  <Button
                    variant={filter === "all" ? "default" : "outline"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setFilter("all")}
                  >
                    Todos
                  </Button>
                  <Button
                    variant={filter === "mine" ? "default" : "outline"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setFilter("mine")}
                  >
                    Mis tareas
                  </Button>
                  <Button
                    variant={filter === "others" ? "default" : "outline"}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setFilter("others")}
                  >
                    Otros miembros
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Button onClick={createTask} className="bg-primary-green hover:bg-primary-green/90 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Nueva tarea
          </Button>
        </div>
      </div>

      {activeTab === "scheduled" && (
        <div className="space-y-6">
          {tasksByDay.map((day) => (
            <div key={format(day.date, "yyyy-MM-dd")} className="space-y-2">
              <h3 className="text-lg font-medium text-primary-green">
                {format(day.date, "EEEE, d MMMM", { locale: es })}
              </h3>

              {day.tasks.length === 0 ? (
                <p className="text-sm text-muted-foreground">No hay tareas programadas para este día</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {day.tasks.map((task) => {
                    const taskStatus = getTaskStatus(task)

                    return (
                      <Card
                        key={task.id}
                        className={cn(
                          "border-2 hover:shadow-md transition-shadow flex flex-col h-full",
                          getTaskCardStyle(task),
                        )}
                      >
                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg text-primary-green">{task.title}</CardTitle>
                            <Badge className={taskStatus.color}>{taskStatus.label}</Badge>
                          </div>
                          <CardDescription>{task.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col justify-between">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-1 text-sm text-primary-green">
                              <Clock className="h-4 w-4" />
                              <span>
                                {task.time} - {task.endTime}
                              </span>
                            </div>
                            <div className="flex -space-x-2">
                              {getAssignedMembers(task.assignedTo).map((member) => (
                                <Avatar key={member.id} className="h-6 w-6 border-2 border-white">
                                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                  <AvatarFallback className="text-xs bg-teal-green text-primary-green">
                                    {member.initials}
                                  </AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                          </div>

                          {!task.completed && (
                            <div className="flex justify-end gap-2 mt-4">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-teal-green text-primary-green"
                                onClick={() => editTask(task)}
                              >
                                <Edit className="h-4 w-4 mr-1" />
                                Editar
                              </Button>
                              <Button
                                size="sm"
                                className="bg-primary-green hover:bg-primary-green/90 text-white"
                                onClick={() => completeTask(task.id)}
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Completar
                              </Button>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === "optimization" && (
        <div className="space-y-4">
          <Card className="border-teal-green">
            <CardHeader>
              <CardTitle className="text-primary-green">Tareas sin programar</CardTitle>
              <CardDescription>
                Estas tareas no tienen fecha ni hora asignada. Puedes programarlas para organizarlas mejor.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTasks
                  .filter((task) => task.status === "unscheduled")
                  .map((task) => (
                    <div
                      key={task.id}
                      className="p-4 rounded-lg border-2 flex flex-col gap-2 bg-light-green/30 border-teal-green"
                    >
                      <h3 className="font-medium text-primary-green">{task.title}</h3>
                      <p className="text-sm text-primary-green/80">{task.description}</p>
                      <div className="text-xs text-primary-green">
                        Prioridad: {task.priority === "high" ? "Alta" : task.priority === "medium" ? "Media" : "Baja"}
                      </div>
                      <div className="flex justify-end mt-2">
                        <Button
                          size="sm"
                          className="bg-primary-green hover:bg-primary-green/90 text-white"
                          onClick={() => openScheduleDialog(task)}
                        >
                          Programar
                        </Button>
                      </div>
                    </div>
                  ))}

                {filteredTasks.filter((task) => task.status === "unscheduled").length === 0 && (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <p className="text-muted-foreground mb-4">No hay tareas sin programar</p>
                    <Button
                      onClick={() => {
                        setIncludeDate(false)
                        createTask()
                      }}
                      className="bg-primary-green hover:bg-primary-green/90 text-white"
                    >
                      Crear tarea sin programar
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-teal-green">
            <CardHeader>
              <CardTitle className="text-primary-green">Conflictos detectados</CardTitle>
              <CardDescription>Estas tareas tienen conflictos de horario. Considera reprogramarlas.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTasks
                  .filter((task) => task.status === "conflict")
                  .map((task) => (
                    <div key={task.id} className="p-4 rounded-lg border-2 border-red-400 bg-red-50 flex flex-col gap-2">
                      <h3 className="font-medium text-primary-green">{task.title}</h3>
                      <div className="flex items-center gap-1 text-sm text-primary-green">
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        <span>
                          {task.date ? format(new Date(task.date), "d MMM", { locale: es }) : ""} {task.time}
                        </span>
                      </div>
                      <p className="text-sm text-primary-green/80">{task.description}</p>
                      <div className="text-xs text-red-500">
                        Conflicto: Esta tarea se solapa con otra actividad de{" "}
                        {getAssignedMembers(task.assignedTo)
                          .map((m) => m.name)
                          .join(", ")}
                      </div>
                      <div className="flex justify-end mt-2">
                        <Button
                          size="sm"
                          className="bg-primary-green hover:bg-primary-green/90 text-white"
                          onClick={() => openResolveDialog(task)}
                        >
                          Resolver
                        </Button>
                      </div>
                    </div>
                  ))}

                {filteredTasks.filter((task) => task.status === "conflict").length === 0 && (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <p className="text-muted-foreground">No se han detectado conflictos</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Diálogo para crear nueva tarea */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-cream">
          <DialogHeader>
            <DialogTitle className="text-primary-green">Nueva tarea</DialogTitle>
            <DialogDescription>Añade una nueva tarea a la agenda familiar</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-primary-green">
                Título
              </Label>
              <Input
                id="title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                placeholder="Título de la tarea"
                className="border-teal-green"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="include-date"
                checked={includeDate}
                onCheckedChange={(checked) => {
                  setIncludeDate(checked)
                  if (checked) {
                    setNewTask({ ...newTask, date: new Date(), status: "scheduled" })
                  } else {
                    setNewTask({ ...newTask, date: null, time: "", endTime: "", status: "unscheduled" })
                  }
                }}
              />
              <Label htmlFor="include-date" className="text-primary-green">
                Incluir fecha y hora
              </Label>
            </div>

            {includeDate && (
              <div>
                <div className="grid gap-2">
                  <Label htmlFor="date" className="text-primary-green">
                    Fecha
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal border-teal-green",
                          !newTask.date && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-primary-green" />
                        {newTask.date ? format(newTask.date, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-cream">
                      <Calendar
                        mode="single"
                        selected={newTask.date || undefined}
                        onSelect={(date) => date && setNewTask({ ...newTask, date })}
                        initialFocus
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
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="time" className="text-primary-green">
                      Hora de inicio
                    </Label>
                    <Input
                      id="time"
                      type="time"
                      value={newTask.time}
                      onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                      className="border-teal-green"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="endTime" className="text-primary-green">
                      Hora de fin
                    </Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={newTask.endTime}
                      onChange={(e) => setNewTask({ ...newTask, endTime: e.target.value })}
                      className="border-teal-green"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="grid gap-2">
              <Label htmlFor="priority" className="text-primary-green">
                Prioridad
              </Label>
              <Select value={newTask.priority} onValueChange={(value) => setNewTask({ ...newTask, priority: value })}>
                <SelectTrigger className="border-teal-green text-primary-green">
                  <SelectValue placeholder="Selecciona la prioridad" />
                </SelectTrigger>
                <SelectContent className="bg-cream">
                  <SelectItem value="high">Alta</SelectItem>
                  <SelectItem value="medium">Media</SelectItem>
                  <SelectItem value="low">Baja</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="assignedTo" className="text-primary-green">
                Asignar a
              </Label>
              <div className="space-y-2">
                {familyMembers.map((member) => (
                  <div key={member.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`assign-${member.id}`}
                      checked={newTask.assignedTo.includes(member.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setNewTask({ ...newTask, assignedTo: [...newTask.assignedTo, member.id] })
                        } else {
                          setNewTask({
                            ...newTask,
                            assignedTo: newTask.assignedTo.filter((id) => id !== member.id),
                          })
                        }
                      }}
                    />
                    <Label htmlFor={`assign-${member.id}`} className="flex items-center gap-2 cursor-pointer">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback className="bg-teal-green text-primary-green text-xs">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-primary-green">{member.name}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description" className="text-primary-green">
                Descripción
              </Label>
              <Textarea
                id="description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                placeholder="Descripción de la tarea"
                className="border-teal-green"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="border-primary-green text-primary-green"
            >
              Cancelar
            </Button>
            <Button
              onClick={saveTask}
              disabled={!newTask.title.trim() || (includeDate && (!newTask.time || !newTask.endTime))}
              className="bg-primary-green hover:bg-primary-green/90 text-white"
            >
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para editar tarea */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-cream">
          <DialogHeader>
            <DialogTitle className="text-primary-green">Editar tarea</DialogTitle>
            <DialogDescription>Modifica los detalles de la tarea</DialogDescription>
          </DialogHeader>
          {selectedTask && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title" className="text-primary-green">
                  Título
                </Label>
                <Input
                  id="edit-title"
                  value={selectedTask.title}
                  onChange={(e) => setSelectedTask({ ...selectedTask, title: e.target.value })}
                  className="border-teal-green"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-time" className="text-primary-green">
                    Hora de inicio
                  </Label>
                  <Input
                    id="edit-time"
                    type="time"
                    value={selectedTask.time}
                    onChange={(e) => setSelectedTask({ ...selectedTask, time: e.target.value })}
                    className="border-teal-green"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-endTime" className="text-primary-green">
                    Hora de fin
                  </Label>
                  <Input
                    id="edit-endTime"
                    type="time"
                    value={selectedTask.endTime}
                    onChange={(e) => setSelectedTask({ ...selectedTask, endTime: e.target.value })}
                    className="border-teal-green"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-priority" className="text-primary-green">
                  Prioridad
                </Label>
                <Select
                  value={selectedTask.priority}
                  onValueChange={(value) => setSelectedTask({ ...selectedTask, priority: value })}
                >
                  <SelectTrigger className="border-teal-green text-primary-green">
                    <SelectValue placeholder="Selecciona la prioridad" />
                  </SelectTrigger>
                  <SelectContent className="bg-cream">
                    <SelectItem value="high">Alta</SelectItem>
                    <SelectItem value="medium">Media</SelectItem>
                    <SelectItem value="low">Baja</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description" className="text-primary-green">
                  Descripción
                </Label>
                <Textarea
                  id="edit-description"
                  value={selectedTask.description}
                  onChange={(e) => setSelectedTask({ ...selectedTask, description: e.target.value })}
                  className="border-teal-green"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              className="border-primary-green text-primary-green"
            >
              Cancelar
            </Button>
            <Button onClick={saveEditedTask} className="bg-primary-green hover:bg-primary-green/90 text-white">
              Guardar cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para programar tarea */}
      <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
        <DialogContent className="bg-cream">
          <DialogHeader>
            <DialogTitle className="text-primary-green">Programar tarea</DialogTitle>
            <DialogDescription>Selecciona un horario disponible para esta tarea</DialogDescription>
          </DialogHeader>
          {selectedTask && (
            <div className="py-4">
              <h3 className="font-medium text-primary-green mb-4">{selectedTask.title}</h3>
              <div className="space-y-4">
                {availableSlots.map((slot, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border-2 border-teal-green bg-teal-green/20 cursor-pointer hover:bg-teal-green/40"
                    onClick={() => scheduleTaskWithSlot(slot)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary-green" />
                        <span className="font-medium text-primary-green">
                          {format(slot.date, "EEEE, d MMMM", { locale: es })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary-green" />
                        <span className="text-primary-green">
                          {slot.time} - {slot.endTime}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsScheduleDialogOpen(false)}
              className="border-primary-green text-primary-green"
            >
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo para resolver conflictos */}
      <Dialog open={isResolveDialogOpen} onOpenChange={setIsResolveDialogOpen}>
        <DialogContent className="bg-cream">
          <DialogHeader>
            <DialogTitle className="text-primary-green">Resolver conflicto</DialogTitle>
            <DialogDescription>Selecciona un horario alternativo para esta tarea</DialogDescription>
          </DialogHeader>
          {selectedTask && (
            <div className="py-4">
              <div className="p-3 rounded-lg border-2 border-red-300 bg-red-50 mb-4">
                <div className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <span className="font-medium">Conflicto detectado</span>
                </div>
                <p className="text-sm text-primary-green mt-1">
                  Esta tarea se solapa con otra actividad programada para{" "}
                  {selectedTask.assignedTo.length > 0
                    ? getAssignedMembers(selectedTask.assignedTo)
                        .map((m) => m.name)
                        .join(", ")
                    : "miembros de la familia"}
                  .
                </p>
              </div>

              <h3 className="font-medium text-primary-green mb-4">Horarios alternativos para: {selectedTask.title}</h3>
              <div className="space-y-4">
                {availableSlots.map((slot, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border-2 border-teal-green bg-teal-green/20 cursor-pointer hover:bg-teal-green/40"
                    onClick={() => resolveConflictWithSlot(slot)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary-green" />
                        <span className="font-medium text-primary-green">
                          {format(slot.date, "EEEE, d MMMM", { locale: es })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary-green" />
                        <span className="text-primary-green">
                          {slot.time} - {slot.endTime}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsResolveDialogOpen(false)}
              className="border-primary-green text-primary-green"
            >
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
