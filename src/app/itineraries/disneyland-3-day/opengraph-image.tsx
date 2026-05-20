import { ImageResponse } from 'next/og'
import { ogTemplate, ogSize, ogContentType } from '@/lib/og'

export const alt = 'Disneyland 3-day itinerary for families with kids'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return new ImageResponse(
    ogTemplate({
      emoji: '🏰',
      title: 'Disneyland 3-Day Itinerary',
      subtitle: 'Marquee → deep cuts → re-rides + fireworks finale',
    }),
    size
  )
}
