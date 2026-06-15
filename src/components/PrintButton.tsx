'use client'

/**
 * Print / Save-as-PDF trigger. Native browsers turn window.print() into both a
 * paper print and a "Save as PDF" destination, which covers the in-park offline
 * use case. Carries the `no-print` class so the button itself never prints.
 */
export default function PrintButton({ label = 'Print / Save as PDF' }: { label?: string }) {
  return (
    <div className="print-action-row no-print">
      <button type="button" className="print-button" onClick={() => window.print()}>
        <span aria-hidden="true">🖨</span> {label}
      </button>
    </div>
  )
}
