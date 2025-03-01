import { cn } from "@/lib/utils"
import { Reorder, useDragControls } from "framer-motion"
import { Label } from "./Label"
import { Input } from "./Input"
import { GripVerticalIcon, Trash2Icon } from "lucide-react"
import { Button } from "./Button"
import { useFormContext } from "react-hook-form"

interface ILinkItemProps {
  index: number
  isDraggingActive: boolean
  link: {
    title: string,
    url: string
  }
  onDragStar: () => void
  onDragEnd: () => void
  onRemove: () => void
}

export function LinkItem({
  link,
  index,
  isDraggingActive,
  onDragEnd,
  onDragStar,
  onRemove
}: ILinkItemProps) {
  const form = useFormContext()
  const controls = useDragControls()

  return (
    <Reorder.Item
      value={link}
      onDragStart={onDragStar}
      onDragEnd={onDragEnd}
      className="relative"
      dragListener={false}
      dragControls={controls}
    >
      <div
        className={cn(
          "flex gap-4 transition-opacity",
          isDraggingActive && "opacity-50"
        )}
      >
        <div className="flex-1 flex gap-4 items-end">

          <Button
            onPointerDown={(e) => controls.start(e)}
            type="button"
            variant="link"
            className="cursor-grab"
          >
            <GripVerticalIcon className="size-4" />
          </Button>
          <div className="flex-1 space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input id="title" {...form.register(`links.${index}.title`)} />
          </div>
        </div>

        <div className="flex-1 flex gap-4 items-end">
          <div className="flex-1 space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input id="url" {...form.register(`links.${index}.url`)} />
          </div>

          <Button
            type="button"
            variant="destructive"
            onClick={onRemove}
            tabIndex={-1}
          >
            <Trash2Icon className="size-4" />
          </Button>
        </div>
      </div>
    </Reorder.Item>
  )
}
