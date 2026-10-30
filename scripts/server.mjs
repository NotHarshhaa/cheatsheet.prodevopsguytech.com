import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { createRequire } from 'node:module'
import { createServer } from 'node:net'
import { fileURLToPath } from 'node:url'

const directory = fileURLToPath(new URL('../', import.meta.url))
const next = createRequire(import.meta.url).resolve('next/dist/bin/next')

async function freePort() {
  const server = createServer().listen(0, '127.0.0.1')
  await once(server, 'listening')
  const { port } = server.address()
  server.close()
  await once(server, 'close')
  return port
}

/** Start the production build with `next start` on a free loopback port. */
export async function startServer() {
  const port = await freePort()
  const child = spawn(process.execPath, [next, 'start', '-p', String(port), '-H', '127.0.0.1'], {
    cwd: directory,
    stdio: ['ignore', 'ignore', 'inherit'],
  })
  const url = `http://127.0.0.1:${port}`
  const stop = async () => {
    if (child.exitCode !== null || child.signalCode !== null) return
    const exited = once(child, 'exit')
    child.kill('SIGTERM')
    await exited
  }
  const deadline = Date.now() + 30_000
  for (;;) {
    if (child.exitCode !== null) throw new Error(`next start exited with code ${child.exitCode}.`)
    try {
      await fetch(url)
      return { url, stop }
    } catch {
      if (Date.now() > deadline) {
        await stop()
        throw new Error('next start did not answer within 30 seconds. Run the build first.')
      }
      await new Promise((resolve) => setTimeout(resolve, 200))
    }
  }
}
