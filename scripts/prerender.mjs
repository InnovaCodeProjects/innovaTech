import { mkdir, readFile, writeFile, rm } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = resolve(root, 'dist')
const ssrDist = resolve(root, 'dist-ssr')

/** Routes baked to static HTML. Anything else falls back to the SPA shell. */
const ROUTES = [
  { url: '/', out: 'index.html' },
  { url: '/portfolio', out: 'portfolio/index.html' },
]

const { render } = await import(pathToFileURL(resolve(ssrDist, 'entry-server.js')).href)

const template = await readFile(resolve(dist, 'index.html'), 'utf8')
if (!template.includes('<div id="root"></div>')) {
  throw new Error('prerender: could not find the empty #root container in dist/index.html')
}

for (const route of ROUTES) {
  const markup = await render(route.url)
  const html = template.replace('<div id="root"></div>', `<div id="root">${markup}</div>`)

  const target = resolve(dist, route.out)
  await mkdir(dirname(target), { recursive: true })
  await writeFile(target, html, 'utf8')

  console.log(`prerendered ${route.url} -> dist/${route.out} (${(html.length / 1024).toFixed(1)} kB)`)
}

await rm(ssrDist, { recursive: true, force: true })
