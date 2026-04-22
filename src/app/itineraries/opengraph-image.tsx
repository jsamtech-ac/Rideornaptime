import { ImageResponse } from 'next/og'
import { ogTemplate, ogSize, ogContentType } from '@/lib/og'

export const alt = 'Disneyland itineraries with kids'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return new ImageResponse(
    ogTemplate({
      emoji: '🗺️',
      title: 'Disneyland Itineraries',
      subtitle: '1-day, 2-day, and 3-day plans for families',
    }),
    size
  )
}
