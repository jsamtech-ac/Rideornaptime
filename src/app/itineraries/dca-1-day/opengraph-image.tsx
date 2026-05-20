import { ImageResponse } from 'next/og'
import { ogTemplate, ogSize, ogContentType } from '@/lib/og'

export const alt = 'California Adventure 1-day itinerary for families'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return new ImageResponse(
    ogTemplate({
      emoji: '🏎️',
      title: 'DCA 1-Day Itinerary',
      subtitle: "Radiator Springs, Soarin', and World of Color",
    }),
    size
  )
}
