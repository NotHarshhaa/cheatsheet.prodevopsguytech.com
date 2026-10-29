'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 font-mono text-zinc-300 shadow-2xl">
        <div className="flex items-center gap-2 border-b border-zinc-800/80 bg-zinc-900/90 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
          <span className="ml-2 font-sans text-xs text-zinc-400">devops-hub — error</span>
        </div>

        <div className="space-y-4 p-8 text-sm">
          <AlertTriangle className="h-10 w-10 text-red-400" />
          <p className="text-cyan-400">
            <span className="text-zinc-500">$</span> devops-hub load --guide
          </p>
          <div className="space-y-1.5 border-l border-zinc-800 pl-4">
            <p className="font-semibold text-red-400">✗ Failed to load cheatsheet</p>
            <p className="text-zinc-400">
              We couldn&apos;t load the cheatsheet you requested. Please try again later.
            </p>
            {error.digest && <p className="text-xs text-zinc-500">digest: {error.digest}</p>}
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              onClick={reset}
              className="cursor-pointer gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 font-semibold text-white shadow-lg hover:from-cyan-600 hover:to-purple-700"
            >
              <RotateCcw className="h-4 w-4" />
              Try again
            </Button>
            <Link href="/">
              <Button
                variant="outline"
                className="cursor-pointer gap-2 rounded-xl border-zinc-700 bg-zinc-900 font-mono text-xs text-zinc-300 hover:bg-zinc-800 hover:text-white"
              >
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
