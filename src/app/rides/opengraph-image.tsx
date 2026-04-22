import { ImageResponse } from 'next/og'
import { ogTemplate, ogSize, ogContentType } from '@/lib/og'

export const alt = 'Disneyland rides for kids — age-by-age guide'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return new ImageResponse(
    ogTemplate({
      emoji: '🎢',
      title: 'Disneyland Rides for Kids',
      subtitle: 'Age-by-age ratings for kids 2 to 8',
    }),
    size
  )
}
