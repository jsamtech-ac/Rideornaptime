import { ImageResponse } from 'next/og'
import { ogTemplate, ogSize, ogContentType } from '@/lib/og'

export const alt = 'Disneyland 2026 Events Calendar'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return new ImageResponse(
    ogTemplate({
      emoji: '📅',
      title: '2026 Events & Best Months',
      subtitle: 'Every Disneyland event, verdicts for families',
    }),
    size
  )
}
