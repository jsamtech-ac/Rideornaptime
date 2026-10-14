import { ImageResponse } from 'next/og'
import { ogTemplate, ogSize, ogContentType } from '@/lib/og'

export const alt = 'Holidays at Disneyland 2026 with Kids'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return new ImageResponse(
    ogTemplate({
      emoji: '🎄',
      title: 'Holidays at Disneyland 2026',
      subtitle: "Nov 13 – Jan 6 · Santa's new spot · crowd calendar for families",
    }),
    size
  )
}
