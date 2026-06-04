"use client"
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState<{ id: number; title: string; description: string; completed: boolean }[]>([]);

  function creaTarea() {
    const t = title.trim();
    if (!t) {
      return;
    }
    const newTask = { id: Date.now(), title: t, description: description.trim(), completed: false };
    setTasks((s) => [newTask, ...s]);
    setTitle("");
    setDescription("");
  }

  function toggleCompleted(id: number, value: boolean) {
    setTasks((s) => s.map(task => task.id === id ? { ...task, completed: value } : task));
  }

  function deleteTask(id: number) {
    setTasks((s) => s.filter(task => task.id !== id));
  }

  return (
    <div className="flex p-4 flex-col gap-4">
      <div className="flex justify-center">
          <Card className="border max-w-fit">
            <CardHeader className="">
              <CardTitle>Crear una nueva tarea</CardTitle>
              <CardDescription>Añade una nueva tarea a tu lista</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-2">
                <Label htmlFor="titulo">Título</Label>
                <Input 
                  id="titulo" 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Escribe el título de la tarea"
                  className="flex h-10 w-full border px-3 py-2"
                />
                <Label htmlFor="descripcion">Descripción</Label>
                <Input
                  id="descripcion"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detalles opcionales"
                  className="flex h-10 w-full border px-3 py-2"
                />
            </CardContent>
            <CardFooter className="p-0">
              <Button onClick={creaTarea} type="button" variant={"default"} className="w-full">Crear</Button>
            </CardFooter>
          </Card>
      </div>
      <Separator className="w-full border-t" />
      <div id="lista" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
        {tasks.length === 0 ? (
          <div className="text-muted-foreground">No hay tareas</div>
        ) : (
          tasks.map(task => (
            <Card key={task.id} className={`min-h-48 max-h-fit flex flex-col justify-between ${task.completed ? 'bg-muted/20' : ''}`}>
              <CardHeader className="flex items-start justify-between gap-2">
                <CardTitle className={`text-lg break-words whitespace-normal flex-1 min-w-0 ${task.completed ? "line-through text-muted-foreground italic":""}`}>{task.title}</CardTitle>
                <Checkbox checked={task.completed} onCheckedChange={(v) => toggleCompleted(task.id, !!v)} />
              </CardHeader>
              <CardContent className={`text-sm break-words whitespace-normal text-muted-foreground ${task.completed ? "italic":""}`}>
                {task.description || <em>Sin descripción</em>}
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
