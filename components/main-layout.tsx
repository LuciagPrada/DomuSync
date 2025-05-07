"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  Calendar,
  ClipboardList,
  FileText,
  Menu,
  MessageSquareText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Newspaper,
  X,
  LogOut,
  UserCog,
  AlertTriangle,
  Moon,
  Sun,
  Monitor,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useMobile } from "@/hooks/use-mobile"
import { MiniCalendarWidget } from "@/components/widgets/mini-calendar-widget"
import { LatestNotesWidget } from "@/components/widgets/latest-notes-widget"
import { ParentingNewsWidget } from "@/components/widgets/parenting-news-widget"
import { AIAssistantWidget } from "@/components/widgets/ai-assistant-widget"
import { AgendaWidget } from "@/components/widgets/agenda-widget"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"

// Añadir los componentes de accesibilidad y ayuda
import { AccessibilityMenu } from "@/components/accessibility-menu"
import { HelpGuide } from "@/components/help-guide"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  // ... código existente ...
  const pathname = usePathname()
  const router = useRouter()
  const isMobile = useMobile()
  const [open, setOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false)
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false)
  const [isFamilyManagementDialogOpen, setIsFamilyManagementDialogOpen] = useState(false)
  const [isThemeDialogOpen, setIsThemeDialogOpen] = useState(false)
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState({
    id: 1,
    name: "Juan Pérez",
    avatar: "/placeholder.svg?height=40&width=40",
    initials: "JP",
    role: "parent",
  })
  const [currentTheme, setCurrentTheme] = useState<"light" | "classic" | "dark">("classic")

  // Datos de ejemplo para los perfiles infantiles
  const childProfiles = [
    {
      id: 3,
      name: "Carlos Pérez",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "CP",
      role: "child",
      age: 8,
    },
    {
      id: 4,
      name: "María Pérez",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MP",
      role: "child",
      age: 6,
    },
  ]

  // Determinar qué widget está activo (no se muestra cuando se está en su página correspondiente)
  const isCalendarPage = pathname === "/calendario"
  const isNotesPage = pathname === "/notas"
  const isAgendaPage = pathname === "/" || pathname === "/agenda"
  const isAssistantPage = pathname === "/asistente"
  const isNewsPage = pathname === "/novedades"

  // Función para navegar a una página y cerrar el menú móvil si está abierto
  const navigateTo = (path: string) => {
    router.push(path)
    if (isMobile && open) {
      setOpen(false)
    }
  }

  // Función para cambiar al perfil infantil
  const switchToChildProfile = (profile) => {
    setCurrentUser({
      id: profile.id,
      name: profile.name,
      avatar: profile.avatar,
      initials: profile.initials,
      role: "child",
    })
    setIsProfileDialogOpen(false)
  }

  // Función para volver al perfil de adulto
  const switchToAdultProfile = () => {
    setCurrentUser({
      id: 1,
      name: "Juan Pérez",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "JP",
      role: "parent",
    })
    setIsProfileDialogOpen(false)
  }

  // Función para cambiar el tema
  const changeTheme = (theme: "light" | "classic" | "dark") => {
    setCurrentTheme(theme)
    document.documentElement.classList.remove("theme-light", "theme-classic", "theme-dark")
    document.documentElement.classList.add(`theme-${theme}`)
    setIsThemeDialogOpen(false)
  }

  // Aplicar el tema al cargar
  useEffect(() => {
    document.documentElement.classList.add(`theme-${currentTheme}`)
  }, [])

  // Determinar colores según el tema
  const getThemeColors = () => {
    switch (currentTheme) {
      case "light":
        return {
          sidebar: "bg-white",
          header: "bg-white",
          text: "text-primary-green",
          icon: "text-primary-green",
        }
      case "dark":
        return {
          sidebar: "bg-gray-900",
          header: "bg-gray-900",
          text: "text-white",
          icon: "text-white",
        }
      default: // classic
        return {
          sidebar: "bg-primary-green",
          header: "bg-primary-green",
          text: "text-white",
          icon: "text-white",
        }
    }
  }

  const themeColors = getThemeColors()

  return (
    <div className="flex min-h-screen bg-cream dark:bg-gray-800">
      {!isMobile && (
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-10 hidden flex-col border-r transition-all duration-300 md:flex",
            themeColors.sidebar,
            collapsed ? "w-20" : "w-64",
            collapsed ? "overflow-hidden" : "overflow-auto",
          )}
        >
          <div className="flex items-center justify-between h-16 px-4">
            {!collapsed && (
              <>
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center",
                      currentTheme === "classic" || currentTheme === "dark" ? "bg-white" : "bg-primary-green",
                    )}
                  >
                    <span
                      className={
                        currentTheme === "classic" || currentTheme === "dark"
                          ? "text-primary-green font-bold"
                          : "text-white font-bold"
                      }
                    >
                      DS
                    </span>
                  </div>
                  <h1 className={cn("text-xl font-bold", themeColors.text)}>DomuSync</h1>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setCollapsed(true)} className={themeColors.icon}>
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </>
            )}
            {collapsed && (
              <>
                <div
                  className={cn(
                    "h-8 w-8 mx-auto rounded-full flex items-center justify-center",
                    currentTheme === "classic" || currentTheme === "dark" ? "bg-white" : "bg-primary-green",
                  )}
                >
                  <span
                    className={
                      currentTheme === "classic" || currentTheme === "dark"
                        ? "text-primary-green font-bold"
                        : "text-white font-bold"
                    }
                  >
                    DS
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCollapsed(false)}
                  className={cn("absolute right-2 top-5", themeColors.icon)}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </>
            )}
          </div>

          <div className="flex-1 px-2 space-y-4 pt-0">
            {!isAgendaPage && (
              <div
                className={cn("cursor-pointer transition-all", collapsed ? "mx-auto w-16" : "")}
                onClick={() => navigateTo("/")}
              >
                {collapsed ? (
                  <div className="flex flex-col items-center p-2 rounded-lg hover:bg-teal-green hover:bg-opacity-50">
                    <ClipboardList className={cn("h-6 w-6", themeColors.icon)} />
                    <span className={cn("text-xs mt-1", themeColors.text)}>Agenda</span>
                  </div>
                ) : (
                  <AgendaWidget />
                )}
              </div>
            )}

            {!isCalendarPage && (
              <div
                className={cn("cursor-pointer transition-all", collapsed ? "mx-auto w-16" : "")}
                onClick={() => navigateTo("/calendario")}
              >
                {collapsed ? (
                  <div className="flex flex-col items-center p-2 rounded-lg hover:bg-teal-green hover:bg-opacity-50">
                    <Calendar className={cn("h-6 w-6", themeColors.icon)} />
                    <span className={cn("text-xs mt-1", themeColors.text)}>Calendario</span>
                  </div>
                ) : (
                  <MiniCalendarWidget />
                )}
              </div>
            )}

            {!isNotesPage && (
              <div
                className={cn("cursor-pointer transition-all", collapsed ? "mx-auto w-16" : "")}
                onClick={() => navigateTo("/notas")}
              >
                {collapsed ? (
                  <div className="flex flex-col items-center p-2 rounded-lg hover:bg-teal-green hover:bg-opacity-50">
                    <FileText className={cn("h-6 w-6", themeColors.icon)} />
                    <span className={cn("text-xs mt-1", themeColors.text)}>Notas</span>
                  </div>
                ) : (
                  <LatestNotesWidget />
                )}
              </div>
            )}

            {!isNewsPage && (
              <div
                className={cn("cursor-pointer transition-all", collapsed ? "mx-auto w-16" : "")}
                onClick={() => navigateTo("/novedades")}
              >
                {collapsed ? (
                  <div className="flex flex-col items-center p-2 rounded-lg hover:bg-teal-green hover:bg-opacity-50">
                    <Newspaper className={cn("h-6 w-6", themeColors.icon)} />
                    <span className={cn("text-xs mt-1", themeColors.text)}>Novedades</span>
                  </div>
                ) : (
                  <ParentingNewsWidget />
                )}
              </div>
            )}

            {!isAssistantPage && (
              <div
                className={cn("cursor-pointer transition-all", collapsed ? "mx-auto w-16" : "")}
                onClick={() => navigateTo("/asistente")}
              >
                {collapsed ? (
                  <div className="flex flex-col items-center p-2 rounded-lg hover:bg-teal-green hover:bg-opacity-50">
                    <MessageSquareText className={cn("h-6 w-6", themeColors.icon)} />
                    <span className={cn("text-xs mt-1", themeColors.text)}>Asistente</span>
                  </div>
                ) : (
                  <AIAssistantWidget />
                )}
              </div>
            )}
          </div>
        </aside>
      )}

      <div
        className={cn(
          "flex flex-col flex-1 transition-all duration-300",
          !isMobile && (collapsed ? "md:pl-20" : "md:pl-64"),
        )}
      >
        <header
          className={cn("sticky top-0 z-30 flex h-16 items-center gap-4 border-b px-4 md:px-6", themeColors.header)}
        >
          {isMobile && (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <div className={cn("flex items-center justify-between border-b h-16 px-4", themeColors.sidebar)}>
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center",
                        currentTheme === "classic" || currentTheme === "dark" ? "bg-white" : "bg-primary-green",
                      )}
                    >
                      <span
                        className={
                          currentTheme === "classic" || currentTheme === "dark"
                            ? "text-primary-green font-bold"
                            : "text-white font-bold"
                        }
                      >
                        DS
                      </span>
                    </div>
                    <h1 className={cn("text-xl font-bold", themeColors.text)}>DomuSync</h1>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className={themeColors.icon}>
                    <X className="h-5 w-5" />
                    <span className="sr-only">Cerrar menú</span>
                  </Button>
                </div>

                <div className="p-4 space-y-4">
                  <div className="cursor-pointer" onClick={() => navigateTo("/")}>
                    <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors text-primary-green hover:bg-teal-green hover:bg-opacity-50">
                      <ClipboardList className="h-5 w-5" />
                      Agenda
                    </div>
                  </div>

                  <div className="cursor-pointer" onClick={() => navigateTo("/calendario")}>
                    <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors text-primary-green hover:bg-teal-green hover:bg-opacity-50">
                      <Calendar className="h-5 w-5" />
                      Calendario
                    </div>
                  </div>

                  <div className="cursor-pointer" onClick={() => navigateTo("/notas")}>
                    <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors text-primary-green hover:bg-teal-green hover:bg-opacity-50">
                      <FileText className="h-5 w-5" />
                      Notas
                    </div>
                  </div>

                  <div className="cursor-pointer" onClick={() => navigateTo("/novedades")}>
                    <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors text-primary-green hover:bg-teal-green hover:bg-opacity-50">
                      <Newspaper className="h-5 w-5" />
                      Novedades
                    </div>
                  </div>

                  <div className="cursor-pointer" onClick={() => navigateTo("/asistente")}>
                    <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors text-primary-green hover:bg-teal-green hover:bg-opacity-50">
                      <MessageSquareText className="h-5 w-5" />
                      Asistente IA
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}

          <div className="flex-1">
            <h1 className={cn("text-xl font-semibold", themeColors.text)}>
              {pathname === "/"
                ? "Agenda"
                : pathname === "/calendario"
                  ? "Calendario"
                  : pathname === "/notas"
                    ? "Notas"
                    : pathname === "/asistente"
                      ? "Asistente IA"
                      : pathname === "/novedades"
                        ? "Novedades"
                        : "DomuSync"}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Dialog open={isProfileDialogOpen} onOpenChange={setIsProfileDialogOpen}>
              <DialogTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt="Avatar" />
                  <AvatarFallback className="bg-teal-green text-primary-green">{currentUser.initials}</AvatarFallback>
                </Avatar>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-cream dark:bg-gray-800 dark:text-white">
                <DialogHeader>
                  <DialogTitle className="text-primary-green dark:text-white">Perfil de usuario</DialogTitle>
                  <DialogDescription className="dark:text-gray-300">
                    Gestiona tu perfil y cambia entre cuentas
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt="Avatar" />
                      <AvatarFallback className="bg-teal-green text-primary-green text-xl">
                        {currentUser.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-medium text-primary-green dark:text-white">{currentUser.name}</h3>
                      <p className="text-sm text-muted-foreground dark:text-gray-300">
                        {currentUser.role === "parent" ? "Cuenta de adulto" : "Cuenta infantil"}
                      </p>
                    </div>
                  </div>

                  {currentUser.role === "parent" ? (
                    <div className="space-y-4 mb-6">
                      <h4 className="text-sm font-medium text-primary-green dark:text-white">Perfiles infantiles</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {childProfiles.map((profile) => (
                          <Card
                            key={profile.id}
                            className="border-teal-green cursor-pointer hover:bg-teal-green/10 dark:bg-gray-700 dark:border-gray-600"
                            onClick={() => switchToChildProfile(profile)}
                          >
                            <CardContent className="p-3 flex flex-col items-center text-center">
                              <Avatar className="h-12 w-12 mb-2 mt-2">
                                <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                                <AvatarFallback className="bg-teal-green text-primary-green dark:bg-gray-600 dark:text-white">
                                  {profile.initials}
                                </AvatarFallback>
                              </Avatar>
                              <h4 className="text-sm font-medium text-primary-green dark:text-white">{profile.name}</h4>
                              <p className="text-xs text-muted-foreground dark:text-gray-300">{profile.age} años</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="mb-6">
                      <Button
                        variant="outline"
                        className="w-full justify-start border-teal-green text-primary-green hover:bg-teal-green/10 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700"
                        onClick={switchToAdultProfile}
                      >
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Juan Pérez" />
                          <AvatarFallback className="bg-teal-green text-primary-green text-xs dark:bg-gray-600 dark:text-white">
                            JP
                          </AvatarFallback>
                        </Avatar>
                        Volver a cuenta de adulto
                      </Button>
                    </div>
                  )}

                  <div className="pt-4 space-y-2 border-t dark:border-gray-600">
                    <Button
                      variant="outline"
                      className="w-full justify-start border-teal-green text-primary-green dark:border-gray-600 dark:text-white"
                      onClick={() => {
                        setIsProfileDialogOpen(false)
                        setIsSettingsDialogOpen(true)
                      }}
                    >
                      <UserCog className="mr-2 h-4 w-4" />
                      Configuración de cuenta
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-teal-green text-primary-green dark:border-gray-600 dark:text-white"
                      onClick={() => {
                        setIsProfileDialogOpen(false)
                        setIsFamilyManagementDialogOpen(true)
                      }}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Gestión familiar
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-teal-green text-primary-green dark:border-gray-600 dark:text-white"
                      onClick={() => {
                        setIsProfileDialogOpen(false)
                        setIsThemeDialogOpen(true)
                      }}
                    >
                      {currentTheme === "light" ? (
                        <Sun className="mr-2 h-4 w-4" />
                      ) : currentTheme === "dark" ? (
                        <Moon className="mr-2 h-4 w-4" />
                      ) : (
                        <Monitor className="mr-2 h-4 w-4" />
                      )}
                      Cambiar tema
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-teal-green text-primary-green dark:border-gray-600 dark:text-white"
                      onClick={() => {
                        setIsProfileDialogOpen(false)
                        setIsReportDialogOpen(true)
                      }}
                    >
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Reportar problemas
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-teal-green text-primary-green dark:border-gray-600 dark:text-white"
                      onClick={() => setIsProfileDialogOpen(false)}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Cerrar sesión
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 bg-cream dark:bg-gray-800">{children}</main>
      </div>

      {/* Añadir estos componentes justo antes del cierre del div principal */}
      <AccessibilityMenu />
      <HelpGuide />

      {/* Diálogo de configuración de cuenta */}
      <Dialog open={isSettingsDialogOpen} onOpenChange={setIsSettingsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-cream dark:bg-gray-800 dark:text-white">
          <DialogHeader>
            <DialogTitle className="text-primary-green dark:text-white">Configuración de cuenta</DialogTitle>
            <DialogDescription className="dark:text-gray-300">Gestiona las preferencias de tu cuenta</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid grid-cols-2 bg-teal-green w-full mb-4 dark:bg-gray-700">
                <TabsTrigger
                  value="profile"
                  className="data-[state=active]:bg-primary-green data-[state=active]:text-white text-primary-green dark:text-white dark:data-[state=active]:bg-gray-900"
                >
                  Perfil
                </TabsTrigger>
                <TabsTrigger
                  value="privacy"
                  className="data-[state=active]:bg-primary-green data-[state=active]:text-white text-primary-green dark:text-white dark:data-[state=active]:bg-gray-900"
                >
                  Privacidad
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right text-primary-green dark:text-white">
                    Nombre
                  </Label>
                  <Input
                    id="name"
                    defaultValue={currentUser.name}
                    className="col-span-3 border-teal-green dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="Tu nombre"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right text-primary-green dark:text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    defaultValue="juan@example.com"
                    className="col-span-3 border-teal-green dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="Tu email"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="bio" className="text-right text-primary-green dark:text-white">
                    Biografía
                  </Label>
                  <Textarea
                    id="bio"
                    defaultValue="Padre de familia interesado en la organización y la educación."
                    className="col-span-3 border-teal-green dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    placeholder="Algo sobre ti"
                  />
                </div>
              </TabsContent>

              <TabsContent value="privacy" className="space-y-4">
                <div className="space-y-4">
                  <div className="border-b pb-4 dark:border-gray-600">
                    <h3 className="text-lg font-medium text-primary-green mb-2 dark:text-white">
                      Visibilidad del perfil
                    </h3>
                    <RadioGroup defaultValue="family" className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="family" id="family" />
                        <Label htmlFor="family" className="text-primary-green dark:text-white">
                          Solo familia
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="friends" id="friends" />
                        <Label htmlFor="friends" className="text-primary-green dark:text-white">
                          Familia y amigos
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="public" id="public" />
                        <Label htmlFor="public" className="text-primary-green dark:text-white">
                          Público
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="border-b pb-4 dark:border-gray-600">
                    <h3 className="text-lg font-medium text-primary-green mb-2 dark:text-white">Compartir actividad</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="share-calendar" className="text-primary-green dark:text-white">
                          Compartir calendario
                        </Label>
                        <Switch id="share-calendar" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="share-tasks" className="text-primary-green dark:text-white">
                          Compartir tareas
                        </Label>
                        <Switch id="share-tasks" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="share-notes" className="text-primary-green dark:text-white">
                          Compartir notas
                        </Label>
                        <Switch id="share-notes" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-primary-green mb-2 dark:text-white">Datos y privacidad</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="data-collection" className="text-primary-green dark:text-white">
                          Recopilación de datos de uso
                        </Label>
                        <Switch id="data-collection" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="personalized-content" className="text-primary-green dark:text-white">
                          Contenido personalizado
                        </Label>
                        <Switch id="personalized-content" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="location" className="text-primary-green dark:text-white">
                          Compartir ubicación
                        </Label>
                        <Switch id="location" />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsSettingsDialogOpen(false)}
              className="border-primary-green text-primary-green dark:border-gray-600 dark:text-white"
            >
              Cancelar
            </Button>
            <Button
              onClick={() => setIsSettingsDialogOpen(false)}
              className="bg-primary-green hover:bg-primary-green/90 text-white dark:bg-gray-700"
            >
              Guardar cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de gestión familiar */}
      <Dialog open={isFamilyManagementDialogOpen} onOpenChange={setIsFamilyManagementDialogOpen}>
        <DialogContent className="sm:max-w-[600px] bg-cream dark:bg-gray-800 dark:text-white">
          <DialogHeader>
            <DialogTitle className="text-primary-green dark:text-white">Gestión familiar</DialogTitle>
            <DialogDescription className="dark:text-gray-300">Administra los miembros de tu familia</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Card className="border-teal-green dark:border-gray-600 dark:bg-gray-700">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-primary-green dark:text-white">Miembros de la familia</CardTitle>
                  <Button size="sm" className="bg-primary-green hover:bg-primary-green/90 text-white dark:bg-gray-900">
                    Invitar
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Juan Pérez" />
                        <AvatarFallback className="bg-teal-green text-primary-green dark:bg-gray-600 dark:text-white">
                          JP
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-primary-green font-medium dark:text-white">Juan Pérez</p>
                        <p className="text-xs text-muted-foreground dark:text-gray-300">Administrador</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      Activo
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Ana Pérez" />
                        <AvatarFallback className="bg-teal-green text-primary-green dark:bg-gray-600 dark:text-white">
                          AP
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-primary-green font-medium dark:text-white">Ana Pérez</p>
                        <p className="text-xs text-muted-foreground dark:text-gray-300">Administrador</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      Activo
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Carlos Pérez" />
                        <AvatarFallback className="bg-teal-green text-primary-green dark:bg-gray-600 dark:text-white">
                          CP
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-primary-green font-medium dark:text-white">Carlos Pérez</p>
                        <p className="text-xs text-muted-foreground dark:text-gray-300">Hijo (8 años)</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      Activo
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="María Pérez" />
                        <AvatarFallback className="bg-teal-green text-primary-green dark:bg-gray-600 dark:text-white">
                          MP
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-primary-green font-medium dark:text-white">María Pérez</p>
                        <p className="text-xs text-muted-foreground dark:text-gray-300">Hija (6 años)</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      Activo
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <DialogFooter>
            <Button
              onClick={() => setIsFamilyManagementDialogOpen(false)}
              className="bg-primary-green hover:bg-primary-green/90 text-white dark:bg-gray-700"
            >
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de cambio de tema */}
      <Dialog open={isThemeDialogOpen} onOpenChange={setIsThemeDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-cream dark:bg-gray-800 dark:text-white">
          <DialogHeader>
            <DialogTitle className="text-primary-green dark:text-white">Cambiar tema</DialogTitle>
            <DialogDescription className="dark:text-gray-300">
              Selecciona el tema que prefieras para la aplicación
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div
              className={cn(
                "flex items-center p-4 rounded-lg border-2 cursor-pointer",
                currentTheme === "light"
                  ? "border-primary-green bg-teal-green/10"
                  : "border-gray-200 dark:border-gray-700",
              )}
              onClick={() => changeTheme("light")}
            >
              <Sun className="h-6 w-6 mr-4 text-primary-green dark:text-white" />
              <div>
                <h3 className="font-medium text-primary-green dark:text-white">Tema claro</h3>
                <p className="text-sm text-muted-foreground dark:text-gray-300">Interfaz clara con barras blancas</p>
              </div>
            </div>

            <div
              className={cn(
                "flex items-center p-4 rounded-lg border-2 cursor-pointer",
                currentTheme === "classic"
                  ? "border-primary-green bg-teal-green/10"
                  : "border-gray-200 dark:border-gray-700",
              )}
              onClick={() => changeTheme("classic")}
            >
              <Monitor className="h-6 w-6 mr-4 text-primary-green dark:text-white" />
              <div>
                <h3 className="font-medium text-primary-green dark:text-white">Tema clásico</h3>
                <p className="text-sm text-muted-foreground dark:text-gray-300">
                  Interfaz con barras verdes (por defecto)
                </p>
              </div>
            </div>

            <div
              className={cn(
                "flex items-center p-4 rounded-lg border-2 cursor-pointer",
                currentTheme === "dark"
                  ? "border-primary-green bg-teal-green/10"
                  : "border-gray-200 dark:border-gray-700",
              )}
              onClick={() => changeTheme("dark")}
            >
              <Moon className="h-6 w-6 mr-4 text-primary-green dark:text-white" />
              <div>
                <h3 className="font-medium text-primary-green dark:text-white">Tema oscuro</h3>
                <p className="text-sm text-muted-foreground dark:text-gray-300">Interfaz oscura para uso nocturno</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsThemeDialogOpen(false)}
              className="border-primary-green text-primary-green dark:border-gray-600 dark:text-white"
            >
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Diálogo de reportar problemas */}
      <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-cream dark:bg-gray-800 dark:text-white">
          <DialogHeader>
            <DialogTitle className="text-primary-green dark:text-white">Reportar problemas</DialogTitle>
            <DialogDescription className="dark:text-gray-300">
              Cuéntanos qué problemas has encontrado en la aplicación
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="issue-type" className="text-primary-green dark:text-white">
                Tipo de problema
              </Label>
              <select
                id="issue-type"
                className="w-full p-2 rounded-md border border-teal-green dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="bug">Error en la aplicación</option>
                <option value="feature">Sugerencia de mejora</option>
                <option value="account">Problema con mi cuenta</option>
                <option value="other">Otro</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="issue-description" className="text-primary-green dark:text-white">
                Descripción
              </Label>
              <Textarea
                id="issue-description"
                placeholder="Describe el problema con detalle..."
                className="border-teal-green min-h-[150px] dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-primary-green dark:text-white">Adjuntar capturas de pantalla</Label>
              <div className="border-2 border-dashed border-teal-green rounded-md p-6 text-center dark:border-gray-600">
                <p className="text-sm text-muted-foreground dark:text-gray-300">
                  Arrastra y suelta imágenes aquí o haz clic para seleccionar
                </p>
                <input type="file" id="file-upload" className="hidden" accept="image/*" multiple />
                <Button
                  variant="outline"
                  className="mt-2 border-teal-green text-primary-green dark:border-gray-600 dark:text-white"
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  Seleccionar archivos
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsReportDialogOpen(false)}
              className="border-primary-green text-primary-green dark:border-gray-600 dark:text-white"
            >
              Cancelar
            </Button>
            <Button
              onClick={() => setIsReportDialogOpen(false)}
              className="bg-primary-green hover:bg-primary-green/90 text-white dark:bg-gray-700"
            >
              Enviar reporte
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
