"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navItems = [
  { name: "Equipment", path: "/#services" },
  { name: "Manufacturers", path: "/manufacturers" },
  { name: "Territory", path: "/territory" },
  { name: "Projects", path: "/projects" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b-4 border-brand-accent shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
      <div className="container mx-auto px-4 lg:px-6 h-[90px] flex items-center justify-between">
        {/* Brand + Veteran Badge */}
        <div className="flex items-center gap-5">
          <Link href="/" className="flex items-center" aria-label="W-Cubed home">
            <Image
              src="/logo.png"
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
              className={cn(
                "text-[15px] font-bold uppercase tracking-wider transition-colors",
                pathname === item.path.split("#")[0]
                  ? "text-brand-accent"
                  : "text-brand-deep hover:text-brand-accent"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Link
            href="/contact"
            className="inline-block bg-brand text-white font-bold text-[15px] uppercase tracking-wider px-6 py-3 rounded-sm hover:bg-brand-accent transition-colors"
          >
            Contact Rep
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={cn(
                    "text-[15px] font-bold uppercase tracking-wider p-2 rounded transition-colors",
                    pathname === item.path.split("#")[0]
                      ? "text-brand-accent bg-brand-accent/5"
                      : "text-brand-deep hover:text-brand-accent"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="inline-block bg-brand text-white font-bold text-[15px] uppercase tracking-wider px-6 py-3 rounded-sm text-center mt-2"
                onClick={() => setMobileMenuOpen(false)}
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
        </div>
      )}
    </header>
  );
}
