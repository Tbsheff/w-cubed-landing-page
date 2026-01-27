"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Manufacturers", path: "/manufacturers" },
  { name: "Territory", path: "/territory" },
  { name: "Projects", path: "/projects" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  // Show logo in header when scrolled past hero section
  useEffect(() => {
    const handleScroll = () => {
      // Show logo when scrolled more than 400px (past the large hero logo)
      setShowLogo(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AnimatePresence>
            {showLogo && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2 sm:gap-3"
              >
                <Link href="/" className="flex items-center" aria-label="W-Cubed home">
                  <Image
                    src="/logo.png"
                    alt="W-Cubed"
                    width={200}
                    height={48}
                    className="h-8 sm:h-10 w-auto"
                    priority
                  />
                </Link>
                <div className="bg-[#1C4E80]/10 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full">
                  <span className="text-[8px] sm:text-[10px] font-semibold text-[#1C4E80] uppercase tracking-wide whitespace-nowrap">
                    Veteran Owned & Operated
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "relative text-sm font-medium transition-colors",
                pathname === item.path ? "text-[#4986C8]" : "hover:text-[#4986C8]"
              )}
            >
              {item.name}
              {pathname === item.path && (
                <span className="absolute left-0 right-0 bottom-[-1px] h-[2px] bg-[#4986C8]" />
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        <div className="hidden md:block">
          <Button className="bg-[#4986C8] hover:bg-[#4986C8]/90">
            <Link href="/contact">Contact Your Rep</Link>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background border-b overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={cn(
                      "text-sm font-medium transition-colors p-2 rounded-md",
                      pathname === item.path
                        ? "text-[#4986C8] bg-[#4986C8]/10"
                        : "hover:text-[#4986C8] hover:bg-[#4986C8]/5"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <Button className="bg-[#4986C8] hover:bg-[#4986C8]/90 mt-2">
                  <Link href="/contact">Contact Your Rep</Link>
                </Button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
