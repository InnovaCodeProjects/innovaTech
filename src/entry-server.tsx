import { StrictMode } from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { Writable } from 'node:stream'
import './i18n'
import App from './App'

/**
 * Build-time renderer. Produces the static markup baked into each page so the
 * browser can paint the hero without waiting for the bundle to execute; the
 * client then hydrates over it.
 */
export function render(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let html = ''

    const sink = new Writable({
      write(chunk: Buffer, _enc: string, cb: () => void) {
        html += chunk.toString()
        cb()
      },
    })
    sink.on('finish', () => resolve(html))

    const { pipe, abort } = renderToPipeableStream(
      <StrictMode>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </StrictMode>,
      {
        // onAllReady, not onShellReady: lazy routes must resolve before we
        // capture the markup, otherwise the page ships as an empty fallback.
        onAllReady() {
          pipe(sink)
        },
        onError(error) {
          abort()
          reject(error)
        },
      },
    )
  })
}
