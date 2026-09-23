import { useEffect, useState } from 'react'
import { useScroll, useTransform, MotionValue } from 'framer-motion'

export type BgZone = { id: string; color: string }

export function useScrollBackground(zones: BgZone[]): MotionValue<string> {
  const { scrollY } = useScroll()
  const [breakpoints, setBreakpoints] = useState<number[] | null>(null)

  useEffect(() => {
    const measure = () => {
      const points = zones.map((z) => {
        const el = document.getElementById(z.id)
        if (!el) return 0
        return el.getBoundingClientRect().top + window.scrollY
      })
      setBreakpoints(points)
    }
    measure()
    window.addEventListener('resize', measure)
    const t = window.setTimeout(measure, 600)
    return () => {
      window.removeEventListener('resize', measure)
      window.clearTimeout(t)
    }
  }, [zones])

  const fallback = zones.map((_, i) => i)
  return useTransform(scrollY, breakpoints ?? fallback, zones.map((z) => z.color))
}
