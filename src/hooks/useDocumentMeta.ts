import { useEffect } from 'react'

export function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title

    const descTag = document.querySelector('meta[name="description"]')
    const prevDesc = descTag?.getAttribute('content') ?? ''
    descTag?.setAttribute('content', description)

    return () => {
      document.title = prevTitle
      descTag?.setAttribute('content', prevDesc)
    }
  }, [title, description])
}
