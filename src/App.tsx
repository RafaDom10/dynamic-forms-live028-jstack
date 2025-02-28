import { PlusCircleIcon, Trash2Icon } from "lucide-react"
import { Button } from "./components/Button"
import { Input } from "./components/Input"
import { Label } from "./components/Label"
import { useFieldArray, useForm } from "react-hook-form"

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

  const handleSubmit = form.handleSubmit((data) => {
    console.log(data)
  })

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
          {links.fields.map((link, index) => (
            <div key={link.id} className="flex gap-4">
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
          ))}

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

          <Button className="mt-10">
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}
