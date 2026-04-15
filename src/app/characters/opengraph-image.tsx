import { ImageResponse } from 'next/og'
import { ogTemplate, ogSize, ogContentType } from '@/lib/og'

export const alt = "Disneyland character meet-and-greets"
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return new ImageResponse(
    ogTemplate({
      emoji: "🐭",
      title: "Character Meet-and-Greets",
      subtitle: "Where to find favorites and how lines really run",
    }),
    size,
  )
}
