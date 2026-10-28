import { ImageResponse } from 'next/og'
import { ogTemplate, ogSize, ogContentType } from '@/lib/og'

export const alt = "Bluey at Disneyland — Bluey's Best Day Ever! family guide (2026)"
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return new ImageResponse(
    ogTemplate({
      emoji: '🐶',
      title: 'Bluey at Disneyland 2026',
      subtitle: "Show times, seats, and merch for Bluey's Best Day Ever!",
    }),
    size
  )
}
