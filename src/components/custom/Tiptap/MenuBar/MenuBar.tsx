import { Separator } from "@/components/ui/separator"
import RedoButton from "./Buttons/RedoButton"
import UndoButton from "./Buttons/UndoButton"
import { useCurrentEditor } from "@tiptap/react"
import BoldButton from "./Buttons/BoldButton"
import ItalicButton from "./Buttons/ItalicButton"
import Heading1Button from "./Buttons/Heading1Button"
import Heading2Button from "./Buttons/Heading2Button"
import Heading3Button from "./Buttons/Heading3Button"
import AlignLeftButton from "./Buttons/AlignLeftButton"
import AlignCenterButton from "./Buttons/AlignCenterButton"
import AlignRightButton from "./Buttons/AlignRightButton"
import UnderlineButton from "./Buttons/UnderlineButton"
import BulletListButton from "./Buttons/BulletListButton"
import OrderedListButton from "./Buttons/OrderedListButton"

export default function MenuBar() {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return <></>
  }

  return (
    <div className="flex m-4 gap-2 h-7 items-center">
      <div className="flex gap-1">
        <UndoButton editor={editor} />
        <RedoButton editor={editor} />
      </div>
      <Separator orientation="vertical" />
      <div className="flex gap-1">
        <BoldButton editor={editor} />
        <ItalicButton editor={editor} />
        <UnderlineButton editor={editor} />
      </div>
      <Separator orientation="vertical" />
      <div className="flex gap-1">
        <Heading1Button editor={editor} />
        <Heading2Button editor={editor} />
        <Heading3Button editor={editor} />
      </div>
      <Separator orientation="vertical" />
      <div className="flex gap-1">
        <AlignLeftButton editor={editor} />
        <AlignCenterButton editor={editor} />
        <AlignRightButton editor={editor} />
      </div>
      <Separator orientation="vertical" />
      <div className="flex gap-1">
        <BulletListButton editor={editor} />
        <OrderedListButton editor={editor} />
      </div>
    </div>
  )
}
