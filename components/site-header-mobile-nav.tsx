"use client";

import { Menu, Star } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

type NavItem = {
  name: string;
  path: string;
};

type SiteHeaderMobileNavProps = {
  navItems: ReadonlyArray<NavItem>;
};

export function SiteHeaderMobileNav({ navItems }: SiteHeaderMobileNavProps) {
  const menuRef = useRef<HTMLDetailsElement>(null);

  const closeMenu = () => {
    menuRef.current?.removeAttribute("open");
  };

  return (
    <details ref={menuRef} className="relative lg:hidden">
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
              onClick={closeMenu}
              className="text-[15px] font-bold uppercase tracking-wider p-2 rounded transition-colors text-brand-deep hover:text-brand-accent"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/contact"
            prefetch={false}
            onClick={closeMenu}
            className="inline-block bg-brand text-white font-bold text-[15px] uppercase tracking-wider px-6 py-3 rounded-sm text-center mt-2"
          >
            Contact Rep
          </Link>
          <div className="flex items-center gap-2 bg-brand-light border-2 border-gray-200 px-3 py-2 rounded mt-2 sm:hidden">
            <Star className="h-5 w-5 text-brand-yellow fill-brand-yellow" />
            <span className="font-display text-sm font-bold uppercase text-brand-deep">
              Veteran Owned & Operated
            </span>
          </div>
        </nav>
      </div>
    </details>
  );
}
