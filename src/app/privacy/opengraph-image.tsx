import { ImageResponse } from 'next/og'
import { ogTemplate, ogSize, ogContentType } from '@/lib/og'

export const alt = 'Ride or Naptime Privacy Policy'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return new ImageResponse(
    ogTemplate({
      emoji: '🔒',
      title: 'Privacy Policy',
      subtitle: 'How we handle data at Ride or Naptime',
    }),
    size
  )
}
