"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageWrapper } from "@/components/page-wrapper";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export type ManufacturerDetail = {
  name: string;
  slug: string;
  logo?: string | null;
  category?: string | null;
  description?: string | null;
  keyProducts?: string[];
  website?: string | null;
  specialty?: string | null;
  territoryNote?: string | null;
};

type Props = {
  manufacturer: ManufacturerDetail;
};

export default function ManufacturerDetailClient({ manufacturer }: Props) {
  const keyProducts = manufacturer.keyProducts || [];

  return (
    <PageWrapper>
      <section className="py-6 bg-brand-light/20">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="flex items-center space-x-2 text-sm" {...fadeInUp}>
            <Link
              href="/manufacturers"
              className="flex items-center text-brand-accent hover:underline"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Manufacturers
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="max-w-3xl mx-auto text-center" {...fadeInUp}>
            {manufacturer.logo && (
              <div className="mt-8 mb-6 flex justify-center">
                <Image
                  src={manufacturer.logo}
                  alt={`${manufacturer.name} logo`}
                  width={200}
                  height={120}
                  className="h-16 md:h-20 w-auto object-contain"
                />
              </div>
            )}

            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-brand mb-2">
              {manufacturer.name}
            </h1>

            {manufacturer.category && (
              <div className="mb-4 text-center">
                <Badge
                  variant="outline"
                  className="border-brand-accent/30 text-brand-accent bg-brand-light/25 px-3 py-1 inline-block"
                >
                  {manufacturer.category}
                </Badge>
              </div>
            )}

            {manufacturer.description && (
              <p className="text-lg text-brand-deep/80 leading-relaxed mb-6 max-w-2xl mx-auto">
                {manufacturer.description}
              </p>
            )}

            {manufacturer.specialty && (
              <p className="text-base text-muted-foreground max-w-xl mx-auto mb-4">
                Specialty: {manufacturer.specialty}
              </p>
            )}

            {manufacturer.territoryNote && (
              <div className="bg-brand-accent/10 border border-brand-accent/30 rounded-lg p-4 mx-auto mb-6 max-w-2xl">
                <p className="text-brand font-semibold">Territory Note</p>
                <p className="text-brand-deep text-sm">{manufacturer.territoryNote}</p>
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-brand-accent hover:bg-brand-accent/90 px-8 py-3">
                  <Phone className="mr-2 h-4 w-4" />
                  Contact Rep
                </Button>
              </Link>
              {manufacturer.website && (
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-2 border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white px-8 py-3 font-medium"
                  asChild
                >
                  <a href={manufacturer.website} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Visit Website
                  </a>
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-brand-light/20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div className="text-center space-y-4 mb-12" {...fadeInUp}>
              <h2 className="text-3xl lg:text-4xl font-bold text-brand">Key Products</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Product highlights from {manufacturer.name}
              </p>
            </motion.div>

            {keyProducts.length === 0 ? (
              <p className="text-center text-muted-foreground">No products listed yet.</p>
            ) : (
              <div className="space-y-4">
                {keyProducts.map((product, index) => {
                  // Check if this looks like a header (starts with bold tag pattern)
                  // Strip any HTML tags for safety and check if it was meant to be a header
                  const strippedProduct = product.replace(/<[^>]*>/g, "");
                  const isHeader = product.includes("<b>") || product.includes("<strong>");

                  if (isHeader) {
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <h3 className="text-xl font-bold text-brand mt-8 mb-4 first:mt-0">
                          {strippedProduct}
                        </h3>
                      </motion.div>
                    );
                  }

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <p className="text-brand-deep font-medium leading-relaxed">
                            {strippedProduct}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <Card className="p-6 md:p-10 bg-brand-deep text-white">
            <CardHeader className="px-0">
              <CardTitle className="text-2xl md:text-3xl">
                Need help with {manufacturer.name} equipment?
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0 space-y-4">
              <p className="opacity-90">
                Our team can guide you to the right products and specifications for your project.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact">
                  <Button size="lg" className="bg-brand-accent hover:bg-brand-accent/90">
                    Contact Your Rep
                  </Button>
                </Link>
                {manufacturer.website && (
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-brand-deep bg-transparent"
                    asChild
                  >
                    <a href={manufacturer.website} target="_blank" rel="noopener noreferrer">
                      Visit Website
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </PageWrapper>
  );
}
