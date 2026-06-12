"use server"

import { revalidatePath } from "next/cache"
import { insertarTarea, borrarTarea } from "@/lib/tareas-prisma"

export async function crearTarea(formData: FormData) {
  const titulo = formData.get("titulo")
  const descripcion = formData.get("descripcion")

  if (typeof titulo !== "string" || typeof descripcion !== "string") {
    return
  }

  if (titulo.trim() === "") {
    return
  }

  await insertarTarea(titulo.trim(), descripcion.trim())

  revalidatePath("/")
}

export async function eliminarTarea(id: number) {
  await borrarTarea(id)
  revalidatePath("/")
}