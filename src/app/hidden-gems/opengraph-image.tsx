import { ImageResponse } from 'next/og'
import { ogTemplate, ogSize, ogContentType } from '@/lib/og'

export const alt = 'Disneyland hidden gems'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return new ImageResponse(
    ogTemplate({
      emoji: '🔍',
      title: 'Disneyland Hidden Gems',
      subtitle: 'Underrated experiences families miss',
    }),
    size
  )
}
