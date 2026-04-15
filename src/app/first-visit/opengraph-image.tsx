import { ImageResponse } from 'next/og'
import { ogTemplate, ogSize, ogContentType } from '@/lib/og'

export const alt = "First visit to Disneyland with kids"
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return new ImageResponse(
    ogTemplate({
      emoji: "🏰",
      title: "First Visit to Disneyland",
      subtitle: "What every rookie parent needs to know",
    }),
    size,
  )
}
