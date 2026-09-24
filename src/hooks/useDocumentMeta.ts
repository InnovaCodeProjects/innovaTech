import { useEffect } from 'react'

const ORIGIN = 'https://www.innovatech.dev.br'

function setAttr(selector: string, attr: string, value: string) {
  const el = document.querySelector(selector)
  const prev = el?.getAttribute(attr) ?? null
  el?.setAttribute(attr, value)
  return () => {
    if (el && prev !== null) el.setAttribute(attr, prev)
  }
}

/**
 * Keeps the rendered document's title, description and canonical/OG URLs in
 * sync with the current route. Crawlers index the rendered page, so these must
 * agree with the static tags in index.html rather than drift from them.
 */
export function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title

    const url = ORIGIN + window.location.pathname

    const restore = [
      setAttr('meta[name="description"]', 'content', description),
      setAttr('meta[property="og:title"]', 'content', title),
      setAttr('meta[property="og:description"]', 'content', description),
      setAttr('meta[property="og:url"]', 'content', url),
      setAttr('meta[name="twitter:title"]', 'content', title),
      setAttr('meta[name="twitter:description"]', 'content', description),
      setAttr('link[rel="canonical"]', 'href', url),
    ]

    return () => {
      document.title = prevTitle
      restore.forEach((undo) => undo())
    }
  }, [title, description])
}
