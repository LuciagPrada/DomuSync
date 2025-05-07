"use client"

import { useState, useEffect } from "react"
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
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Eye, Type, Volume2, HelpCircle, Lightbulb, MousePointer, Keyboard, Monitor } from "lucide-react"

export function AccessibilityMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [fontSize, setFontSize] = useState(100)
  const [highContrast, setHighContrast] = useState(false)
  const [screenReader, setScreenReader] = useState(false)
  const [animations, setAnimations] = useState(true)
  const [keyboardNavigation, setKeyboardNavigation] = useState(false)
  const [autoDescriptions, setAutoDescriptions] = useState(false)
  const [cursorSize, setCursorSize] = useState("normal")

  // Aplicar el tamaño de fuente al documento
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`
    return () => {
      document.documentElement.style.fontSize = "100%"
    }
  }, [fontSize])

  // Aplicar alto contraste
  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }
    return () => {
      document.documentElement.classList.remove("high-contrast")
    }
  }, [highContrast])

  // Aplicar animaciones
  useEffect(() => {
    if (!animations) {
      document.documentElement.classList.add("reduce-motion")
    } else {
      document.documentElement.classList.remove("reduce-motion")
    }
    return () => {
      document.documentElement.classList.remove("reduce-motion")
    }
  }, [animations])

  // Aplicar tamaño del cursor
  useEffect(() => {
    document.documentElement.setAttribute("data-cursor", cursorSize)
    return () => {
      document.documentElement.removeAttribute("data-cursor")
    }
  }, [cursorSize])

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 rounded-full h-12 w-12 bg-primary-green text-white hover:bg-primary-green/90 dark:bg-gray-700 dark:hover:bg-gray-600"
        aria-label="Opciones de accesibilidad"
      >
        <Eye className="h-6 w-6" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px] bg-cream dark:bg-gray-800 dark:text-white">
          <DialogHeader>
            <DialogTitle className="text-primary-green dark:text-white">Opciones de accesibilidad</DialogTitle>
            <DialogDescription className="dark:text-gray-300">
              Personaliza la aplicación para adaptarla a tus necesidades
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="visual" className="w-full">
            <TabsList className="grid grid-cols-3 bg-teal-green w-full mb-4 dark:bg-gray-700">
              <TabsTrigger
                value="visual"
                className="data-[state=active]:bg-primary-green data-[state=active]:text-white text-primary-green dark:text-white dark:data-[state=active]:bg-gray-900"
              >
                <Type className="h-4 w-4 mr-2" />
                Visual
              </TabsTrigger>
              <TabsTrigger
                value="audio"
                className="data-[state=active]:bg-primary-green data-[state=active]:text-white text-primary-green dark:text-white dark:data-[state=active]:bg-gray-900"
              >
                <Volume2 className="h-4 w-4 mr-2" />
                Audio
              </TabsTrigger>
              <TabsTrigger
                value="interaction"
                className="data-[state=active]:bg-primary-green data-[state=active]:text-white text-primary-green dark:text-white dark:data-[state=active]:bg-gray-900"
              >
                <MousePointer className="h-4 w-4 mr-2" />
                Interacción
              </TabsTrigger>
            </TabsList>

            <TabsContent value="visual" className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="font-size" className="text-primary-green dark:text-white flex items-center">
                      <Type className="h-4 w-4 mr-2" />
                      Tamaño de texto: {fontSize}%
                    </Label>
                  </div>
                  <Slider
                    id="font-size"
                    min={75}
                    max={200}
                    step={5}
                    value={[fontSize]}
                    onValueChange={(value) => setFontSize(value[0])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground dark:text-gray-400">
                    <span>Pequeño</span>
                    <span>Normal</span>
                    <span>Grande</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Label htmlFor="high-contrast" className="text-primary-green dark:text-white flex items-center">
                    <Monitor className="h-4 w-4 mr-2" />
                    Alto contraste
                  </Label>
                  <Switch id="high-contrast" checked={highContrast} onCheckedChange={setHighContrast} />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Label htmlFor="animations" className="text-primary-green dark:text-white flex items-center">
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Animaciones
                  </Label>
                  <Switch id="animations" checked={animations} onCheckedChange={setAnimations} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="audio" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="screen-reader" className="text-primary-green dark:text-white flex items-center">
                    <Volume2 className="h-4 w-4 mr-2" />
                    Lector de pantalla
                  </Label>
                  <Switch id="screen-reader" checked={screenReader} onCheckedChange={setScreenReader} />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Label htmlFor="auto-descriptions" className="text-primary-green dark:text-white flex items-center">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Autodescripción de elementos
                  </Label>
                  <Switch id="auto-descriptions" checked={autoDescriptions} onCheckedChange={setAutoDescriptions} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="interaction" className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="keyboard-navigation" className="text-primary-green dark:text-white flex items-center">
                    <Keyboard className="h-4 w-4 mr-2" />
                    Navegación por teclado
                  </Label>
                  <Switch
                    id="keyboard-navigation"
                    checked={keyboardNavigation}
                    onCheckedChange={setKeyboardNavigation}
                  />
                </div>

                <div className="space-y-2 pt-2">
                  <Label className="text-primary-green dark:text-white flex items-center">
                    <MousePointer className="h-4 w-4 mr-2" />
                    Tamaño del cursor
                  </Label>
                  <RadioGroup value={cursorSize} onValueChange={setCursorSize} className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="normal" id="cursor-normal" />
                      <Label htmlFor="cursor-normal" className="text-primary-green dark:text-white">
                        Normal
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="large" id="cursor-large" />
                      <Label htmlFor="cursor-large" className="text-primary-green dark:text-white">
                        Grande
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="extra-large" id="cursor-extra-large" />
                      <Label htmlFor="cursor-extra-large" className="text-primary-green dark:text-white">
                        Extra grande
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button
              onClick={() => {
                // Restablecer valores predeterminados
                setFontSize(100)
                setHighContrast(false)
                setScreenReader(false)
                setAnimations(true)
                setKeyboardNavigation(false)
                setAutoDescriptions(false)
                setCursorSize("normal")
              }}
              variant="outline"
              className="border-primary-green text-primary-green dark:border-gray-600 dark:text-white"
            >
              Restablecer
            </Button>
            <Button
              onClick={() => setIsOpen(false)}
              className="bg-primary-green hover:bg-primary-green/90 text-white dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
