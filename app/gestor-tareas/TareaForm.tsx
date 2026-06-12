import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { crearTarea } from "./actions"

export function TareaForm() {
    return (
        <Card className="border max-w-fit">
            <CardHeader className="">
              <CardTitle>Crear una nueva tarea</CardTitle>
              <CardDescription>Añade una nueva tarea a tu lista</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <form action={crearTarea} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="titulo">Título</Label>
                  <Input
                    id="titulo"
                    name="titulo"
                    type="text"
                    placeholder="Escribe el título de la tarea"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="descripcion">Descripción</Label>
                  <Textarea
                    id="descripcion"
                    name="descripcion"
                    placeholder="Detalles opcionales"
                  />
                </div>

                <CardFooter className="p-0">
                  <Button type="submit" variant="default" className="w-full">Crear</Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
    )
}