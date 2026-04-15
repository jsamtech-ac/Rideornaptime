import { ImageResponse } from 'next/og'
import { ogTemplate, ogSize, ogContentType } from '@/lib/og'

export const alt = "Best time to visit Disneyland"
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return new ImageResponse(
    ogTemplate({
      emoji: "📅",
      title: "Best Time to Visit",
      subtitle: "Crowds, weather, and events by month",
    }),
    size,
  )
}
