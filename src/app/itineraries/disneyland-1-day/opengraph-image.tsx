import { ImageResponse } from 'next/og'
import { ogTemplate, ogSize, ogContentType } from '@/lib/og'

export const alt = 'Disneyland 1-day itinerary for families with kids'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return new ImageResponse(
    ogTemplate({
      emoji: '🏰',
      title: 'Disneyland 1-Day Itinerary',
      subtitle: 'Hour-by-hour plan for families with kids 2–8',
    }),
    size
  )
}
