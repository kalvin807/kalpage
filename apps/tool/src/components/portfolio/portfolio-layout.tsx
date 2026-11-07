import type { ReactNode } from 'react';
import type { PaintingPayload } from '@/lib/painting/painting';
import { PaintingPixels } from './painting-pixels';

import avatarUrl from '@/assets/avatar.webp';

interface PortfolioLayoutProps {
  readonly painting: Promise<PaintingPayload | null>;
  readonly year: number;
  readonly children: ReactNode;
}

export function PortfolioLayout({ painting, year, children }: PortfolioLayoutProps) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-bg focus:p-3"
      >
        Skip to content
      </a>
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-2xl items-center gap-5 px-5 py-3">
          <a href="/" className="flex items-center gap-2.5 text-text-heading hover:no-underline">
            <img
              src={avatarUrl}
              alt=""
              width={24}
              height={24}
              loading="eager"
              className="size-6 [image-rendering:pixelated]"
            />
            kalvin.io
          </a>
          <nav aria-label="Sections" className="hidden gap-3 text-sm sm:flex">
            <a href="#work" className="text-text-muted hover:text-text-heading">
              Work
            </a>
            <a href="#projects" className="text-text-muted hover:text-text-heading">
              Projects
            </a>
            <a href="#skills" className="text-text-muted hover:text-text-heading">
              Skills
            </a>
            <a href="/tool" className="text-text-muted hover:text-text-heading">
              Tools
            </a>
          </nav>
          <div className="ml-auto flex gap-2 text-sm">
            <a
              href="https://github.com/kalvin807"
              className="inline-flex min-h-9 items-center border border-line px-3 text-text-heading hover:border-text-muted hover:no-underline"
            >
              GitHub
            </a>
            <a
              href="mailto:6q4zz1i46@relay.firefox.com"
              className="inline-flex min-h-9 items-center bg-text px-3 text-bg hover:bg-text-heading hover:no-underline"
            >
              Email
            </a>
          </div>
        </div>
      </header>

      <main id="main-content" className="mx-auto max-w-2xl px-5">
        {children}
      </main>

      <footer className="mt-20 border-t border-line">
        <PaintingPixels painting={painting} />
        <div className="border-t border-line">
          <div className="mx-auto flex max-w-2xl flex-wrap justify-between gap-2 px-5 py-4 text-xs text-text-muted">
            <span>
              &copy; {year} Kal.L ·{' '}
              <a href="/tool" className="text-text-muted hover:text-text-heading">
                Tools
              </a>
            </span>
            <span className="tabular-nums">35.6762&deg; N, 139.6503&deg; E</span>
          </div>
        </div>
      </footer>
    </>
  );
}
