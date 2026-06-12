"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { TareaForm } from "./gestor-tareas/TareaForm";

export default function Home() {
  type Tarea = {
    id: number
    titulo: string
    descripcion: string
    completed: boolean
  }
  const [titulo, setTitulo] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [tareas, setTareas] = useState<Tarea[]>([]);

  function creaTarea() {
    const t = titulo.trim();
    if (!t) {
      return;
    }
    const nuevaTarea: Tarea = {
      id: Date.now(),
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      completed: false,
    };
    setTareas([...tareas, nuevaTarea])
    setTitulo("")
    setDescripcion("")
  }

  function toggleCompleted(id: number, value: boolean) {
    setTareas((s) => s.map(tarea => tarea.id === id ? { ...tarea, completed: value } : tarea));
  }

  function deleteTask(id: number) {
    setTareas((s) => s.filter(tarea => tarea.id !== id));
  }

  return (
    <div className="flex p-4 flex-col gap-4">
      <div className="flex justify-center">
          <TareaForm />
      </div>
      <Separator className="w-full border-t" />
      <div id="lista" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
        {tareas.length === 0 ? (
          <div className="text-muted-foreground">No hay tareas</div>
        ) : (
          tareas.map(task => (
            <Card key={task.id} className={`min-h-48 max-h-fit flex flex-col justify-between ${task.completed ? 'bg-muted/20' : ''}`}>
              <CardHeader className="flex items-start justify-between gap-2">
                <CardTitle className={`text-lg wrap-break-words whitespace-normal flex-1 min-w-0 ${task.completed ? "line-through text-muted-foreground italic" : ""}`}>{task.titulo}</CardTitle>
                <Checkbox checked={task.completed} onCheckedChange={(v) => toggleCompleted(task.id, !!v)} />
              </CardHeader>
              <CardContent className={`text-sm wrap-break-words whitespace-normal text-muted-foreground ${task.completed ? "italic" : ""}`}>
                {task.descripcion || <em>Sin descripción</em>}
              </CardContent>
              {task.completed ? (
                <CardFooter className="p-0">
                  <Button type="button" variant={"outline"} className="w-full" onClick={() => deleteTask(task.id)}>
                    Eliminar
                  </Button>
                </CardFooter>
              ) : null}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
