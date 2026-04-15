interface Step {
  name: string
  text: string
}

interface Props {
  name: string
  description?: string
  totalTime?: string
  steps: Step[]
}

export default function HowToJsonLd({
  name,
  description,
  totalTime,
  steps,
}: Props) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    ...(description ? { description } : {}),
    ...(totalTime ? { totalTime } : {}),
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
