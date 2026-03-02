"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, ExternalLink, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PageWrapper } from "@/components/page-wrapper";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export type ManufacturerListItem = {
  id: string;
  name: string;
  logo?: string | null;
  category?: string | null;
  description?: string | null;
  keyProducts?: string[];
  website?: string | null;
  specialty?: string | null;
  territoryNote?: string | null;
};

type Props = {
  manufacturers: ManufacturerListItem[];
};

export default function ManufacturersClient({ manufacturers }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const categories = useMemo(() => {
    const set = new Set<string>();
    manufacturers.forEach((m) => {
      if (m.category) set.add(m.category);
    });
    return ["All", ...Array.from(set)];
  }, [manufacturers]);

  const filteredManufacturers = manufacturers.filter((manufacturer) => {
    const matchesSearch =
      manufacturer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (manufacturer.description || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || manufacturer.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
  };

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative py-10 lg:py-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-light/20 to-brand-light/5" />
        <div className="container mx-auto px-4 lg:px-6 relative">
          <motion.div className="text-center space-y-6 max-w-4xl mx-auto" {...fadeInUp}>
            <Badge variant="outline" className="border-brand-accent/30 text-brand">
              Our Partners
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-display font-extrabold uppercase tracking-wide text-brand">
              Trusted Manufacturing Partners
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We represent industry-leading manufacturers of water-process equipment, bringing you
              the best solutions for your projects across Utah, Nevada, Idaho, and Wyoming.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-brand-light/20">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="space-y-6" {...fadeInUp}>
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search manufacturers..."
                value={searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters and View Toggle */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={
                      selectedCategory === category
                        ? "bg-brand-accent hover:bg-brand-accent/90 shadow-none hover:shadow-none hover:translate-y-0 normal-case tracking-normal"
                        : "bg-transparent shadow-none hover:shadow-none hover:translate-y-0 normal-case tracking-normal"
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  type="button"
                  aria-label="Grid view"
                  onClick={() => setViewMode("grid")}
                  className={
                    viewMode === "grid"
                      ? "bg-brand-accent hover:bg-brand-accent/90 shadow-none hover:shadow-none hover:translate-y-0 normal-case tracking-normal"
                      : "bg-transparent shadow-none hover:shadow-none hover:translate-y-0 normal-case tracking-normal"
                  }
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  type="button"
                  aria-label="List view"
                  onClick={() => setViewMode("list")}
                  className={
                    viewMode === "list"
                      ? "bg-brand-accent hover:bg-brand-accent/90 shadow-none hover:shadow-none hover:translate-y-0 normal-case tracking-normal"
                      : "bg-transparent shadow-none hover:shadow-none hover:translate-y-0 normal-case tracking-normal"
                  }
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Manufacturers Grid/List */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            className={
              viewMode === "grid" ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"
            }
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <AnimatePresence mode="popLayout">
              {filteredManufacturers.map((manufacturer) => {
                const logoSrc = manufacturer.logo || "/placeholder.svg";

                return (
                  <motion.div
                    key={manufacturer.id}
                    variants={fadeInUp}
                    initial="initial"
                    animate="animate"
                    exit={{ opacity: 0, scale: 0.95 }}
                    layout
                  >
                    {viewMode === "grid" ? (
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        <CardHeader className="text-center">
                          <div className="h-20 flex items-center justify-center mb-4">
                            <Image
                              src={logoSrc}
                              alt={`${manufacturer.name} logo`}
                              width={200}
                              height={120}
                              className="object-contain max-h-20 w-auto"
                            />
                          </div>
                          <CardTitle className="text-xl text-brand">{manufacturer.name}</CardTitle>
                          {manufacturer.category && (
                            <Badge variant="secondary">{manufacturer.category}</Badge>
                          )}
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <CardDescription className="text-base">
                            {manufacturer.description}
                          </CardDescription>
                          {manufacturer.keyProducts && manufacturer.keyProducts.length > 0 && (
                            <div>
                              <h4 className="font-semibold text-sm text-brand mb-2">
                                Key Products:
                              </h4>
                              <div className="flex flex-wrap gap-1">
                                {manufacturer.keyProducts.slice(0, 3).map((product, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {product}
                                  </Badge>
                                ))}
                                {manufacturer.keyProducts.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{manufacturer.keyProducts.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}
                          <div className="flex justify-between items-center pt-4">
                            <Link href={`/manufacturers/${manufacturer.id}`}>
                              <Button variant="outline" size="sm" className="bg-transparent">
                                Learn More
                              </Button>
                            </Link>
                            {manufacturer.website && (
                              <Button variant="ghost" size="sm" asChild>
                                <a
                                  href={manufacturer.website}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Visit Website
                                </a>
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-shrink-0">
                              <Image
                                src={logoSrc}
                                alt={`${manufacturer.name} logo`}
                                width={200}
                                height={120}
                                className="object-contain h-16 w-auto md:h-20"
                              />
                            </div>
                            <div className="flex-grow space-y-3">
                              <div className="flex items-center gap-3">
                                <h3 className="text-xl font-bold text-brand">
                                  {manufacturer.name}
                                </h3>
                                {manufacturer.category && (
                                  <Badge variant="secondary">{manufacturer.category}</Badge>
                                )}
                              </div>
                              <p className="text-muted-foreground">{manufacturer.description}</p>
                              {manufacturer.specialty && (
                                <div>
                                  <span className="font-semibold text-sm text-brand">
                                    Specialty:{" "}
                                  </span>
                                  <span className="text-sm">{manufacturer.specialty}</span>
                                </div>
                              )}
                              {manufacturer.keyProducts && manufacturer.keyProducts.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {manufacturer.keyProducts.map((product, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {product}
                                    </Badge>
                                  ))}
                                </div>
                              )}
                              {manufacturer.territoryNote && (
                                <p className="text-xs text-muted-foreground">
                                  {manufacturer.territoryNote}
                                </p>
                              )}
                            </div>
                            <div className="flex flex-col gap-2">
                              <Link href={`/manufacturers/${manufacturer.id}`}>
                                <Button variant="outline" size="sm" className="bg-transparent">
                                  Learn More
                                </Button>
                              </Link>
                              {manufacturer.website && (
                                <Button variant="ghost" size="sm" asChild>
                                  <a
                                    href={manufacturer.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <ExternalLink className="h-4 w-4 mr-2" />
                                    Visit Website
                                  </a>
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>

          {filteredManufacturers.length === 0 && (
            <motion.div className="text-center py-12" {...fadeInUp}>
              <p className="text-muted-foreground text-lg">
                No manufacturers found matching your criteria.
              </p>
              <Button variant="outline" onClick={clearFilters} className="mt-4 bg-transparent">
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-deep">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="text-center space-y-6 text-white" {...fadeInUp}>
            <h2 className="text-3xl lg:text-4xl font-display font-extrabold uppercase tracking-wide after:content-[''] after:block after:w-[60px] after:h-[3px] after:bg-brand-yellow after:mx-auto after:mt-3">
              Need Help Choosing Equipment?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Our experienced team can help you select the right manufacturer and equipment for your
              specific needs.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">Contact Your Rep</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
