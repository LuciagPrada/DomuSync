"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HelpCircle, Calendar, ClipboardList, FileText, MessageSquareText, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function HelpGuide() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 z-50 rounded-full h-12 w-12 bg-primary-green text-white hover:bg-primary-green/90 dark:bg-gray-700 dark:hover:bg-gray-600"
        aria-label="Guía de ayuda"
      >
        <HelpCircle className="h-6 w-6" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[700px] bg-cream dark:bg-gray-800 dark:text-white">
          <DialogHeader>
            <DialogTitle className="text-primary-green dark:text-white">Guía de ayuda de DomuSync</DialogTitle>
            <DialogDescription className="dark:text-gray-300">
              Aprende a utilizar todas las funciones de la aplicación familiar
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="inicio" className="w-full">
            <TabsList className="grid grid-cols-4 bg-teal-green w-full mb-4 dark:bg-gray-700">
              <TabsTrigger
                value="inicio"
                className="data-[state=active]:bg-primary-green data-[state=active]:text-white text-primary-green dark:text-white dark:data-[state=active]:bg-gray-900"
              >
                Inicio
              </TabsTrigger>
              <TabsTrigger
                value="funciones"
                className="data-[state=active]:bg-primary-green data-[state=active]:text-white text-primary-green dark:text-white dark:data-[state=active]:bg-gray-900"
              >
                Funciones
              </TabsTrigger>
              <TabsTrigger
                value="perfiles"
                className="data-[state=active]:bg-primary-green data-[state=active]:text-white text-primary-green dark:text-white dark:data-[state=active]:bg-gray-900"
              >
                Perfiles
              </TabsTrigger>
              <TabsTrigger
                value="ajustes"
                className="data-[state=active]:bg-primary-green data-[state=active]:text-white text-primary-green dark:text-white dark:data-[state=active]:bg-gray-900"
              >
                Ajustes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="inicio" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-primary-green dark:text-white">Bienvenido a DomuSync</h3>
                <p className="text-muted-foreground dark:text-gray-300">
                  DomuSync es tu aplicación familiar todo en uno para organizar calendarios, tareas, notas y más. Aquí
                  tienes una guía rápida para empezar:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Card className="border-teal-green dark:border-gray-700 dark:bg-gray-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-primary-green dark:text-white text-sm">Navegación principal</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <ClipboardList className="h-4 w-4 text-primary-green dark:text-white" />
                          <span className="dark:text-gray-300">Agenda: Gestiona tus tareas diarias</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary-green dark:text-white" />
                          <span className="dark:text-gray-300">Calendario: Vista mensual de eventos</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-primary-green dark:text-white" />
                          <span className="dark:text-gray-300">Notas: Comparte notas con la familia</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <MessageSquareText className="h-4 w-4 text-primary-green dark:text-white" />
                          <span className="dark:text-gray-300">Asistente: IA para ayuda familiar</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-teal-green dark:border-gray-700 dark:bg-gray-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-primary-green dark:text-white text-sm">Primeros pasos</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ol className="space-y-2 text-sm list-decimal pl-5">
                        <li className="dark:text-gray-300">Configura tu perfil familiar</li>
                        <li className="dark:text-gray-300">Añade miembros de la familia</li>
                        <li className="dark:text-gray-300">Crea tu primera tarea en la agenda</li>
                        <li className="dark:text-gray-300">Programa un evento en el calendario</li>
                        <li className="dark:text-gray-300">Explora las opciones de accesibilidad</li>
                      </ol>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="funciones" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-primary-green dark:text-white">Funciones principales</h3>

                <div className="space-y-4 overflow-y-auto max-h-[60vh] pr-2">
                  <Card className="border-teal-green dark:border-gray-700 dark:bg-gray-700">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                      <CardTitle className="text-primary-green dark:text-white text-sm flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Calendario
                      </CardTitle>
                      <ChevronRight className="h-4 w-4 text-primary-green dark:text-white" />
                    </CardHeader>
                    <CardContent className="text-sm dark:text-gray-300">
                      <div className="border-l-2 border-teal-green pl-3 dark:border-teal-green/50">
                        <p>El calendario te permite:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                          <li>Ver eventos por día, semana o mes</li>
                          <li>Crear eventos y asignarlos a miembros de la familia</li>
                          <li>Recibir recordatorios de eventos importantes</li>
                          <li>Sincronizar con otros calendarios</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-teal-green dark:border-gray-700 dark:bg-gray-700">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                      <CardTitle className="text-primary-green dark:text-white text-sm flex items-center">
                        <ClipboardList className="h-4 w-4 mr-2" />
                        Agenda
                      </CardTitle>
                      <ChevronRight className="h-4 w-4 text-primary-green dark:text-white" />
                    </CardHeader>
                    <CardContent className="text-sm dark:text-gray-300">
                      <div className="border-l-2 border-teal-green pl-3 dark:border-teal-green/50">
                        <p>La agenda te permite:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                          <li>Crear y asignar tareas a miembros de la familia</li>
                          <li>Establecer prioridades y fechas límite</li>
                          <li>Marcar tareas como completadas</li>
                          <li>Organizar tareas por categorías</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-teal-green dark:border-gray-700 dark:bg-gray-700">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                      <CardTitle className="text-primary-green dark:text-white text-sm flex items-center">
                        <MessageSquareText className="h-4 w-4 mr-2" />
                        Asistente IA
                      </CardTitle>
                      <ChevronRight className="h-4 w-4 text-primary-green dark:text-white" />
                    </CardHeader>
                    <CardContent className="text-sm dark:text-gray-300">
                      <div className="border-l-2 border-teal-green pl-3 dark:border-teal-green/50">
                        <p>El asistente IA te ayuda con:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                          <li>Sugerencias para organizar actividades familiares</li>
                          <li>Planificación de comidas y recetas</li>
                          <li>Consejos para la educación de los niños</li>
                          <li>Respuestas a preguntas sobre organización familiar</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="perfiles" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-primary-green dark:text-white">Gestión de perfiles</h3>
                <p className="text-muted-foreground dark:text-gray-300">
                  DomuSync permite crear perfiles para cada miembro de la familia, con diferentes niveles de acceso:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <Card className="border-teal-green dark:border-gray-700 dark:bg-gray-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-primary-green dark:text-white text-sm">Perfiles de adultos</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm dark:text-gray-300">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Acceso completo a todas las funciones</li>
                        <li>Capacidad para añadir/eliminar miembros</li>
                        <li>Gestión de permisos de los perfiles infantiles</li>
                        <li>Configuración de la cuenta familiar</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-teal-green dark:border-gray-700 dark:bg-gray-700">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-primary-green dark:text-white text-sm">Perfiles infantiles</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm dark:text-gray-300">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Interfaz adaptada a su edad</li>
                        <li>Acceso limitado a funciones específicas</li>
                        <li>Visualización de sus tareas y eventos</li>
                        <li>Posibilidad de marcar tareas como completadas</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-primary-green dark:text-white mb-2">
                    Cómo cambiar entre perfiles
                  </h4>
                  <ol className="list-decimal pl-5 text-sm space-y-1 dark:text-gray-300">
                    <li>Haz clic en tu avatar en la esquina superior derecha</li>
                    <li>Selecciona "Perfil de usuario" en el menú desplegable</li>
                    <li>En la sección "Perfiles infantiles", selecciona el perfil al que quieres cambiar</li>
                    <li>Para volver al perfil de adulto, haz clic en "Volver a cuenta de adulto"</li>
                  </ol>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ajustes" className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-primary-green dark:text-white">
                  Configuración y accesibilidad
                </h3>

                <Card className="border-teal-green dark:border-gray-700 dark:bg-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-primary-green dark:text-white text-sm">Temas de la aplicación</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm dark:text-gray-300">
                    <p>DomuSync ofrece tres temas diferentes:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>
                        <strong>Tema claro:</strong> Interfaz clara con barras blancas
                      </li>
                      <li>
                        <strong>Tema clásico:</strong> Interfaz con barras verdes (por defecto)
                      </li>
                      <li>
                        <strong>Tema oscuro:</strong> Interfaz oscura para uso nocturno
                      </li>
                    </ul>
                    <p className="mt-2">Para cambiar el tema, haz clic en tu avatar y selecciona "Cambiar tema".</p>
                  </CardContent>
                </Card>

                <Card className="border-teal-green dark:border-gray-700 dark:bg-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-primary-green dark:text-white text-sm">
                      Opciones de accesibilidad
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm dark:text-gray-300">
                    <p>Puedes personalizar la aplicación para adaptarla a tus necesidades:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Ajustar el tamaño del texto</li>
                      <li>Activar el modo de alto contraste</li>
                      <li>Habilitar la navegación por teclado</li>
                      <li>Activar el lector de pantalla</li>
                      <li>Cambiar el tamaño del cursor</li>
                    </ul>
                    <p className="mt-2">
                      Accede a estas opciones haciendo clic en el botón de accesibilidad (icono de ojo) en la esquina
                      inferior derecha de la pantalla.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button
              onClick={() => setIsOpen(false)}
              className="bg-primary-green hover:bg-primary-green/90 text-white dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Entendido
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
