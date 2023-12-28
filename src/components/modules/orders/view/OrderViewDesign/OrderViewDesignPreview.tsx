import Image from "next/image"
import { Image as ImageIcon } from "lucide-react"

export default function OrderViewDesignPreview({ url }: { url?: string }) {
  return (
    <div className="flex flex-col gap-4 self-center w-full">
      <div className="flex justify-center items-center rounded-lg border border-dashed border-gray-900/25 relative aspect-video w-full">
        {!!url ? (
          <Image
            src={url}
            alt="design preview"
            fill
            className="object-contain"
          />
        ) : (
          <div className="text-center px-6 py-10">
            <ImageIcon
              className="mx-auto h-12 w-12 text-gray-300"
              aria-hidden="true"
            />
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <p className="pl-1">No design uploaded yet</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
