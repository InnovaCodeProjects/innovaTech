import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Inlines the built stylesheet into index.html.
 *
 * The site ships a single stylesheet, so keeping it as a separate file costs a
 * full round trip on the critical path (~600 ms on throttled 4G) before the
 * first paint can happen. Inlined and gzipped it is a few KB inside a document
 * the browser is already downloading.
 */
function inlineStylesheet(): Plugin {
  return {
    name: 'innova-inline-stylesheet',
    apply: 'build',
    enforce: 'post',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        const bundle = ctx.bundle
        if (!bundle) return html

        return html.replace(
          /<link[^>]+rel="stylesheet"[^>]*>/g,
          (tag) => {
            const href = /href="([^"]+)"/.exec(tag)?.[1]
            if (!href || !href.startsWith('/')) return tag

            const key = href.slice(1)
            const asset = bundle[key]
            if (!asset || asset.type !== 'asset') return tag

            delete bundle[key]
            return `<style>${asset.source}</style>`
          },
        )
      },
    },
  }
}

export default defineConfig({
  plugins: [react(), inlineStylesheet()],
})
