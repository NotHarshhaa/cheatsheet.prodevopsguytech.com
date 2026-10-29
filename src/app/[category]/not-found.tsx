import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="bg-cyber-grid mask-fade-b relative flex min-h-screen items-center justify-center px-4">
      <div className="hero-glow pointer-events-none absolute inset-0 -z-10" />

      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 font-mono text-zinc-300 shadow-2xl">
        <div className="flex items-center gap-2 border-b border-zinc-800/80 bg-zinc-900/90 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
          <span className="ml-2 font-sans text-xs text-zinc-400">devops-hub — 404</span>
        </div>

        <div className="space-y-4 p-8 text-sm">
          <p className="text-cyan-400">
            <span className="text-zinc-500">$</span> devops-hub hub --resolve
          </p>
          <div className="space-y-1.5 border-l border-zinc-800 pl-4">
            <p className="font-semibold text-red-400">✗ Category not found</p>
            <p className="text-zinc-400">
              Sorry, we couldn&apos;t find the category you&apos;re looking for.
            </p>
            <p className="text-xs text-zinc-500">
              hint: press <span className="text-emerald-400">⌘K</span> to browse all hubs
            </p>
          </div>

          <div className="pt-2">
            <Link href="/">
              <Button className="cursor-pointer gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 font-semibold text-white shadow-lg hover:from-cyan-600 hover:to-purple-700">
                <Home className="h-4 w-4" />
                Go back home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
