import { ImageResponse } from 'next/og'
import { ogTemplate, ogSize, ogContentType } from '@/lib/og'

export const alt = "Save money at Disneyland"
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return new ImageResponse(
    ogTemplate({
      emoji: "💸",
      title: "Save Money at Disneyland",
      subtitle: "Cut costs on tickets, food, hotels, and souvenirs",
    }),
    size,
  )
}
