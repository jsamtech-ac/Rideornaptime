import { ImageResponse } from 'next/og'
import { ogTemplate, ogSize, ogContentType } from '@/lib/og'

export const alt = "Best strollers for Disneyland"
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return new ImageResponse(
    ogTemplate({
      emoji: "👶",
      title: "Best Disneyland Strollers",
      subtitle: "Parent-tested single and double picks for 2026",
    }),
    size,
  )
}
