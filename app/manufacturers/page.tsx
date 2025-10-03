"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, ExternalLink, Grid, List } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { PageWrapper } from "@/components/page-wrapper";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const manufacturers = [
  {
    id: "ksb",
    name: "KSB",
    logo: "/manufacturers/ksb-logo.svg",
    category: "Pumps & Mixers",
    description:
      "Leading manufacturer of pumps, valves, and systems for water transport and treatment.",
    keyProducts: ["Submersible Motor Pumps", "Pump Mixing Systems", "Vertical Turbine Pumps"],
    website: "https://www.ksb.com/en-us/product/product-catalog",
    specialty: "Municipal & Industrial Pumping & Mixing",
  },
  {
    id: "kaeser",
    name: "Kaeser Blowers",
    logo: "/manufacturers/Kaeser-compressor-logo.png",
    category: "Blowers & Aeration",
    description: "Premium compressed air systems and blowers for water treatment applications.",
    keyProducts: ["Rotary Lobe Blowers", "Rotary Screw Blowers", "Turbo Blowers"],
    website: "https://us.kaeser.com/products-and-solutions/blowers/",
    specialty: "Compressed Air & Blower Systems",
  },
  {
    id: "pratt",
    name: "Pratt Valves",
    logo: "/manufacturers/pratt-a-mueller-brand-logo-vector.png",
    category: "Valves & Flow Control",
    description: "Comprehensive valve solutions for water and wastewater applications.",
    keyProducts: ["Butterfly Valves", "Gate Valves", "Check Valves"],
    website: "https://www.henrypratt.com/products/",
    specialty: "Water & Wastewater Valves",
  },
  {
    id: "hydro-gate",
    name: "Hydro Gate",
    logo: "/manufacturers/Hydro-gate-logo.png",
    category: "Valves & Flow Control",
    description: "Specialized gates, valves, and flow control equipment for water systems.",
    keyProducts: ["Slide Gates", "Radial (Taintor) Gates", "Flap Gates"],
    website: "https://www.hydrogate.com/products/gates/",
    specialty: "Water Control Structures",
  },
  {
    id: "fournier",
    name: "Fournier",
    logo: "/manufacturers/Fournier-logo.svg",
    category: "Dewatering",
    description: "Advanced sludge dewatering solutions for wastewater treatment.",
    keyProducts: ["Rotary Press Systems", "Filter Press Systems"],
    website: "https://www.fournierdewatering.com/",
    specialty: "Sludge Dewatering Systems",
  },
  {
    id: "edi",
    name: "EDI",
    logo: "/manufacturers/EDI-Logo.png",
    category: "Blowers & Aeration",
    description: "Membrane and diffuser systems for biological treatment processes.",
    keyProducts: ["Fine Bubble Membranes", "Coarse Bubble Diffusers", "Retrievable Systems"],
    website: "https://wastewater.com/",
    specialty: "Membrane & Diffuser Systems",
  },
  {
    id: "veolia-suez",
    name: "Veolia/Suez",
    logo: "/manufacturers/suez-logo.png",
    category: "Treatment Systems",
    description: "Comprehensive water treatment and reuse solutions.",
    keyProducts: ["Biological Treatment", "Membrane Solutions", "UV Disinfection"],
    website: "https://www.watertechnologies.com/",
    specialty: "Water Treatment & Reuse",
  },
  {
    id: "trillium-flow",
    name: "Trillium Flow Technologies",
    logo: "/manufacturers/Trillium-logo.png",
    category: "Grit Removal",
    description: "Specialized pumping and grit removal equipment for wastewater treatment.",
    keyProducts: ["Grit Collection Systems", "Screw Pumping", "Non-Clog Pumps"],
    website: "https://www.trilliumflow.com/",
    specialty: "Grit Removal & Pumping",
  },
  {
    id: "kusters-zima",
    name: "Kusters Zima Water",
    logo: "/manufacturers/kusters-water-logo.png",
    category: "Treatment Systems",
    description: "Dependable, cost-effective solutions for water and wastewater treatment.",
    keyProducts: ["Clarification Systems", "Package Treatment Plants", "Headworks Equipment"],
    website: "https://www.zimacorp.com/water/",
    specialty: "Clarification & Headworks",
  },
  {
    id: "pentair-fairbanks",
    name: "Pentair Fairbanks",
    logo: "/manufacturers/pentair-logo.png",
    category: "Solids Handling Pumps",
    description: "Submersible and solids handling pumps for wastewater applications.",
    keyProducts: ["Solids Handling Pumps", "Vortex Pumps", "Submersible Pumps"],
    website: "https://www.pentair.com/en-us/brands/fairbanks-nijhuis.html",
    specialty: "Solids Handling Pumps",
    territoryNote:
      "We only represent Pentair Fairbanks products for the State of Utah. Not Idaho or Wyoming.",
  },
];

const categories = [
  "All",
  "Pumps & Mixers",
  "Blowers & Aeration",
  "Valves & Flow Control",
  "Dewatering",
  "Treatment Systems",
  "Grit Removal",
  "Solids Handling Pumps",
];

export default function ManufacturersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Simple, reliable filtering without caching issues
  const filteredManufacturers = useMemo(() => {
    return manufacturers.filter((manufacturer) => {
      const matchesSearch =
        manufacturer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        manufacturer.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || manufacturer.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Simple event handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleViewModeChange = (mode: "grid" | "list") => {
    console.log("Changing view mode to:", mode);
    setViewMode(mode);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
  };

  // Debug log to track state changes
  console.log("Current state:", {
    viewMode,
    filteredCount: filteredManufacturers.length,
    searchTerm,
    selectedCategory,
  });

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-[#95C6EC]/5" />
        <div className="container mx-auto px-4 lg:px-6 relative">
          <motion.div className="text-center space-y-6 max-w-4xl mx-auto" {...fadeInUp}>
            <Badge variant="outline" className="border-[#4986C8]/30 text-[#1C4E80]">
              Our Partners
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-[#1C4E80]">
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
      <section className="py-12 bg-slate-50">
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
                    onClick={() => handleCategoryChange(category)}
                    className={
                      selectedCategory === category
                        ? "bg-[#4986C8] hover:bg-[#4986C8]/90"
                        : "bg-transparent"
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
                  onClick={() => handleViewModeChange("grid")}
                  className={
                    viewMode === "grid" ? "bg-[#4986C8] hover:bg-[#4986C8]/90" : "bg-transparent"
                  }
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleViewModeChange("list")}
                  className={
                    viewMode === "list" ? "bg-[#4986C8] hover:bg-[#4986C8]/90" : "bg-transparent"
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
            whileInView="animate"
            viewport={{ once: true }}
          >
            {filteredManufacturers.map((manufacturer, index) => (
              <motion.div key={manufacturer.id} variants={fadeInUp}>
                {viewMode === "grid" ? (
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center">
                      <div className="h-20 flex items-center justify-center mb-4">
                        {manufacturer.id === "veolia-suez" ? (
                          <div className="flex items-center gap-4">
                            <Image
                              src="/manufacturers/veolia-capsule-logo.svg"
                              alt="Veolia logo"
                              width={100}
                              height={70}
                              className="max-h-24 w-auto object-contain"
                            />
                            <Image
                              src="/manufacturers/suez-logo.png"
                              alt="Suez logo"
                              width={80}
                              height={60}
                              className="max-h-8 w-auto object-contain"
                            />
                          </div>
                        ) : (
                          <Image
                            src={manufacturer.logo || "/placeholder.svg"}
                            alt={`${manufacturer.name} logo`}
                            width={200}
                            height={120}
                            className={`object-contain ${
                              manufacturer.id === "pentair-fairbanks" ? "max-h-20" : "max-h-16"
                            } w-auto`}
                          />
                        )}
                      </div>
                      <CardTitle className="text-xl text-[#1C4E80]">{manufacturer.name}</CardTitle>
                      <Badge variant="secondary">{manufacturer.category}</Badge>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <CardDescription className="text-base">
                        {manufacturer.description}
                      </CardDescription>
                      <div>
                        <h4 className="font-semibold text-sm text-[#1C4E80] mb-2">Key Products:</h4>
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
                      <div className="flex justify-between items-center pt-4">
                        <Link href={`/manufacturers/${manufacturer.id}`}>
                          <Button variant="outline" size="sm" className="bg-transparent">
                            Learn More
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" asChild>
                          <a href={manufacturer.website} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-shrink-0">
                          {manufacturer.id === "veolia-suez" ? (
                            <div className="flex items-center gap-4">
                              <Image
                                src="/manufacturers/veolia-capsule-logo.svg"
                                alt="Veolia logo"
                                width={120}
                                height={80}
                                className="h-18 w-auto object-contain"
                              />
                              <Image
                                src="/manufacturers/suez-logo.png"
                                alt="Suez logo"
                                width={100}
                                height={60}
                                className="h-16 w-auto object-contain"
                              />
                            </div>
                          ) : (
                            <Image
                              src={manufacturer.logo || "/placeholder.svg"}
                              alt={`${manufacturer.name} logo`}
                              width={200}
                              height={120}
                              className={`object-contain ${
                                manufacturer.id === "pentair-fairbanks" ? "h-20" : "h-16"
                              } w-auto`}
                            />
                          )}
                        </div>
                        <div className="flex-grow space-y-3">
                          <div className="flex items-center gap-3">
                            <h3 className="text-xl font-bold text-[#1C4E80]">
                              {manufacturer.name}
                            </h3>
                            <Badge variant="secondary">{manufacturer.category}</Badge>
                          </div>
                          <p className="text-muted-foreground">{manufacturer.description}</p>
                          <div>
                            <span className="font-semibold text-sm text-[#1C4E80]">
                              Specialty:{" "}
                            </span>
                            <span className="text-sm">{manufacturer.specialty}</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {manufacturer.keyProducts.map((product, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {product}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Link href={`/manufacturers/${manufacturer.id}`}>
                            <Button variant="outline" size="sm" className="bg-transparent">
                              Learn More
                            </Button>
                          </Link>
                          <Button variant="ghost" size="sm" asChild>
                            <a
                              href={manufacturer.website}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Visit Site
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            ))}
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

      {/* Contact Information */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="text-center space-y-4 mb-16" {...fadeInUp}>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1C4E80]">
              Our Sales Representatives
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Contact your territory representative for expert guidance and support.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div {...fadeInUp}>
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-xl text-[#1C4E80]">Utah Territory</CardTitle>
                  <CardDescription>Sales Representative</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <h3 className="text-lg font-semibold">Brad Gwinnup</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>📞 C: 801-232-8241</p>
                    <p>📧 BradG@WCubedInc.com</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fadeInUp}>
              <Card className="text-center">
                <CardHeader>
                  <CardTitle className="text-xl text-[#1C4E80]">
                    Idaho & Wyoming Territory
                  </CardTitle>
                  <CardDescription>Sales Representative</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <h3 className="text-lg font-semibold">Austin Gwinnup</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>📞 C: 801-803-8558</p>
                    <p>📧 AustinG@WCubedInc.com</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#123D6A]">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="text-center space-y-6 text-white" {...fadeInUp}>
            <h2 className="text-3xl lg:text-4xl font-bold">Need Help Choosing Equipment?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Our experienced team can help you select the right manufacturer and equipment for your
              specific needs.
            </p>
            <Button size="lg" className="bg-[#4986C8] hover:bg-[#4986C8]/90">
              Contact Your Rep
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
    </PageWrapper>
  );
}
