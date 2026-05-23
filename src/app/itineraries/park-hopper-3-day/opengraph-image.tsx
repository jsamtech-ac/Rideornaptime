import { ImageResponse } from 'next/og'
import { ogTemplate, ogSize, ogContentType } from '@/lib/og'

export const alt = 'Disneyland Park Hopper 3-day itinerary for families'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return new ImageResponse(
    ogTemplate({
      emoji: '🎢',
      title: 'Park Hopper 3-Day Itinerary',
      subtitle: 'Both parks, World of Color, fireworks finale',
    }),
    size
  )
}
