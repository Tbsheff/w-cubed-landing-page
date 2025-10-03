"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ArrowLeft, Phone, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

// Manufacturer data array for individual pages (contains more detailed information)
interface ManufacturerDetail {
  name: string;
  logo: string;
  category: string;
  description: string;
  keyProducts: string[];
  website: string;
  specialty: string;
  territoryNote?: string;
}

const manufacturerData: Record<string, ManufacturerDetail> = {
  ksb: {
    name: "KSB",
    logo: "/manufacturers/ksb-logo.svg",
    category: "Pumps & Mixers",
    description:
      "Leading manufacturer of pumps, valves, and systems for water transport and treatment.",
    keyProducts: [
      "<b>KSB PUMPS:</b>",
      "• Amacan K/P: Wet-installed submersible motor pump for installation in discharge tubes with or without Axial Propeller options",
      "• Amaline: Wet-installed horizontal propeller pump with submersible motor, equipped with direct drive or spur gear",
      "• ARX: Vertical single-stage submersible motor pump for wet installation, with vortex impeller or open dual-vane impeller",
      "• KRT: Horizontal or vertical single-stage submersible motor pump in close-coupled design, with various next-generation impeller types, for wet or dry installation",
      "• Horizontal Split Case Pumps (NSF61)",
      "• Vertical Turbine Pumps",
      "• Horizontal Radially Splite Volute Casing Pumps",
      "• Close Coupled Horizontal and Vertical Volute Casing Pumps",
      "• Cutter(Grinder) Pumps",
      "<b>KSB MIXERS:</b>",
      "• Amamix: Horizontal submersible mixer with self-cleaning ECB propeller, close-coupled design, direct drive",
      "• Amaprop: Horizontal submersible mixer with self-cleaning ECB propeller, close-coupled design, with coaxial spur gear drive",
    ],
    website: "https://www.ksb.com/en-us/product/product-catalog",
    specialty: "Municipal & Industrial Pumping & Mixing",
  },
  kaeser: {
    name: "Kaeser Blowers",
    logo: "/manufacturers/Kaeser-compressor-logo.png",
    category: "Blowers & Aeration",
    description: "Premium compressed air systems and blowers for water treatment applications.",
    keyProducts: [
      "<b>KAESER BLOWERS PRODUCTS:</b>",
      "• Rotary lobe blowers with our efficient tri-lobe OMEGA rotors to minimize pulsation effects",
      "• Rotary screw blowers with the energy-saving SIGMA profile – designed by KAESER for optimum pressure and output",
      "• Turbo blowers with high-speed, permanent magnet motors featuring wear-proof, magnetic bearings",
    ],
    website: "https://us.kaeser.com/products-and-solutions/blowers/",
    specialty: "Compressed Air & Blower Systems",
  },
  pratt: {
    name: "Pratt Valves",
    logo: "/manufacturers/pratt-a-mueller-brand-logo-vector.png",
    category: "Valves & Flow Control",
    description: "Comprehensive valve solutions for water and wastewater applications.",
    keyProducts: [
      "<b>PRATT VALVES PRODUCTS:</b>",
      "• Butterfly Valves",
      "• Knife Gate Valves",
      "• Energy Dissipating Valves",
      "• Gate Valves",
      "• Plug Valves",
      "• Ball-Rotary Cone Valves",
      "• Check Valves",
      "• Air Valves",
    ],
    website: "https://www.henrypratt.com/products/",
    specialty: "Water & Wastewater Valves",
  },
  "hydro-gate": {
    name: "Hydro Gate",
    logo: "/manufacturers/Hydro-gate-logo.png",
    category: "Valves & Flow Control",
    description: "Specialized gates, valves, and flow control equipment for water systems.",
    keyProducts: [
      "<b>HYDRO GATE PRODUCTS:</b>",
      "• Series HG 560: AWWA C560 Heavy Duty Cast Iron Slide Gates",
      "• Series HG 561: AWWA C561 Stainless Steel Slide Gates",
      "• C562, C513 - Aluminum Slide Gates",
      "• Radial (Taintor) Gates",
      "• Overshot Gates",
      "• Heavy Duty Flap Gates",
      "• Fabricated Flap Gates",
      "• Flexible Rubber Flap Gates",
      "• Stop Logs",
      "• Roller Gates",
      "• Butterfly Gates",
      "• Bulkhead Gates",
      "• Trash Racks",
      "• Dual Leaf Slide & Roller Gates",
    ],
    website: "https://www.hydrogate.com/products/gates/",
    specialty: "Water Control Structures",
  },
  fournier: {
    name: "Fournier",
    logo: "/manufacturers/Fournier-logo.svg",
    category: "Dewatering",
    description: "Advanced sludge dewatering solutions for wastewater treatment.",
    keyProducts: [
      "<b>FOURNIER DEWATERING PRODUCTS:</b>",
      "• Rotary Press: Sludge De-Watering with Polymer Feed System and Friction Force Screens",
      "• Filter Press: Sludge De-Watering with Closed Cloth Filter Shake and Press",
    ],
    website: "https://www.fournierdewatering.com/",
    specialty: "Sludge Dewatering Systems",
  },
  edi: {
    name: "EDI",
    logo: "/manufacturers/EDI-Logo.png",
    category: "Blowers & Aeration",
    description: "Membrane and diffuser systems for biological treatment processes.",
    keyProducts: [
      "<b>EDI PRODUCTS:</b>",
      "<b>Membranes:</b>",
      "• EPDM, Armor-Coated EPDM, Standard Polyurethane",
      "• High-Temperature Polyurethane (HTPU)",
      "• Matrix, Matrix Plus, Silicone",
      "• Specialty Polymers",
      "<b>Diffusers:</b>",
      "• Coarse air diffusers",
      "• Fine air diffusers in multiple options",
      "• Disc, Tube, or Panel Diffusers",
      "• Available in Fixed Grid, Submersible or Floating Laterals",
      "• ModuleAir Retrievable Systems, and Streamline Options",
    ],
    website: "https://wastewater.com/",
    specialty: "Membrane & Diffuser Systems",
  },
  "veolia-suez": {
    name: "Veolia/Suez",
    logo: "/manufacturers/suez-logo.png",
    category: "Treatment Systems",
    description: "Comprehensive water treatment and reuse solutions.",
    keyProducts: [
      "<b>VEOLIA/SUEZ PRODUCTS:</b>",
      "• Produced Water/Waste Discharge and Reuse Help Opportunities",
      "• Physical/chemical processes",
      "• Biological treatment",
      "• Anaerobic wastewater treatment",
      "• Filtration and separation",
      "• Evaporation and crystallization",
      "• Mobile water treatment",
      "• Treatment chemicals and membrane-based solution",
      "• UV Disinfection & Oxidation for Water Treatment",
    ],
    website: "https://www.watertechnologies.com/",
    specialty: "Water Treatment & Reuse",
  },
  "trillium-flow": {
    name: "Trillium Flow Technologies",
    logo: "/manufacturers/Trillium-logo.png",
    category: "Grit Removal",
    description: "Specialized pumping and grit removal equipment for wastewater treatment.",
    keyProducts: [
      "<b>TRILLIUM FLOW TECHNOLOGIES PRODUCTS:</b>",
      "<b>WEMCO:</b>",
      "• HydroGritter, Grit Cyclone and Classifier",
      "• Screw-Flow Screw Impeller Pumps",
      "• Torque Flow (Model C) Grit Pumps",
      "• Prerotation An Automatic Wet Well Cleaning and Flow Matching System",
      "<b>WSP:</b>",
      "• Chop Flow, Non-Clog, Self-Primer Pumping Options",
    ],
    website: "https://www.trilliumflow.com/",
    specialty: "Grit Removal & Pumping",
  },
  "kusters-zima": {
    name: "Kusters Zima Water",
    logo: "/manufacturers/kusters-water-logo.png",
    category: "Treatment Systems",
    description: "Dependable, Cost-Effective Solutions for Water and WasteWater Treatment.",
    keyProducts: [
      "<b>KUSTERS ZIMA WATER PRODUCTS:</b>",
      "<b>Clarification:</b>",
      "• C.I. Bridge Supported Drives Hydraulic Clarifier Drives",
      "• C.I. Pier Supported Turntables Drives Flocculating Clarifiers",
      "• LA-EDI Clarifier Inlets Solids Contact Clarifiers",
      "• Spiral Blade Clarifiers Standard Scraper Clarifiers",
      "• Suction Lift Clarifiers Tapered Header Suction Clarifiers",
      "• Traveling Bridge Clarifier",
      "<b>Biological:</b>",
      "• Zi-Biox Package WasteWater Treatment Plants",
      "• Zi-Biox Trickling Filter Distributor",
      "<b>Headworks Protechtor Product Lines:</b>",
      "• Multi-Rake Bar Screens",
      "• Internally Fed Drum Screens Screenings Washer Compactors",
      "• Perforated Plate Filter Screens Centerflow Band Screens",
      "• Circular Grit Collectors, Grit Washers Grit Classifiers",
      "• Headworks Complete Plant Packaged Solution",
    ],
    website: "https://www.zimacorp.com/water/",
    specialty: "Clarification & Headworks",
  },
  "pentair-fairbanks": {
    name: "Pentair Fairbanks",
    logo: "/manufacturers/pentair-logo.png",
    category: "Solids Handling Pumps",
    description: "Submersible and solids handling pumps for wastewater applications.",
    keyProducts: [
      "<b>PENTAIR FAIRBANKS NIJHUIS PUMPS:</b>",
      "• Submersible Solids Handling Pumps",
      "• Solids Handling Pumps",
      "• Vertical Turbine Solids Handling Pumps",
      "• Vortex Pumps",
      "• Split Case Pumps",
      "• In-Line Pumps",
      "• Propeller Pumps",
      "• End Suction Pumps",
    ],
    website: "https://www.pentair.com/en-us/brands/fairbanks-nijhuis.html",
    specialty: "Solids Handling Pumps",
    territoryNote:
      "We only represent Pentair Fairbanks products for the State of Utah. Not Idaho or Wyoming.",
  },
};

export default function ManufacturerDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  // Fetch manufacturer data or default to KSB
  const manufacturer =
    manufacturerData[slug as keyof typeof manufacturerData] || manufacturerData.ksb;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <SiteHeader />

      {/* Breadcrumb */}
      <section className="py-6 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="flex items-center space-x-2 text-sm" {...fadeInUp}>
            <Link
              href="/manufacturers"
              className="flex items-center text-[#4986C8] hover:underline"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Manufacturers
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Hero Section - Centered with Logo Above */}
      <section className="py-10 md:py-14 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="max-w-3xl mx-auto text-center" {...fadeInUp}>
            {/* Logo */}
            {manufacturer.logo && (
              <div className="mt-8 mb-6">
                <Image
                  src={manufacturer.logo}
                  alt={`${manufacturer.name} logo`}
                  width={160}
                  height={100}
                  className="h-16 md:h-20 w-auto object-contain mx-auto"
                />
              </div>
            )}

            {/* Company Name - Larger */}
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-[#1C4E80] mb-2">
              {manufacturer.name}
            </h1>

            {/* Category Badge - Moved below title, centered */}
            <div className="mb-4 text-center">
              <Badge
                variant="outline"
                className="border-[#4986C8]/30 text-[#4986C8] bg-blue-50 px-3 py-1 inline-block"
              >
                {manufacturer.category}
              </Badge>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-700 leading-relaxed mb-6 max-w-2xl mx-auto">
              {manufacturer.description}
            </p>

            {/* Territories Note */}
            {manufacturer.territoryNote && (
              <div className="bg-[#4986C8]/10 border border-[#4986C8]/30 rounded-lg p-4 mx-auto mb-6">
                <p className="text-[#1C4E80] font-semibold">⚠️ Territory Restriction</p>
                <p className="text-[#123D6A]">{manufacturer.territoryNote}</p>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col md:flex-row gap-4 justify-center mb-10">
              <Button size="lg" className="bg-[#4986C8] hover:bg-[#4986C8]/90 px-8 py-3">
                <Phone className="mr-2 h-4 w-4" />
                Contact Rep
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-[#4986C8] text-[#4986C8] hover:bg-[#4986C8] hover:text-white px-8 py-3 font-medium"
                asChild
              >
                <a href={manufacturer.website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Visit Website
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Products Section - MOVED UP */}
      <section className="py-10 md:py-14 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div className="text-center space-y-4 mb-16" {...fadeInUp}>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1C4E80]">Key Products</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive range of water equipment solutions represented by W-Cubed
              </p>
            </motion.div>

            <div className="space-y-4">
              {manufacturer.keyProducts.map((product, index) => {
                // Check if this is a header (contains bold tags)
                const isHeader = product.includes("<b>");

                if (isHeader) {
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <h3
                        className="text-xl font-bold text-[#1C4E80] mt-8 mb-4 first:mt-0"
                        dangerouslySetInnerHTML={{ __html: product }}
                      />
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
                        <p className="text-[#123D6A] font-medium leading-relaxed">{product}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Sales Representatives - MOVED AFTER PRODUCTS */}
      <section className="py-10 md:py-14 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div className="text-center space-y-4 mb-16" {...fadeInUp}>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1C4E80]">
                Contact Your Sales Representative
              </h2>
              <p className="text-xl text-muted-foreground">
                Our experienced sales team can help you evaluate {manufacturer.name} solutions for
                your projects.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div {...fadeInUp}>
                <Card className="text-center">
                  <CardHeader>
                    <CardTitle className="text-xl text-[#1C4E80]">Utah Territory</CardTitle>
                    <CardDescription>Sales Representative</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
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
                  <CardContent className="space-y-4">
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
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#123D6A]">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div className="text-center space-y-6 text-white" {...fadeInUp}>
              <h2 className="text-3xl lg:text-4xl font-bold">
                Ready to Discuss {manufacturer.name}?
              </h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Contact our sales team for product information, engineering support, and customized
                solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-[#4986C8] hover:bg-[#4986C8]/80">
                  <Phone className="mr-2 h-4 w-4" />
                  Contact Your Rep
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#123D6A] bg-transparent"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Request Quote
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
