import { ImageResponse } from 'next/og'
import { ogTemplate, ogSize, ogContentType } from '@/lib/og'

export const alt = 'Disneyland packing list for kids'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return new ImageResponse(
    ogTemplate({
      emoji: '🎒',
      title: 'Disneyland Packing List',
      subtitle: 'What a real parent brings for kids 2 to 8',
    }),
    size
  )
}
