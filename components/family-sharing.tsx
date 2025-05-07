"use client"

import { useState } from "react"
import { Check, Copy, Mail, Plus, Share2, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

// Datos de ejemplo
const familyMembers = [
  {
    id: 1,
    name: "Juan Pérez",
    email: "juan@example.com",
    role: "admin",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
  },
  {
    id: 2,
    name: "Ana Pérez",
    email: "ana@example.com",
    role: "admin",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
  },
  {
    id: 3,
    name: "Carlos Pérez",
    email: "carlos@example.com",
    role: "member",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
  },
  {
    id: 4,
    name: "María Pérez",
    email: "maria@example.com",
    role: "member",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
  },
  {
    id: 5,
    name: "Abuela Pérez",
    email: "abuela@example.com",
    role: "member",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "pending",
  },
]

const sharedItems = [
  {
    id: 1,
    type: "calendar",
    name: "Calendario Familiar",
    sharedWith: ["Ana Pérez", "Carlos Pérez", "María Pérez"],
    permissions: "edit",
  },
  {
    id: 2,
    type: "notes",
    name: "Lista de compras",
    sharedWith: ["Ana Pérez"],
    permissions: "edit",
  },
  {
    id: 3,
    type: "agenda",
    name: "Actividades escolares",
    sharedWith: ["Ana Pérez", "Carlos Pérez", "María Pérez"],
    permissions: "view",
  },
]

export function FamilySharing() {
  const [members, setMembers] = useState(familyMembers)
  const [items, setItems] = useState(sharedItems)
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState("member")
  const [shareItem, setShareItem] = useState({
    id: 0,
    type: "calendar",
    name: "",
    sharedWith: [] as string[],
    permissions: "view",
  })
  const [copied, setCopied] = useState(false)

  // Función para invitar a un nuevo miembro
  const inviteMember = () => {
    // Aquí iría la lógica para enviar la invitación
    setIsInviteDialogOpen(false)
    setInviteEmail("")
    setInviteRole("member")
  }

  // Función para compartir un elemento
  const shareNewItem = () => {
    setItems([...items, shareItem])
    setIsShareDialogOpen(false)
    setShareItem({
      id: Date.now(),
      type: "calendar",
      name: "",
      sharedWith: [],
      permissions: "view",
    })
  }

  // Función para eliminar un miembro
  const removeMember = (id: number) => {
    setMembers(members.filter((member) => member.id !== id))
  }

  // Función para dejar de compartir un elemento
  const unshareItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  // Función para copiar enlace de invitación
  const copyInviteLink = () => {
    navigator.clipboard.writeText("https://domusync.app/invite/family123")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Función para obtener el icono según el tipo de elemento
  const getItemIcon = (type: string) => {
    switch (type) {
      case "calendar":
        return "📅"
      case "notes":
        return "📝"
      case "agenda":
        return "📋"
      default:
        return "📄"
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="members">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="members">Miembros de la familia</TabsTrigger>
          <TabsTrigger value="shared">Elementos compartidos</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-primary-green">Familia Pérez</h2>
            <div className="flex items-center gap-2">
              <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Invitar miembro
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Invitar a un nuevo miembro</DialogTitle>
                    <DialogDescription>Envía una invitación para que se una a tu familia en DomuSync</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Correo electrónico</Label>
                      <Input
                        id="email"
                        type="email"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        placeholder="correo@ejemplo.com"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="role">Rol en la familia</Label>
                      <RadioGroup value={inviteRole} onValueChange={setInviteRole} className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="admin" id="admin" />
                          <Label htmlFor="admin">Administrador (control total)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="member" id="member" />
                          <Label htmlFor="member">Miembro (acceso limitado)</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={inviteMember} disabled={!inviteEmail.trim()}>
                      Enviar invitación
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button variant="outline" onClick={copyInviteLink}>
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copiar enlace
                  </>
                )}
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Miembros de la familia</CardTitle>
              <CardDescription>Gestiona quién tiene acceso a tu espacio familiar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {members.map((member) => (
                  <div key={member.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{member.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {member.email}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "text-xs px-2 py-1 rounded-full",
                          member.status === "active" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800",
                        )}
                      >
                        {member.status === "active" ? "Activo" : "Pendiente"}
                      </div>
                      <Select defaultValue={member.role} disabled={member.id === 1}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Administrador</SelectItem>
                          <SelectItem value="member">Miembro</SelectItem>
                        </SelectContent>
                      </Select>
                      {member.id !== 1 && (
                        <Button variant="ghost" size="icon" onClick={() => removeMember(member.id)}>
                          <X className="h-4 w-4" />
                          <span className="sr-only">Eliminar</span>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shared" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-primary-green">Elementos compartidos</h2>
            <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartir nuevo elemento
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Compartir elemento</DialogTitle>
                  <DialogDescription>Selecciona qué quieres compartir con tu familia</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="itemType">Tipo de elemento</Label>
                    <Select
                      value={shareItem.type}
                      onValueChange={(value) => setShareItem({ ...shareItem, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="calendar">Calendario</SelectItem>
                        <SelectItem value="notes">Notas</SelectItem>
                        <SelectItem value="agenda">Agenda</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="itemName">Nombre</Label>
                    <Input
                      id="itemName"
                      value={shareItem.name}
                      onChange={(e) => setShareItem({ ...shareItem, name: e.target.value })}
                      placeholder="Nombre del elemento"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="permissions">Permisos</Label>
                    <RadioGroup
                      value={shareItem.permissions}
                      onValueChange={(value) => setShareItem({ ...shareItem, permissions: value })}
                      className="flex flex-col space-y-1"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="view" id="view" />
                        <Label htmlFor="view">Solo ver</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="edit" id="edit" />
                        <Label htmlFor="edit">Ver y editar</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="grid gap-2">
                    <Label>Compartir con</Label>
                    <div className="space-y-2">
                      {members
                        .filter((m) => m.id !== 1)
                        .map((member) => (
                          <div key={member.id} className="flex items-center space-x-2">
                            <Switch
                              id={`share-${member.id}`}
                              checked={shareItem.sharedWith.includes(member.name)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setShareItem({
                                    ...shareItem,
                                    sharedWith: [...shareItem.sharedWith, member.name],
                                  })
                                } else {
                                  setShareItem({
                                    ...shareItem,
                                    sharedWith: shareItem.sharedWith.filter((name) => name !== member.name),
                                  })
                                }
                              }}
                            />
                            <Label htmlFor={`share-${member.id}`}>{member.name}</Label>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsShareDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={shareNewItem} disabled={!shareItem.name.trim() || shareItem.sharedWith.length === 0}>
                    Compartir
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Elementos compartidos</CardTitle>
              <CardDescription>Gestiona lo que compartes con tu familia</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        <span className="text-lg">{getItemIcon(item.type)}</span>
                      </div>
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Compartido con {item.sharedWith.length}{" "}
                          {item.sharedWith.length === 1 ? "persona" : "personas"}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "text-xs px-2 py-1 rounded-full",
                          item.permissions === "edit" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800",
                        )}
                      >
                        {item.permissions === "edit" ? "Edición" : "Solo lectura"}
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => unshareItem(item.id)}>
                        <X className="h-4 w-4" />
                        <span className="sr-only">Dejar de compartir</span>
                      </Button>
                    </div>
                  </div>
                ))}

                {items.length === 0 && (
                  <div className="flex flex-col items-center justify-center p-8 text-center">
                    <p className="text-muted-foreground mb-4">No hay elementos compartidos</p>
                    <Button onClick={() => setIsShareDialogOpen(true)}>Compartir algo</Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
