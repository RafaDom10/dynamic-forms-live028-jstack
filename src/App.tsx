import { PlusCircleIcon, Trash2Icon } from "lucide-react"
import { Button } from "./components/Button"
import { Input } from "./components/Input"
import { Label } from "./components/Label"

export function App() {
  return (
    <div className="grid place-items-center min-h-screen">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-semibold tracking-tight">Links</h1>
        <form className="mt-10 flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input id="title" />
            </div>
            <div className="flex-1 flex gap-4 items-end">
              <div className="flex-1 space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input id="url" />
              </div>

              <Button variant="destructive">
                <Trash2Icon className="size-4"/>
              </Button>
            </div>
          </div>

          <Button className="w-full border-dashed mt-6" variant="outline">
            <PlusCircleIcon className="size-4 mr-1" />
            Adicionar novo link
          </Button>
        </form>
      </div>
    </div>
  )
}
