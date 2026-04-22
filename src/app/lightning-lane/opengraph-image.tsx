import { ImageResponse } from 'next/og'
import { ogTemplate, ogSize, ogContentType } from '@/lib/og'

export const alt = 'Lightning Lane and rope drop strategy for Disneyland families'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return new ImageResponse(
    ogTemplate({
      emoji: '⚡',
      title: 'Lightning Lane & Rope Drop',
      subtitle: 'The family playbook for ages 2–8 at Disneyland',
    }),
    size
  )
}
