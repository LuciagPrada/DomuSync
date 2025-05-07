"use client"

import { useState } from "react"
import { Search, Filter, BookOpen, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Datos de ejemplo
const newsArticles = [
  {
    id: 1,
    title: "10 actividades para estimular la creatividad de tus hijos",
    summary:
      "Descubre actividades divertidas que ayudarán a desarrollar la creatividad y la imaginación de tus hijos en casa.",
    content:
      "La creatividad es una habilidad fundamental para el desarrollo infantil. En este artículo, te presentamos 10 actividades que puedes realizar en casa para estimular la creatividad de tus hijos. Desde manualidades con materiales reciclados hasta juegos de rol, estas actividades no solo son divertidas, sino que también ayudan a desarrollar habilidades cognitivas importantes.",
    image: "/placeholder.svg?height=200&width=400",
    category: "actividades",
    source: "Crianza Positiva",
    date: "2025-05-01",
    readTime: "5 min",
    ageGroup: "3-6 años",
  },
  {
    id: 2,
    title: "Cómo manejar las rabietas de forma efectiva",
    summary: "Estrategias prácticas para padres que enfrentan rabietas y berrinches en niños pequeños.",
    content:
      "Las rabietas son una parte normal del desarrollo infantil, pero pueden ser desafiantes para los padres. Este artículo ofrece estrategias basadas en evidencia para manejar las rabietas de manera efectiva, entendiendo sus causas y respondiendo de forma que promueva el desarrollo emocional saludable de tu hijo.",
    image: "/placeholder.svg?height=200&width=400",
    category: "comportamiento",
    source: "Psicología Infantil",
    date: "2025-04-28",
    readTime: "8 min",
    ageGroup: "2-5 años",
  },
  {
    id: 3,
    title: "Recetas saludables para niños quisquillosos con la comida",
    summary: "Ideas de comidas nutritivas que incluso los niños más exigentes disfrutarán.",
    content:
      "Alimentar a niños quisquillosos puede ser un desafío. Este artículo presenta recetas saludables y trucos para hacer que las comidas sean más atractivas para los niños que son selectivos con la comida, asegurando que reciban los nutrientes que necesitan para crecer sanos y fuertes.",
    image: "/placeholder.svg?height=200&width=400",
    category: "nutrición",
    source: "Nutrición Familiar",
    date: "2025-04-25",
    readTime: "6 min",
    ageGroup: "Todas las edades",
  },
  {
    id: 4,
    title: "Guía para establecer rutinas de sueño efectivas",
    summary: "Consejos para ayudar a tus hijos a desarrollar hábitos de sueño saludables.",
    content:
      "El sueño adecuado es crucial para el desarrollo infantil. Esta guía ofrece consejos prácticos para establecer rutinas de sueño efectivas, abordar problemas comunes como la resistencia a la hora de dormir, y crear un ambiente propicio para un descanso reparador.",
    image: "/placeholder.svg?height=200&width=400",
    category: "salud",
    source: "Pediatría Moderna",
    date: "2025-04-20",
    readTime: "7 min",
    ageGroup: "0-10 años",
  },
  {
    id: 5,
    title: "Juegos educativos que puedes hacer en casa",
    summary: "Actividades divertidas que combinan aprendizaje y juego para diferentes edades.",
    content:
      "El juego es la forma natural de aprendizaje para los niños. Este artículo presenta una variedad de juegos educativos que puedes implementar en casa con materiales simples, adaptados a diferentes edades y enfocados en desarrollar habilidades específicas como matemáticas, lenguaje y pensamiento crítico.",
    image: "/placeholder.svg?height=200&width=400",
    category: "educación",
    source: "Educación en Casa",
    date: "2025-04-15",
    readTime: "5 min",
    ageGroup: "3-12 años",
  },
  {
    id: 6,
    title: "Cómo hablar con tus hijos sobre temas difíciles",
    summary: "Guía para abordar conversaciones complicadas de manera apropiada según la edad.",
    content:
      "Los padres a menudo se preguntan cómo abordar temas difíciles como la muerte, el divorcio o eventos traumáticos con sus hijos. Este artículo ofrece orientación sobre cómo tener estas conversaciones de manera apropiada según la edad, honesta y reconfortante.",
    image: "/placeholder.svg?height=200&width=400",
    category: "comunicación",
    source: "Psicología Familiar",
    date: "2025-04-10",
    readTime: "9 min",
    ageGroup: "Todas las edades",
  },
]

export function ParentingNewsView() {
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState<string>("all")
  const [ageGroup, setAgeGroup] = useState<string>("all")
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null)

  // Filtrar artículos según los criterios
  const filteredArticles = newsArticles.filter(
    (article) =>
      (article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.summary.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (category === "all" || article.category === category) &&
      (ageGroup === "all" || article.ageGroup === ageGroup || article.ageGroup === "Todas las edades"),
  )

  // Obtener el artículo seleccionado
  const article = selectedArticle !== null ? newsArticles.find((a) => a.id === selectedArticle) : null

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-primary-green">Novedades sobre Crianza</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-primary-green" />
            <Input
              placeholder="Buscar artículos..."
              className="pl-8 border-teal-green"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="border-teal-green text-primary-green">
                <Filter className="h-4 w-4 mr-2" />
                Filtrar
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-cream">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm text-primary-green mb-2">Categoría</h4>
                  <Tabs value={category} onValueChange={setCategory} className="w-full">
                    <TabsList className="grid grid-cols-3 bg-teal-green">
                      <TabsTrigger
                        value="all"
                        className="data-[state=active]:bg-primary-green data-[state=active]:text-white text-primary-green"
                      >
                        Todas
                      </TabsTrigger>
                      <TabsTrigger
                        value="actividades"
                        className="data-[state=active]:bg-primary-green data-[state=active]:text-white text-primary-green"
                      >
                        Actividades
                      </TabsTrigger>
                      <TabsTrigger
                        value="nutrición"
                        className="data-[state=active]:bg-primary-green data-[state=active]:text-white text-primary-green"
                      >
                        Nutrición
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <Tabs value={category} onValueChange={setCategory} className="w-full mt-2">
                    <TabsList className="grid grid-cols-3 bg-teal-green">
                      <TabsTrigger
                        value="salud"
                        className="data-[state=active]:bg-primary-green data-[state=active]:text-white text-primary-green"
                      >
                        Salud
                      </TabsTrigger>
                      <TabsTrigger
                        value="educación"
                        className="data-[state=active]:bg-primary-green data-[state=active]:text-white text-primary-green"
                      >
                        Educación
                      </TabsTrigger>
                      <TabsTrigger
                        value="comportamiento"
                        className="data-[state=active]:bg-primary-green data-[state=active]:text-white text-primary-green"
                      >
                        Comportamiento
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-primary-green mb-2">Edad</h4>
                  <Tabs value={ageGroup} onValueChange={setAgeGroup} className="w-full">
                    <TabsList className="grid grid-cols-3 bg-teal-green">
                      <TabsTrigger
                        value="all"
                        className="data-[state=active]:bg-primary-green data-[state=active]:text-white text-primary-green"
                      >
                        Todas
                      </TabsTrigger>
                      <TabsTrigger
                        value="0-3 años"
                        className="data-[state=active]:bg-primary-green data-[state=active]:text-white text-primary-green"
                      >
                        0-3 años
                      </TabsTrigger>
                      <TabsTrigger
                        value="3-6 años"
                        className="data-[state=active]:bg-primary-green data-[state=active]:text-white text-primary-green"
                      >
                        3-6 años
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <Tabs value={ageGroup} onValueChange={setAgeGroup} className="w-full mt-2">
                    <TabsList className="grid grid-cols-2 bg-teal-green">
                      <TabsTrigger
                        value="6-12 años"
                        className="data-[state=active]:bg-primary-green data-[state=active]:text-white text-primary-green"
                      >
                        6-12 años
                      </TabsTrigger>
                      <TabsTrigger
                        value="12+ años"
                        className="data-[state=active]:bg-primary-green data-[state=active]:text-white text-primary-green"
                      >
                        12+ años
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {selectedArticle === null ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredArticles.map((article) => (
            <Card key={article.id} className="border-teal-green overflow-hidden flex flex-col">
              <div className="relative h-40 w-full">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge className="bg-teal-green text-primary-green hover:bg-teal-green">{article.category}</Badge>
                  <Badge variant="outline" className="text-primary-green border-teal-green">
                    {article.ageGroup}
                  </Badge>
                </div>
                <CardTitle className="text-lg text-primary-green mt-2">{article.title}</CardTitle>
                <CardDescription>{article.summary}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2 flex-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <BookOpen className="h-3 w-3" />
                  <span>{article.source}</span>
                  <span>•</span>
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(article.date).toLocaleDateString("es-ES")}</span>
                  <span>•</span>
                  <Clock className="h-3 w-3" />
                  <span>{article.readTime}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => setSelectedArticle(article.id)}
                  className="w-full bg-primary-green hover:bg-primary-green/90 text-white"
                >
                  Leer artículo
                </Button>
              </CardFooter>
            </Card>
          ))}

          {filteredArticles.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center p-8 text-center">
              <p className="text-muted-foreground mb-4">No se encontraron artículos que coincidan con tu búsqueda</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setCategory("all")
                  setAgeGroup("all")
                }}
                className="bg-primary-green hover:bg-primary-green/90 text-white"
              >
                Limpiar filtros
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Card className="border-teal-green">
          <CardHeader>
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={() => setSelectedArticle(null)}
                className="border-teal-green text-primary-green"
              >
                Volver a la lista
              </Button>
              <div className="flex gap-2">
                <Badge className="bg-teal-green text-primary-green hover:bg-teal-green">{article?.category}</Badge>
                <Badge variant="outline" className="text-primary-green border-teal-green">
                  {article?.ageGroup}
                </Badge>
              </div>
            </div>
            <CardTitle className="text-2xl text-primary-green mt-4">{article?.title}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
              <BookOpen className="h-4 w-4" />
              <span>{article?.source}</span>
              <span>•</span>
              <Calendar className="h-4 w-4" />
              <span>{article ? new Date(article.date).toLocaleDateString("es-ES") : ""}</span>
              <span>•</span>
              <Clock className="h-4 w-4" />
              <span>{article?.readTime}</span>
            </div>
          </CardHeader>
          <div className="relative h-64 w-full">
            <img
              src={article?.image || "/placeholder.svg"}
              alt={article?.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <CardContent className="pt-6">
            <p className="text-primary-green/80 whitespace-pre-line">{article?.content}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
