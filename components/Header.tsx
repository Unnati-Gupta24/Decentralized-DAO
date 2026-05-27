'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 glass-card backdrop-blur-xl border-b border-white/15 rounded-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-background">
            ∑
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-bold gradient-text">DAO Analyzer</h1>
            <p className="text-xs text-white/50">Decentralization Metrics</p>
          </div>
        </Link>

        <nav className="flex items-center gap-8">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${
              isActive('/')
                ? 'text-primary'
                : 'text-white/60 hover:text-white/80'
            }`}
          >
            Calculator
          </Link>
          <Link
            href="/sample-daos"
            className={`text-sm font-medium transition-colors ${
              isActive('/sample-daos')
                ? 'text-primary'
                : 'text-white/60 hover:text-white/80'
            }`}
          >
            Sample DAOs
          </Link>
          <Link
            href="/theory"
            className={`text-sm font-medium transition-colors ${
              isActive('/theory')
                ? 'text-primary'
                : 'text-white/60 hover:text-white/80'
            }`}
          >
            Theory
          </Link>
        </nav>
      </div>
    </header>
  );
}
