import Link from "next/link";
import { Droplets } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-[#123D6A] text-white py-12">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Droplets className="h-8 w-8 text-[#1FA9A4]" />
              <span className="text-xl font-bold">W-Cubed</span>
            </div>
            <p className="text-slate-300">
              Water-process equipment experts serving Utah, Nevada, Idaho, and Wyoming since 1986.
            </p>
            <div className="text-sm text-slate-400">
              <p>Salt Lake City, Utah</p>
              <p>Phone: (801) 232-8241</p>
              <p>Fax: (801) 664-2439</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link href="/about" className="hover:text-[#1FA9A4] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#1FA9A4] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/territory" className="hover:text-[#1FA9A4] transition-colors">
                  Territory Coverage
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-slate-300">
              <li>
                <Link href="/manufacturers" className="hover:text-[#1FA9A4] transition-colors">
                  Manufacturers
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-[#1FA9A4] transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#1FA9A4] transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <ul className="space-y-2 text-slate-300">
              <li>
                <a href="tel:+18012328241" className="hover:text-[#1FA9A4] transition-colors">
                  (801) 232-8241
                </a>
              </li>
              <li>
                <a
                  href="mailto:Bradg@wcubedinc.com"
                  className="hover:text-[#1FA9A4] transition-colors"
                >
                  Bradg@wcubedinc.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} W-Cubed. All rights reserved. | Serving UT · NV · ID ·
            WY since 1986
          </p>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
