import { Reorder } from "framer-motion"
import { useFieldArray, useForm, FormProvider } from "react-hook-form"
import { PlusCircleIcon } from "lucide-react"
import { Button } from "./components/Button"
import { useState } from "react"
import { LinkItem } from "./components/LinkItem"

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

  const [draggingIndex, setDraggingIndex] = useState<null | number>(null)

  const handleSubmit = form.handleSubmit((data) => {
    console.log(data)
  })

  const handleDragStart = (index: number) => {
    setDraggingIndex(index)
  }

  const handleDragEnd = () => {
    setDraggingIndex(null)
  }

  const handleReorder = (newOrder: typeof links.fields) => {
    if (draggingIndex === null) return;
    const draggingLink = links.fields[draggingIndex]
    newOrder.forEach((link, index) => {
      if (link === draggingLink) {
        links.move(draggingIndex, index)
        setDraggingIndex(index)
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

        <FormProvider {...form}>
          <form className="mt-10 flex flex-col gap-4" onSubmit={handleSubmit}>
            <Reorder.Group
              axis="y"
              values={links.fields}
              onReorder={handleReorder}
              className="space-y-4"
            >
              {links.fields.map((link, index) => (
                <LinkItem
                  key={link.id}
                  index={index}
                  link={link}
                  isDraggingActive={draggingIndex !== null && draggingIndex !== index}
                  onDragStar={() => handleDragStart(index)}
                  onDragEnd={handleDragEnd}
                  onRemove={() => links.remove(index)}
                />
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
        </FormProvider>
      </div>
    </div>
  )
}
