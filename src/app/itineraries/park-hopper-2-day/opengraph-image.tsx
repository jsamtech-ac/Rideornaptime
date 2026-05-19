import { ImageResponse } from 'next/og'
import { ogTemplate, ogSize, ogContentType } from '@/lib/og'

export const alt = 'Disneyland Park Hopper 2-day itinerary for families'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return new ImageResponse(
    ogTemplate({
      emoji: '🎢',
      title: 'Park Hopper 2-Day Itinerary',
      subtitle: 'DCA morning, Disneyland afternoon, fireworks at night',
    }),
    size
  )
}
