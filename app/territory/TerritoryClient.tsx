"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageWrapper } from "@/components/page-wrapper";
import { TerritorySplitMap } from "@/components/territory-split-map";
import type { RepCoverage } from "@/lib/types/territory";
import Link from "next/link";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

type TerritoryProps = {
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  primaryCta?: { label?: string | null; href?: string | null } | null;
  secondaryCta?: { label?: string | null; href?: string | null } | null;
  representatives?: RepCoverage[];
};

export default function TerritoryPage({
  heroTitle = "Four-State Coverage Area",
  heroSubtitle = "Our experienced representatives provide personalized service across Utah, Nevada, Idaho, and Wyoming. Find your local representative and discover the counties we serve.",
  primaryCta = { label: "Find Your Representative", href: "/contact" },
  secondaryCta = { label: "View All Products", href: "/manufacturers" },
  representatives = [],
}: TerritoryProps) {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-brand-light/5" />
        <div className="container mx-auto px-4 lg:px-6 relative">
          <motion.div className="text-center space-y-6 max-w-4xl mx-auto" {...fadeInUp}>
            <Badge variant="outline" className="border-brand/30 text-brand">
              Service Territory
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-brand">
              {heroTitle}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {heroSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      <TerritorySplitMap representatives={representatives} />

      {/* CTA Section */}
      <section className="py-20 bg-brand">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="text-center space-y-6 text-white" {...fadeInUp}>
            <h2 className="text-3xl lg:text-4xl font-bold">Ready to Connect with Your Rep?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Contact your local representative to discuss your water-process equipment needs and
              get expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {primaryCta?.href && primaryCta?.label && (
                <Link href={primaryCta.href}>
                  <Button size="lg" className="bg-brand-accent hover:bg-brand-accent/90">
                    {primaryCta.label}
                  </Button>
                </Link>
              )}
              {secondaryCta?.href && secondaryCta?.label && (
                <Link href={secondaryCta.href}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-brand bg-transparent"
                  >
                    {secondaryCta.label}
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
