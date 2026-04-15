import { ImageResponse } from 'next/og'

export const alt = 'Ride or Naptime — The Disneyland family guide that actually helps'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background:
            'linear-gradient(135deg, #FFFBEB 0%, #FDE68A 35%, #FFF1F2 70%, #EDE9FE 100%)',
          fontFamily: 'system-ui, sans-serif',
          color: '#1C1917',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #F59E0B 0%, #F43F5E 100%)',
              color: '#FFFFFF',
              fontSize: 44,
              fontWeight: 700,
            }}
          >
            R
          </div>
          <div style={{ fontSize: 32, fontWeight: 600, color: '#44403C' }}>
            Ride or Naptime
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 980,
            }}
          >
            The Disneyland family guide that actually helps.
          </div>
          <div style={{ fontSize: 32, color: '#44403C', maxWidth: 900 }}>
            Real-parent ride ratings, itineraries, and packing lists for kids 2–8.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 24,
            color: '#78716C',
          }}
        >
          <div style={{ display: 'flex' }}>rideornaptime.com</div>
          <div style={{ display: 'flex', gap: 16 }}>
            <span>🎢 Rides</span>
            <span>🗺️ Itineraries</span>
            <span>🎒 Packing</span>
          </div>
        </div>
      </div>
    ),
    size,
  )
}
