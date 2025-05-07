"use client"

import { useState } from "react"
import { Edit, MoreHorizontal, Plus, Search, Trash, Palette, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

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

// Datos de ejemplo
const initialNotes = [
  {
    id: 1,
    title: "Lista de compras",
    content: "- Leche\n- Pan\n- Huevos\n- Frutas\n- Verduras",
    createdAt: new Date(2025, 4, 1),
    updatedAt: new Date(2025, 4, 5),
    shared: [2, 3], // IDs de Ana y Carlos
    color: "purple",
  },
  {
    id: 2,
    title: "Tareas pendientes",
    content: "- Llamar al fontanero\n- Revisar facturas\n- Comprar regalo de cumpleaños para mamá",
    createdAt: new Date(2025, 4, 3),
    updatedAt: new Date(2025, 4, 3),
    shared: [2], // ID de Ana
    color: "teal",
  },
  {
    id: 3,
    title: "Receta de tarta de manzana",
    content:
      "Ingredientes:\n- 3 manzanas\n- 200g de harina\n- 150g de azúcar\n- 2 huevos\n- 100g de mantequilla\n\nPreparación:\n1. Pelar y cortar las manzanas\n2. Mezclar los ingredientes secos\n3. Añadir los huevos y la mantequilla\n4. Hornear a 180°C durante 45 minutos",
    createdAt: new Date(2025, 3, 20),
    updatedAt: new Date(2025, 3, 20),
    shared: [],
    color: "green",
  },
  {
    id: 4,
    title: "Ideas para vacaciones",
    content: "- Playa en Valencia\n- Montaña en Asturias\n- Visitar Barcelona\n- Tour por Andalucía",
    createdAt: new Date(2025, 4, 2),
    updatedAt: new Date(2025, 4, 6),
    shared: [2, 3, 4], // IDs de Ana, Carlos y María
    color: "yellow",
  },
  {
    id: 5,
    title: "Números de emergencia",
    content: "Policía: 091\nBomberos: 080\nEmergencias: 112\nMédico de guardia: 555-123-456",
    createdAt: new Date(2025, 4, 1),
    updatedAt: new Date(2025, 4, 1),
    shared: [],
    color: "orange",
  },
  {
    id: 6,
    title: "Películas para ver",
    content: "1. El Padrino\n2. Interestelar\n3. El Señor de los Anillos\n4. Matrix\n5. Origen",
    createdAt: new Date(2025, 4, 4),
    updatedAt: new Date(2025, 4, 4),
    shared: [3], // ID de Carlos
    color: "white",
  },
]

// Colores disponibles para las notas
const noteColors = [
  { id: "white", name: "Blanco", bg: "bg-white", border: "border-gray-300" },
  { id: "purple", name: "Morado", bg: "bg-[#BBA9D9]", border: "border-[#A996C7]" },
  { id: "teal", name: "Turquesa", bg: "bg-[#A3D1C6]", border: "border-[#90BEB3]" },
  { id: "green", name: "Verde", bg: "bg-[#B3D8A8]", border: "border-[#A0C595]" },
  { id: "yellow", name: "Amarillo", bg: "bg-[#D9D7A9]", border: "border-[#C6C496]" },
  { id: "orange", name: "Naranja", bg: "bg-[#D9B5A9]", border: "border-[#C6A296]" },
]

export function NotesView() {
  const [notes, setNotes] = useState(initialNotes)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [currentNote, setCurrentNote] = useState({
    id: 0,
    title: "",
    content: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    shared: [] as number[],
    color: "white",
  })
  const [isEditing, setIsEditing] = useState(false)
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false)
  const [filter, setFilter] = useState<"all" | "mine" | "shared">("all")
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    role: "parent",
  })

  // Filtrar notas según el término de búsqueda, el filtro seleccionado y el usuario actual
  const filteredNotes = notes.filter((note) => {
    // Filtrar por término de búsqueda
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())

    // Filtrar por tipo (todas, mis notas, compartidas)
    const matchesFilter =
      filter === "all" ||
      (filter === "mine" && note.shared.length === 0) ||
      (filter === "shared" && note.shared.length > 0)

    // Filtrar por usuario (si es un niño, solo mostrar las notas compartidas con él)
    const isAccessible = currentUser.role === "parent" || note.shared.includes(currentUser.id) || note.id % 2 === 0 // Simulación

    return matchesSearch && matchesFilter && isAccessible
  })

  // Función para crear una nueva nota
  const createNote = () => {
    setIsEditing(false)
    setCurrentNote({
      id: Date.now(),
      title: "",
      content: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      shared: [],
      color: "white",
    })
    setIsDialogOpen(true)
  }

  // Función para editar una nota existente
  const editNote = (note) => {
    setIsEditing(true)
    setCurrentNote(note)
    setIsDialogOpen(true)
  }

  // Función para guardar una nota (nueva o editada)
  const saveNote = () => {
    if (isEditing) {
      // Actualizar nota existente
      setNotes(notes.map((note) => (note.id === currentNote.id ? { ...currentNote, updatedAt: new Date() } : note)))
    } else {
      // Crear nueva nota
      setNotes([...notes, currentNote])
    }
    setIsDialogOpen(false)
  }

  // Función para eliminar una nota
  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  // Función para cambiar el color de una nota
  const changeNoteColor = (color) => {
    setCurrentNote({ ...currentNote, color })
    setIsColorPickerOpen(false)
  }

  // Función para abrir el diálogo de compartir
  const openShareDialog = (e, note) => {
    e.stopPropagation()
    setCurrentNote(note)
    setIsShareDialogOpen(true)
  }

  // Función para compartir una nota con un miembro de la familia
  const toggleShareWithMember = (memberId) => {
    const isShared = currentNote.shared.includes(memberId)
    let newShared = [...currentNote.shared]

    if (isShared) {
      newShared = newShared.filter((id) => id !== memberId)
    } else {
      newShared.push(memberId)
    }

    setCurrentNote({ ...currentNote, shared: newShared })
  }

  // Función para guardar los cambios de compartir
  const saveSharing = () => {
    setNotes(notes.map((note) => (note.id === currentNote.id ? { ...currentNote, updatedAt: new Date() } : note)))
    setIsShareDialogOpen(false)
  }

  // Obtener el color de fondo y borde para una nota
  const getNoteStyle = (colorId) => {
    const color = noteColors.find((c) => c.id === colorId) || noteColors[0]
    return `${color.bg} ${color.border}`
  }

  // Obtener los miembros de la familia con los que se comparte una nota
  const getSharedMembers = (sharedIds) => {
    return familyMembers.filter((member) => sharedIds.includes(member.id))
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-primary-green dark:text-white">Mis Notas</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-primary-green dark:text-gray-400" />
            <Input
              placeholder="Buscar notas..."
              className="pl-8 border-teal-green dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Tabs value={filter} onValueChange={(v) => setFilter(v as "all" | "mine" | "shared")}>
            <TabsList className="bg-teal-green dark:bg-gray-700">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-primary-green data-[state=active]:text-white text-primary-green dark:text-white dark:data-[state=active]:bg-gray-900"
              >
                Todas
              </TabsTrigger>
              <TabsTrigger
                value="mine"
                className="data-[state=active]:bg-primary-green data-[state=active]:text-white text-primary-green dark:text-white dark:data-[state=active]:bg-gray-900"
              >
                Mis notas
              </TabsTrigger>
              <TabsTrigger
                value="shared"
                className="data-[state=active]:bg-primary-green data-[state=active]:text-white text-primary-green dark:text-white dark:data-[state=active]:bg-gray-900"
              >
                Compartidas
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Button
            onClick={createNote}
            className="bg-primary-green hover:bg-primary-green/90 text-white dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            Nueva nota
          </Button>
        </div>
      </div>

      {filteredNotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <p className="text-muted-foreground mb-4 dark:text-gray-400">No se encontraron notas</p>
          <Button
            onClick={createNote}
            className="bg-primary-green hover:bg-primary-green/90 text-white dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            Crear una nota
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredNotes.map((note) => (
            <Card
              key={note.id}
              className={cn(
                "flex flex-col border-2 hover:shadow-md transition-shadow cursor-pointer dark:text-gray-900",
                getNoteStyle(note.color),
              )}
              onClick={() => editNote(note)}
            >
              <div className="p-4 flex-1">
                {note.title && <h3 className="font-medium text-primary-green dark:text-gray-900 mb-2">{note.title}</h3>}
                <div className="whitespace-pre-line text-sm text-primary-green/80 dark:text-gray-700 line-clamp-6">
                  {note.content}
                </div>
              </div>
              <div className="p-2 border-t flex items-center justify-between">
                <div className="flex -space-x-2">
                  {getSharedMembers(note.shared).map((member) => (
                    <Avatar key={member.id} className="h-6 w-6 border-2 border-white">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                      <AvatarFallback className="text-xs bg-teal-green text-primary-green">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <div className="flex items-center">
                  <span className="text-xs text-muted-foreground mr-2 dark:text-gray-600">
                    {format(note.updatedAt, "d MMM", { locale: es })}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-green dark:text-gray-600">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Opciones</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-cream dark:bg-gray-700">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          editNote(note)
                        }}
                        className="text-primary-green dark:text-white"
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => openShareDialog(e, note)}
                        className="text-primary-green dark:text-white"
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        Compartir
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteNote(note.id)
                        }}
                        className="text-destructive dark:text-red-400"
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] bg-cream dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="text-primary-green dark:text-white">
              {isEditing ? "Editar nota" : "Nueva nota"}
            </DialogTitle>
            <DialogDescription className="dark:text-gray-300">
              {isEditing
                ? "Modifica tu nota y guarda los cambios"
                : "Crea una nueva nota para compartir con tu familia"}
            </DialogDescription>
          </DialogHeader>
          <div className={cn("grid gap-4 py-4", getNoteStyle(currentNote.color))}>
            <div className="grid gap-2 px-4">
              <Input
                value={currentNote.title}
                onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
                placeholder="Título"
                className="border-none text-lg font-medium text-primary-green bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0 dark:text-gray-900"
              />
            </div>
            <div className="grid gap-2 px-4">
              <Textarea
                rows={10}
                value={currentNote.content}
                onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
                placeholder="Escribe aquí el contenido de tu nota..."
                className="border-none text-primary-green/80 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0 resize-none dark:text-gray-900"
              />
            </div>
          </div>
          <div className="flex justify-between items-center border-t pt-4 dark:border-gray-600">
            <div className="flex items-center gap-2">
              <DropdownMenu open={isColorPickerOpen} onOpenChange={setIsColorPickerOpen}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-primary-green border-teal-green dark:border-gray-600 dark:text-white"
                  >
                    <Palette className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="bg-cream dark:bg-gray-700">
                  <div className="grid grid-cols-3 gap-1 p-1">
                    {noteColors.map((color) => (
                      <Button
                        key={color.id}
                        variant="ghost"
                        className={cn("h-8 w-8 rounded-full", color.bg, color.border)}
                        onClick={() => changeNoteColor(color.id)}
                      />
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="outline"
                size="icon"
                className="text-primary-green border-teal-green dark:border-gray-600 dark:text-white"
                onClick={() => {
                  setIsDialogOpen(false)
                  setIsShareDialogOpen(true)
                }}
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
            <Button
              onClick={saveNote}
              disabled={!currentNote.content.trim()}
              className="bg-primary-green hover:bg-primary-green/90 text-white dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              {isEditing ? "Guardar cambios" : "Crear nota"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-cream dark:bg-gray-800">
          <DialogHeader>
            <DialogTitle className="text-primary-green dark:text-white">Compartir nota</DialogTitle>
            <DialogDescription className="dark:text-gray-300">
              Selecciona con qué miembros de la familia quieres compartir esta nota
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              {familyMembers
                .filter((member) => member.id !== 1)
                .map((member) => (
                  <div key={member.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`member-${member.id}`}
                      checked={currentNote.shared.includes(member.id)}
                      onCheckedChange={() => toggleShareWithMember(member.id)}
                    />
                    <Label htmlFor={`member-${member.id}`} className="flex items-center gap-2 cursor-pointer">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback className="bg-teal-green text-primary-green dark:bg-gray-600 dark:text-white">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-primary-green dark:text-white">{member.name}</span>
                    </Label>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsShareDialogOpen(false)}
              className="border-primary-green text-primary-green dark:border-gray-600 dark:text-white"
            >
              Cancelar
            </Button>
            <Button
              onClick={saveSharing}
              className="bg-primary-green hover:bg-primary-green/90 text-white dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Compartir
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
