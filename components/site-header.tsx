import Link from "next/link";
import { Menu, Star } from "lucide-react";
import Image from "next/image";

const navItems = [
  { name: "Equipment", path: "/#services" },
  { name: "Manufacturers", path: "/manufacturers" },
  { name: "Territory", path: "/territory" },
  { name: "Projects", path: "/projects" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b-4 border-brand-accent shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
      <div className="container mx-auto px-4 lg:px-6 h-[90px] flex items-center justify-between">
        {/* Brand + Veteran Badge */}
        <div className="flex items-center gap-5">
          <Link href="/" prefetch={false} className="flex items-center" aria-label="W-Cubed home">
            <Image
              src="/logo.webp"
              alt="W-Cubed"
              width={200}
              height={48}
              className="h-10 sm:h-12 w-auto"
              priority
            />
          </Link>
          <div className="hidden sm:flex items-center gap-2 bg-brand-light border-2 border-gray-200 px-3 py-1.5 rounded">
            <Star className="h-5 w-5 text-brand-yellow fill-brand-yellow" />
            <div className="flex flex-col leading-tight">
              <span className="font-display text-sm font-bold uppercase text-brand-deep">
                Veteran Owned
              </span>
              <span className="text-[10px] font-semibold uppercase text-muted-foreground">
                & Operated
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              prefetch={false}
              className="text-[15px] font-bold uppercase tracking-wider transition-colors text-brand-deep hover:text-brand-accent"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Link
            href="/contact"
            prefetch={false}
            className="inline-block bg-brand text-white font-bold text-[15px] uppercase tracking-wider px-6 py-3 rounded-sm hover:bg-brand-accent transition-colors"
          >
            Contact Rep
          </Link>
        </div>

        {/* Mobile Navigation (details/summary to avoid JS hydration) */}
        <details className="relative lg:hidden">
          <summary
            className="list-none p-2 cursor-pointer rounded hover:bg-brand-light/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent [&::-webkit-details-marker]:hidden"
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </summary>
          <div
            id="mobile-nav"
            className="absolute right-0 top-full mt-2 w-[calc(100vw-2rem)] max-w-sm rounded border border-gray-100 bg-white shadow-lg z-50"
          >
            <nav className="flex flex-col space-y-3 p-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  prefetch={false}
                  className="text-[15px] font-bold uppercase tracking-wider p-2 rounded transition-colors text-brand-deep hover:text-brand-accent"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/contact"
                prefetch={false}
                className="inline-block bg-brand text-white font-bold text-[15px] uppercase tracking-wider px-6 py-3 rounded-sm text-center mt-2"
              >
                Contact Rep
              </Link>
              {/* Mobile veteran badge */}
              <div className="flex items-center gap-2 bg-brand-light border-2 border-gray-200 px-3 py-2 rounded mt-2 sm:hidden">
                <Star className="h-5 w-5 text-brand-yellow fill-brand-yellow" />
                <span className="font-display text-sm font-bold uppercase text-brand-deep">
                  Veteran Owned & Operated
                </span>
              </div>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
