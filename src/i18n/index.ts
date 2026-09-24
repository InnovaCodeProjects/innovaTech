import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import pt from './locales/pt.json'

export const SUPPORTED = ['pt', 'en', 'es', 'fr'] as const
export type Lang = (typeof SUPPORTED)[number]

const STORAGE_KEY = 'i18nextLng'

/**
 * Only pt ships in the initial bundle — it's the default, the language the
 * pages are prerendered in, and by far the most requested. The other three
 * (~35 KB of JSON) are fetched on demand the first time they're selected.
 */
const LAZY = {
  en: () => import('./locales/en.json'),
  es: () => import('./locales/es.json'),
  fr: () => import('./locales/fr.json'),
} as const

const isLazy = (lng: string): lng is keyof typeof LAZY => lng in LAZY

async function loadLanguage(lng: string) {
  const base = lng.split('-')[0]
  if (!isLazy(base) || i18n.hasResourceBundle(base, 'translation')) return
  const mod = await LAZY[base]()
  i18n.addResourceBundle(base, 'translation', mod.default, true, true)
  // The bundle arrived after i18next had already fallen back to pt for this
  // language; re-emit so mounted components re-render with the real strings.
  i18n.changeLanguage(i18n.language)
}

i18n.use(initReactI18next).init({
  resources: { pt: { translation: pt } },
  // Fixed at init: the prerendered markup is pt, so the first client render
  // has to match it. Detection runs after hydration (see detectLanguage).
  lng: 'pt',
  fallbackLng: 'pt',
  supportedLngs: SUPPORTED,
  nonExplicitSupportedLngs: true,
  partialBundledLanguages: true,
  interpolation: { escapeValue: false },
})

i18n.on('languageChanged', (lng) => {
  void loadLanguage(lng)
  try {
    localStorage.setItem(STORAGE_KEY, lng)
  } catch {
    // Private mode / blocked storage: the choice just won't persist.
  }
})

/**
 * Picks up a stored preference, else the browser's language. Runs after
 * hydration so it can't desync the first render from the prerendered HTML.
 */
export function detectLanguage() {
  let stored: string | null = null
  try {
    stored = localStorage.getItem(STORAGE_KEY)
  } catch {
    // ignore
  }

  const candidates = stored ? [stored] : [...navigator.languages, navigator.language]
  const match = candidates
    .map((c) => c?.split('-')[0])
    .find((c): c is Lang => !!c && (SUPPORTED as readonly string[]).includes(c))

  if (match && match !== i18n.language) i18n.changeLanguage(match)
}

export default i18n
