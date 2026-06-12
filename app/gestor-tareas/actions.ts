"use server"

import { revalidatePath } from "next/cache"
import { insertarTarea } from "@/lib/tareas-prisma"

export async function crearTarea(formData: FormData) {
  const titulo = formData.get("titulo")
  const descripcion = formData.get("descripcion")

  if (typeof titulo !== "string" || typeof descripcion !== "string") {
    return
  }

  if (titulo.trim() === "" || descripcion.trim() === "") {
    return
  }

  await insertarTarea(titulo.trim(), descripcion.trim())

  revalidatePath("/gestor-tareas")
}