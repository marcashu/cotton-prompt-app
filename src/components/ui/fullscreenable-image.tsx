"use client"

import Image from "next/image"
import { ReactEventHandler, createRef, useEffect, useState } from "react"

export default function FullscreenableImage({
  src,
  alt,
  onError,
}: {
  src: string
  alt: string
  onError?: ReactEventHandler<HTMLImageElement>
}) {
  const [fullscreen, setFullscreen] = useState(false)
  const imageRef = createRef<HTMLImageElement>()

  // Check if URL is external (blob storage) - skip Next.js optimization for these
  const isExternalUrl = src.startsWith("http://") || src.startsWith("https://")

  const handleImageClick = () => {
    if (!fullscreen) {
      imageRef.current?.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  const fullscreenChanged = () => {
    if (document.fullscreenElement) {
      setFullscreen(true)
    } else {
      setFullscreen(false)
    }
  }

  useEffect(() => {
    if (!imageRef.current) return

    imageRef.current.addEventListener("fullscreenchange", fullscreenChanged)
  }, [imageRef])

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-contain cursor-pointer"
      ref={imageRef}
      onClick={handleImageClick}
      unoptimized={isExternalUrl}
      {...(onError && { onError })}
    />
  )
}
