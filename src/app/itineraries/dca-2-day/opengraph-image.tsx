import { ImageResponse } from 'next/og'
import { ogTemplate, ogSize, ogContentType } from '@/lib/og'

export const alt = 'California Adventure 2-day itinerary for families'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return new ImageResponse(
    ogTemplate({
      emoji: '🏎️',
      title: 'DCA 2-Day Itinerary',
      subtitle: 'Cars Land, Pixar Pier, World of Color — twice',
    }),
    size
  )
}
