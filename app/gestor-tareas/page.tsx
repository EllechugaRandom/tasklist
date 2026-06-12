import { obtenerTareas } from "@/lib/tareas-prisma"
import { TareaForm } from "./TareaForm"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default async function Page() {
  const tareas = await obtenerTareas()

  return (
    <main className="flex min-h-screen flex-col gap-8 p-6 md:p-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Gestor de tareas</h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Guarda tareas con Prisma usando una Server Action.
        </p>
      </div>

      <TareaForm />

      <section className="space-y-4">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-semibold">Tareas guardadas</h2>
          <Separator className="flex-1" />
        </div>

        {tareas.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground">
            Todavía no hay tareas.
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {tareas.map((tarea) => (
              <Card key={tarea.id} className="border flex flex-col">
                <CardHeader>
                  <CardTitle className="text-base">{tarea.titulo}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    ID #{tarea.id}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 text-sm text-muted-foreground">
                  {tarea.descripcion || "Sin descripción"}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
