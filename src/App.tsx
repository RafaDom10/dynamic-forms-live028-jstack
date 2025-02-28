import { Reorder } from "framer-motion"
import { useFieldArray, useForm } from "react-hook-form"
import { PlusCircleIcon, Trash2Icon } from "lucide-react"
import { Button } from "./components/Button"
import { Input } from "./components/Input"
import { Label } from "./components/Label"
import { useState } from "react"
import { cn } from "./lib/utils"

export function App() {
  const form = useForm({
    defaultValues: {
      links: [
        { title: 'Link 01', url: 'https://liketest1.com' },
        { title: 'Link 02', url: 'https://liketest2.com' }
      ]
    }
  })

  const links = useFieldArray({
    control: form.control,
    name: 'links'
  })

  const [ dragIndex, setDragIndex ] = useState<null | number>(null)

  const handleSubmit = form.handleSubmit((data) => {
    console.log(data)
  })

  const handleDragStart = (index: number) => {
    setDragIndex(index)
  }

  const handleDragEnd = () => {
    setDragIndex(null)
  }

  const handleReorder = (newOrder: typeof links.fields) => {
    if(dragIndex === null) return;
    const draggingLink = links.fields[dragIndex]
    newOrder.forEach((link, index) => {
      if ( link === draggingLink ) {
        links.move(dragIndex, index)
        setDragIndex(index)
      }
    })
  }

  return (
    <div className="grid place-items-center min-h-screen">
      <div className="w-full max-w-2xl">
        <h1 className="text-2xl font-semibold tracking-tight mb-10">Links</h1>

        <Button
          type="button"
          className="w-full border-dashed"
          variant="outline"
          onClick={() => links.prepend({ title: '', url: '' })}
        >
          <PlusCircleIcon className="size-4 mr-1" />
          Adicionar no top da lista
        </Button>

        <form className="mt-10 flex flex-col gap-4" onSubmit={handleSubmit}>
          <Reorder.Group
            axis="y"
            values={links.fields}
            onReorder={handleReorder}
            className="space-y-4"
          >
            {links.fields.map((link, index) => (
              <Reorder.Item
                key={link.id}
                value={link}
                onDragStart={() => handleDragStart(index)}
                onDragEnd={handleDragEnd}
                className="relative"
              >
                <div
                  className={cn(
                    "flex gap-4 transition-opacity",
                    dragIndex !== null && dragIndex !== index && "opacity-50"
                  )}
                >
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="title">Título</Label>
                    <Input id="title" {...form.register(`links.${index}.title`)} />
                  </div>
                  <div className="flex-1 flex gap-4 items-end">
                    <div className="flex-1 space-y-2">
                      <Label htmlFor="url">URL</Label>
                      <Input id="url" {...form.register(`links.${index}.url`)} />
                    </div>

                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => links.remove(index)}
                      tabIndex={-1}
                    >
                      <Trash2Icon className="size-4" />
                    </Button>
                  </div>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>

          <Button
            type="button"
            className="w-full border-dashed mt-6"
            variant="outline"
            onClick={() => links.append({ title: '', url: '' })}
          >
            <PlusCircleIcon className="size-4 mr-1" />
            Adicionar novo link
          </Button>

          <div className="flex gap-4">
            <Button
              type="button"
              className="flex-1"
              variant="secondary"
              onClick={() => links.insert(1, { title: '', url: 'https://' })}
            >
              Insert
            </Button>
            <Button
              type="button"
              className="flex-1"
              variant="secondary"
              onClick={() => links.move(1, 0)}
            >
              Move
            </Button>
            <Button
              type="button"
              className="flex-1"
              variant="secondary"
              onClick={() => links.replace([{ title: '', url: '' }])}
            >
              Replace
            </Button>
            <Button
              type="button"
              className="flex-1"
              variant="secondary"
              onClick={() => links.swap(1, 0)}
            >
              Swap
            </Button>
            <Button
              type="button"
              className="flex-1"
              variant="secondary"
              onClick={() => {
                // links.update(1, { title: 'updated title', url: 'https://updatedurl.com'})  -> metodo monta outro elemento melhor utilizar para esses casos o setValue
                form.setValue('links.1.title', 'updated title')
                form.setValue('links.1.url', 'https://updatedurl.com')
              }}
            >
              Update
            </Button>
          </div>

          <Button type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}
