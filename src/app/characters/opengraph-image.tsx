import { ImageResponse } from 'next/og'
import { ogTemplate, ogSize, ogContentType } from '@/lib/og'

export const alt = 'Disneyland character meet-and-greets — where to find every character (2026)'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return new ImageResponse(
    ogTemplate({
      emoji: '🐭',
      title: 'Disneyland Characters 2026',
      subtitle: 'Where to meet every character with kids ages 2–8',
    }),
    size
  )
}
