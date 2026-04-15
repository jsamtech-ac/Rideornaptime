import { ImageResponse } from 'next/og'
import { ogTemplate, ogSize, ogContentType } from '@/lib/og'

export const alt = "Disneyland Lightning Lane strategy"
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return new ImageResponse(
    ogTemplate({
      emoji: "⚡",
      title: "Lightning Lane Strategy",
      subtitle: "When to buy, what to book first, how to save hours",
    }),
    size,
  )
}
