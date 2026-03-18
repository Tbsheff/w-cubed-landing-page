import Link from "next/link";
import { Star } from "lucide-react";
import Image from "next/image";
import { SiteHeaderMobileNav } from "./site-header-mobile-nav";

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

        <SiteHeaderMobileNav navItems={navItems} />
      </div>
    </header>
  );
}
