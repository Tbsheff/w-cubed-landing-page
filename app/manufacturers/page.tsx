"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, ExternalLink, Grid, List } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
    logo: "/placeholder.svg?height=120&width=200&text=KSB",
    category: "Pumps & Mixers",
    description:
      "Leading manufacturer of pumps, valves, and systems for water transport and treatment.",
    keyProducts: [
      "Amacan K/P - Wet-installed submersible motor pump",
      "Amaline - Horizontal propeller pump with submersible motor",
      "ARX - Vertical single-stage submersible motor pump",
      "KRT - Horizontal/vertical single-stage submersible motor pump",
      "Horizontal Split Case Pumps (NSF61)",
      "Vertical Turbine Pumps",
      "Amamix - Horizontal submersible mixer",
      "Amaprop - Horizontal submersible mixer with gear drive",
    ],
    website: "https://www.ksb.com/en-us/product/product-catalog",
    established: "1871",
    specialty: "Municipal & Industrial Pumping & Mixing",
  },
  {
    id: "kaeser",
    name: "Kaeser Blowers",
    logo: "/placeholder.svg?height=120&width=200&text=Kaeser",
    category: "Air Systems",
    description: "Premium compressed air systems and blowers for water treatment applications.",
    keyProducts: [
      "Rotary lobe blowers with OMEGA rotors",
      "Rotary screw blowers with SIGMA profile",
      "Turbo blowers with permanent magnet motors",
      "Magnetic bearing systems",
    ],
    website: "https://us.kaeser.com/products-and-solutions/blowers/",
    established: "1919",
    specialty: "Compressed Air & Blower Systems",
  },
  {
    id: "pratt",
    name: "Pratt Valves",
    logo: "/placeholder.svg?height=120&width=200&text=Pratt",
    category: "Valves",
    description: "Comprehensive valve solutions for water and wastewater applications.",
    keyProducts: [
      "Butterfly Valves",
      "Knife Gate Valves",
      "Energy Dissipating Valves",
      "Gate Valves",
      "Plug Valves",
      "Ball-Rotary Cone Valves",
      "Check Valves",
      "Air Valves",
    ],
    website: "https://www.henrypratt.com/products/",
    established: "1945",
    specialty: "Water & Wastewater Valves",
  },
  {
    id: "hydro-gate",
    name: "Hydro Gate",
    logo: "/placeholder.svg?height=120&width=200&text=Hydro+Gate",
    category: "Flow Control",
    description: "Specialized gates, valves, and flow control equipment for water systems.",
    keyProducts: [
      "Series HG 560 - AWWA C560 Heavy Duty Cast Iron Slide Gates",
      "Series HG 561 - AWWA C561 Stainless Steel Slide Gates",
      "C562, C513 - Aluminum Slide Gates",
      "Radial (Taintor) Gates",
      "Overshot Gates",
      "Heavy Duty Flap Gates",
      "Stop Logs",
      "Roller Gates",
      "Butterfly Gates",
      "Bulkhead Gates",
      "Trash Racks",
    ],
    website: "https://www.hydrogate.com/products/gates/",
    established: "1962",
    specialty: "Water Control Structures",
  },
  {
    id: "fournier",
    name: "Fournier",
    logo: "/placeholder.svg?height=120&width=200&text=Fournier",
    category: "Dewatering",
    description: "Advanced sludge dewatering solutions for wastewater treatment.",
    keyProducts: [
      "Rotary Press - Sludge De-Watering with Polymer Feed System",
      "Friction Force Screens",
      "Filter Press - Sludge De-Watering with Closed Cloth Filter",
      "Filter Shake and Press Systems",
    ],
    website: "https://www.fournierdewatering.com/",
    established: "1978",
    specialty: "Sludge Dewatering Systems",
  },
  {
    id: "edi",
    name: "EDI",
    logo: "/placeholder.svg?height=120&width=200&text=EDI",
    category: "Aeration Systems",
    description: "Membrane and diffuser systems for biological treatment processes.",
    keyProducts: [
      "EPDM Membranes",
      "Armor-Coated EPDM Membranes",
      "Standard Polyurethane Membranes",
      "High-Temperature Polyurethane (HTPU)",
      "Matrix & Matrix Plus Membranes",
      "Silicone Membranes",
      "Coarse Air Diffusers",
      "Fine Air Diffusers",
      "Disc, Tube, and Panel Diffusers",
      "ModuleAir Retrievable Systems",
    ],
    website: "https://wastewater.com/",
    established: "1985",
    specialty: "Membrane & Diffuser Systems",
  },
  {
    id: "veolia-suez",
    name: "Veolia/Suez",
    logo: "/placeholder.svg?height=120&width=200&text=Veolia+Suez",
    category: "Treatment Solutions",
    description: "Comprehensive water treatment and reuse solutions.",
    keyProducts: [
      "Physical/chemical processes",
      "Biological treatment systems",
      "Anaerobic wastewater treatment",
      "Filtration and separation",
      "Evaporation and crystallization",
      "Mobile water treatment",
      "Treatment chemicals",
      "Membrane-based solutions",
      "UV Disinfection & Oxidation",
    ],
    website: "https://www.watertechnologies.com/",
    established: "1853",
    specialty: "Water Treatment & Reuse",
  },
  {
    id: "trillium-flow",
    name: "Trillium Flow Technologies",
    logo: "/placeholder.svg?height=120&width=200&text=Trillium+Flow",
    category: "Pumps & Equipment",
    description: "Specialized pumping and grit removal equipment for wastewater treatment.",
    keyProducts: [
      "WEMCO HydroGritter",
      "Grit Cyclone and Classifier",
      "Screw-Flow Screw Impeller Pumps",
      "Torque Flow (Model C) Grit Pumps",
      "Prerotation Wet Well Cleaning System",
      "WSP Chop Flow Pumps",
      "Non-Clog Pumps",
      "Self-Primer Pumping Options",
    ],
    website: "https://www.trilliumflow.com/",
    established: "2019",
    specialty: "Grit Removal & Pumping",
  },
  {
    id: "kusters-zima",
    name: "Kusters Zima Water",
    logo: "/placeholder.svg?height=120&width=200&text=Kusters+Zima",
    category: "Treatment Equipment",
    description: "Dependable, cost-effective solutions for water and wastewater treatment.",
    keyProducts: [
      "C.I. Bridge Supported Drives",
      "Hydraulic Clarifier Drives",
      "C.I. Pier Supported Turntables",
      "Flocculating Clarifiers",
      "LA-EDI Clarifier Inlets",
      "Solids Contact Clarifiers",
      "Spiral Blade Clarifiers",
      "Standard Scraper Clarifiers",
      "Suction Lift Clarifiers",
      "Traveling Bridge Clarifier",
      "Zi-Biox Package Plants",
      "Trickling Filter Distributors",
      "Multi-Rake Bar Screens",
      "Internally Fed Drum Screens",
      "Screenings Washer Compactors",
      "Perforated Plate Filter Screens",
      "Centerflow Band Screens",
      "XGT Vortex Grit Removal Systems",
    ],
    website: "https://www.zimacorp.com/water/",
    established: "1950",
    specialty: "Clarification & Headworks",
  },
  {
    id: "pentair-fairbanks",
    name: "Pentair Fairbanks",
    logo: "/placeholder.svg?height=120&width=200&text=Pentair+Fairbanks",
    category: "Pumps",
    description: "Submersible and solids handling pumps for wastewater applications.",
    keyProducts: [
      "Submersible Solids Handling Pumps",
      "Solids Handling Pumps",
      "Vertical Turbine Solids Handling Pumps",
      "Vortex Pumps",
      "Split Case Pumps",
      "In-Line Pumps",
      "Propeller Pumps",
      "End Suction Pumps",
    ],
    website: "https://www.pentair.com/en-us/brands/fairbanks-nijhuis.html",
    established: "1893",
    specialty: "Solids Handling Pumps (Utah Only)",
    territoryNote:
      "We only represent Pentair Fairbanks products for the State of Utah. Not Idaho or Wyoming.",
  },
];

const categories = [
  "All",
  "Pumps & Mixers",
  "Air Systems",
  "Valves",
  "Flow Control",
  "Dewatering",
  "Aeration Systems",
  "Treatment Solutions",
  "Pumps & Equipment",
  "Treatment Equipment",
  "Pumps",
];

export default function ManufacturersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredManufacturers = manufacturers.filter((manufacturer) => {
    const matchesSearch =
      manufacturer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      manufacturer.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || manufacturer.category === selectedCategory;
    return matchesSearch && matchesCategory;
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
                onChange={(e) => setSearchTerm(e.target.value)}
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
                    onClick={() => setSelectedCategory(category)}
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
                  onClick={() => setViewMode("grid")}
                  className={
                    viewMode === "grid" ? "bg-[#4986C8] hover:bg-[#4986C8]/90" : "bg-transparent"
                  }
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
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
                        <Image
                          src={manufacturer.logo || "/placeholder.svg"}
                          alt={`${manufacturer.name} logo`}
                          width={200}
                          height={120}
                          className="max-h-16 w-auto object-contain"
                        />
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
                          <Image
                            src={manufacturer.logo || "/placeholder.svg"}
                            alt={`${manufacturer.name} logo`}
                            width={200}
                            height={120}
                            className="h-16 w-auto object-contain"
                          />
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
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="mt-4 bg-transparent"
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
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
