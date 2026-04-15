import { ImageResponse } from 'next/og'
import { ogTemplate, ogSize, ogContentType } from '@/lib/og'

export const alt = "Disneyland fireworks viewing spots"
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return new ImageResponse(
    ogTemplate({
      emoji: "🎆",
      title: "Disneyland Fireworks",
      subtitle: "Best viewing spots, timing, and tips with kids",
    }),
    size,
  )
}
