import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="bg-brand-deep text-white py-12">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <span className="text-xl font-bold">W-Cubed</span>
            <p className="text-brand-light/85">
              Water-process equipment experts serving Utah, Nevada, Idaho, and Wyoming since 1986.
            </p>
            <div className="text-sm text-brand-light/70">
              <p>Salt Lake City, Utah</p>
              <p>Phone: (801) 466-3819</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-brand-light/85">
              <li>
                <Link href="/contact" className="hover:text-brand-accent transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/territory" className="hover:text-brand-accent transition-colors">
                  Territory Coverage
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-brand-light/85">
              <li>
                <Link href="/manufacturers" className="hover:text-brand-accent transition-colors">
                  Manufacturers
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-brand-accent transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-brand-accent transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <ul className="space-y-2 text-brand-light/85">
              <li>
                <a href="tel:+18014663819" className="hover:text-brand-accent transition-colors">
                  (801) 466-3819
                </a>
              </li>
              <li>
                <a
                  href="mailto:Shared@wcubedinc.com"
                  className="hover:text-brand-accent transition-colors"
                >
                  Shared@wcubedinc.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-brand-light/30 mt-8 pt-8 text-center text-brand-light/70">
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
