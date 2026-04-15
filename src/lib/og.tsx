export const ogSize = { width: 1200, height: 630 }
export const ogContentType = 'image/png'

interface OgOpts {
  emoji: string
  title: string
  subtitle: string
}

export function ogTemplate({ emoji, title, subtitle }: OgOpts) {
  return (
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
        <div style={{ fontSize: 96, lineHeight: 1 }}>{emoji}</div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: -2,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 30, color: '#44403C', maxWidth: 980 }}>
          {subtitle}
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
        <div style={{ display: 'flex' }}>The Disneyland family guide</div>
      </div>
    </div>
  )
}
