import { ImageResponse } from 'next/og'
import { ogTemplate, ogSize, ogContentType } from '@/lib/og'

export const alt = 'Best Disneyland food for families'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return new ImageResponse(
    ogTemplate({
      emoji: '🍿',
      title: 'Best Disneyland Food',
      subtitle: 'Family-tested picks for picky kids and long days',
    }),
    size
  )
}
