import { useEffect, useRef } from 'react'

export type BgZone = { id: string; color: string }

type Rgb = [number, number, number]

function parseHex(hex: string): Rgb {
  const h = hex.replace('#', '')
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ]
}

function mix(a: Rgb, b: Rgb, t: number): string {
  const c = (i: number) => Math.round(a[i] + (b[i] - a[i]) * t)
  return `rgb(${c(0)}, ${c(1)}, ${c(2)})`
}

/**
 * Paints the element the returned ref is attached to with the colour of the
 * section currently in view, blending between neighbouring zones.
 *
 * Written against raw scroll events rather than a motion library: this ran on
 * every page and pulled the whole animation runtime into the initial bundle.
 * Section offsets are measured once per layout change, never inside the scroll
 * handler, so scrolling never forces a reflow.
 */
export function useScrollBackground(zones: BgZone[]) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const colors = zones.map((z) => parseHex(z.color))
    let offsets: number[] = zones.map((_, i) => i)
    let frame = 0

    const paint = () => {
      frame = 0
      const y = window.scrollY

      let i = 0
      while (i < offsets.length - 1 && y >= offsets[i + 1]) i++

      if (i >= offsets.length - 1) {
        el.style.background = zones[zones.length - 1].color
        return
      }

      const span = offsets[i + 1] - offsets[i]
      const t = span > 0 ? Math.min(Math.max((y - offsets[i]) / span, 0), 1) : 0
      el.style.background = mix(colors[i], colors[i + 1], t)
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint)
    }

    const measure = () => {
      const top = window.scrollY
      offsets = zones.map((z) => {
        const node = document.getElementById(z.id)
        return node ? node.getBoundingClientRect().top + top : 0
      })
      paint()
    }

    measure()
    // Late pass: images and webfonts settle after first paint and move sections.
    const settle = window.setTimeout(measure, 600)

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', measure)

    return () => {
      window.clearTimeout(settle)
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', measure)
    }
  }, [zones])

  return ref
}
