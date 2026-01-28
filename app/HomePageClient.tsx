"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Droplets,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle,
  Wrench,
  Cog,
  Package,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { PageWrapper } from "@/components/page-wrapper";
import { territoryRepresentatives } from "@/lib/representatives";

type HeroContent = {
  badge?: string | null;
  title?: string | null;
  description?: string | null;
  heroImage?: string | null;
  primaryCta?: { label?: string | null; href?: string | null } | null;
  secondaryCta?: { label?: string | null; href?: string | null } | null;
};

type StatItem = { value: string; label: string; detail?: string | null };

type ManufacturerStripItem = { id: string; name: string; logo: string };

type HighlightItem = {
  title: string;
  description?: string | null;
  image?: string | null;
  category?: string | null;
  states?: string[] | null;
};

type HomePageProps = {
  hero?: HeroContent | null;
  stats?: StatItem[] | null;
  manufacturers?: ManufacturerStripItem[] | null;
  highlights?: HighlightItem[] | null;
};

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

const defaultManufacturers: ManufacturerStripItem[] = [
  { id: "ksb", name: "KSB", logo: "/manufacturers/ksb-logo.svg" },
  { id: "kaeser", name: "Kaeser Blowers", logo: "/manufacturers/Kaeser-compressor-logo.png" },
  {
    id: "pratt",
    name: "Pratt Valves",
    logo: "/manufacturers/pratt-a-mueller-brand-logo-vector.png",
  },
  { id: "hydro-gate", name: "Hydro Gate", logo: "/manufacturers/Hydro-gate-logo.png" },
  { id: "fournier", name: "Fournier", logo: "/manufacturers/Fournier-logo.svg" },
  { id: "edi", name: "EDI", logo: "/manufacturers/EDI-Logo.png" },
  { id: "veolia-suez", name: "Veolia/Suez", logo: "/manufacturers/suez-logo.png" },
  { id: "trillium-flow", name: "Trillium Flow", logo: "/manufacturers/Trillium-logo.png" },
  { id: "kusters-zima", name: "Kusters Zima", logo: "/manufacturers/kusters-water-logo.png" },
  { id: "pentair-fairbanks", name: "Pentair Fairbanks", logo: "/manufacturers/pentair-logo.png" },
];

const defaultHighlights: HighlightItem[] = [
  {
    title: "Municipal Water Treatment Facilities and Collections",
    description:
      "Successfully designed and installed pumping systems for municipal water and wastewater treatment plants and collection systems across our four-state territory.",
    image: "/placeholder.svg?height=200&width=300&text=Municipal+Project",
    category: "Municipal",
    states: ["UT", "NV", "ID", "WY"],
  },
  {
    title: "Industrial Pretreatment Solutions",
    description:
      "Custom water-process equipment solutions for manufacturing facilities and processing plants throughout the Mountain West.",
    image: "/placeholder.svg?height=200&width=300&text=Industrial+Project",
    category: "Industrial",
    states: ["UT", "NV", "ID", "WY"],
  },
  {
    title: "Commercial Pretreatment Solutions",
    description:
      "Reliable pumping and treatment systems for commercial pretreatment facilities, resorts, and infrastructure projects.",
    image: "/placeholder.svg?height=200&width=300&text=Commercial+Project",
    category: "Commercial",
    states: ["UT", "NV", "ID", "WY"],
  },
];

const defaultStats: StatItem[] = [
  { value: "38+", label: "Years in Business", detail: "Serving the Mountain West since 1986" },
  { value: "10+", label: "Trusted Manufacturers", detail: "Premium equipment partnerships" },
  { value: "4-State", label: "Coverage Area", detail: "Utah, Nevada, Idaho, and Wyoming" },
];

const defaultHero: HeroContent = {
  badge: "Serving the Mountain West Since 1986",
  title: null,
  description:
    "Your trusted partner for water treatment, pumping systems, and process equipment. Delivering reliable solutions across the Mountain West for nearly four decades.",
  heroImage: "/hero-image.png",
  primaryCta: { label: "Get Project Quote", href: "/contact" },
  secondaryCta: { label: "Browse Equipment", href: "/manufacturers" },
};

export default function WCubedLanding({ hero, stats, manufacturers, highlights }: HomePageProps) {
  const heroData = { ...defaultHero, ...(hero || {}) };
  const heroImageSrc: string = heroData.heroImage ?? "/hero-image.png";
  const statsData = stats && stats.length ? stats : defaultStats;
  const manufacturersData =
    manufacturers && manufacturers.length ? manufacturers : defaultManufacturers;
  const projectHighlights = highlights && highlights.length ? highlights : defaultHighlights;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [manufacturerSlide, setManufacturerSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projectHighlights.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projectHighlights.length) % projectHighlights.length);
  };

  const nextManufacturer = () => {
    setManufacturerSlide((prev) => (prev + 1) % Math.ceil(manufacturersData.length / 5));
  };

  const prevManufacturer = () => {
    setManufacturerSlide(
      (prev) =>
        (prev - 1 + Math.ceil(manufacturersData.length / 5)) %
        Math.ceil(manufacturersData.length / 5)
    );
  };

  // Auto-rotate manufacturer carousel every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setManufacturerSlide((prev) => (prev + 1) % Math.ceil(manufacturersData.length / 5));
    }, 8000);
    return () => clearInterval(interval);
  }, [manufacturersData.length]);

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative flex items-center overflow-hidden py-8 md:py-12 lg:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-[#95C6EC]/5" />
        <div className="container mx-auto px-4 lg:px-6 relative w-full">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-start">
            <motion.div
              className="space-y-4 md:space-y-6 relative z-10"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Large Logo with Veteran Badge */}
              <div className="flex flex-col items-center lg:items-start gap-6 lg:gap-8 mb-8 lg:mb-12">
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
                  <Image
                    src="/logo.png"
                    alt="W-Cubed"
                    width={550}
                    height={132}
                    className="h-auto w-auto max-w-[280px] sm:max-w-[350px] lg:max-w-[450px]"
                    priority
                  />
                  <div className="bg-[#1C4E80]/10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
                    <span className="text-[10px] sm:text-xs font-semibold text-[#1C4E80] uppercase tracking-wide whitespace-nowrap">
                      Veteran Owned & Operated
                    </span>
                  </div>
                </div>
                {heroData.badge && (
                  <Badge variant="outline" className="border-[#1C4E80]/30 text-[#1C4E80]">
                    {heroData.badge}
                  </Badge>
                )}
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-[#1C4E80] leading-tight mt-8">
                <HeroHeadline />
                <span className="text-2xl sm:text-3xl font-semibold tracking-wide text-[#4986C8] flex flex-wrap items-baseline gap-3 mt-2">
                  <span>serving</span>
                  <span className="whitespace-nowrap">UT</span>
                  <span className="opacity-60">·</span>
                  <span className="whitespace-nowrap">NV</span>
                  <span className="opacity-60">·</span>
                  <span className="whitespace-nowrap">ID</span>
                  <span className="opacity-60">·</span>
                  <span className="whitespace-nowrap">WY</span>
                </span>
              </h1>
              {heroData.description && (
                <p className="text-xl lg:text-2xl text-muted-foreground max-w-lg leading-relaxed">
                  {heroData.description}
                </p>
              )}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                {heroData.primaryCta?.href && heroData.primaryCta?.label && (
                  <Link href={heroData.primaryCta.href}>
                    <Button
                      size="lg"
                      className="bg-[#4986C8] hover:bg-[#4986C8]/90 text-lg px-8 py-4"
                    >
                      {heroData.primaryCta.label}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                )}
                {heroData.secondaryCta?.href && heroData.secondaryCta?.label && (
                  <Link href={heroData.secondaryCta.href}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-[#1C4E80] text-[#1C4E80] hover:bg-[#1C4E80] hover:text-white bg-transparent text-lg px-8 py-4"
                    >
                      {heroData.secondaryCta.label}
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex items-center justify-center mt-4 md:mt-20 lg:mt-40"
            >
              {/* Clean, simple equipment showcase */}
              <div className="relative bg-gradient-to-br from-white to-slate-50 rounded-3xl p-6 md:p-12 shadow-2xl border max-w-2xl w-full">
                <Image
                  src={heroImageSrc}
                  alt="Industrial Water Equipment"
                  width={600}
                  height={500}
                  className="rounded-2xl w-full"
                />

                {/* Simple floating badges */}
                <div className="absolute -top-6 -left-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border">
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#4986C8]/10 p-3 rounded-full">
                      <Droplets className="h-6 w-6 text-[#4986C8]" />
                    </div>
                    <div>
                      <div className="font-bold text-lg text-[#1C4E80]">38+ Years</div>
                      <div className="text-sm text-muted-foreground">Experience</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -right-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border">
                  <div className="flex items-center space-x-3">
                    <div className="bg-[#95C6EC]/20 p-3 rounded-full">
                      <CheckCircle className="h-6 w-6 text-[#1C4E80]" />
                    </div>
                    <div>
                      <div className="font-bold text-lg text-[#1C4E80]">4 States</div>
                      <div className="text-sm text-muted-foreground">Coverage Area</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Credibility Bar */}
      <section className="pt-8 pb-12 bg-[#1C4E80]">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {statsData.map((stat) => (
              <motion.div key={stat.label} variants={fadeInUp} className="space-y-2">
                <div className="text-4xl font-bold text-[#4986C8]">{stat.value}</div>
                <div className="text-lg">{stat.label}</div>
                {stat.detail && <div className="text-sm opacity-80">{stat.detail}</div>}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Manufacturer Logo Carousel */}
      <section id="manufacturers" className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="text-center space-y-4 mb-16" {...fadeInUp}>
            <h2 className="text-3xl font-bold text-[#123D6A]">Trusted Manufacturing Partners</h2>
            <p className="text-lg text-muted-foreground">
              We represent industry-leading manufacturers of water-process equipment
            </p>
          </motion.div>

          <div className="relative">
            <motion.div
              className="overflow-hidden"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${manufacturerSlide * 100}%)` }}
              >
                {Array.from({ length: Math.ceil(manufacturersData.length / 5) }).map(
                  (_, slideIndex) => (
                    <div key={slideIndex} className="w-full flex-shrink-0">
                      <div className="flex justify-center items-center gap-12 md:gap-16 lg:gap-20 px-6">
                        {manufacturersData
                          .slice(slideIndex * 5, slideIndex * 5 + 5)
                          .map((manufacturer) => (
                            <motion.div
                              key={manufacturer.id}
                              className="hover:scale-105 transition-all duration-300 hover:drop-shadow-lg flex items-center justify-center"
                              whileHover={{ y: -5 }}
                            >
                              <Link href={`/manufacturers/${manufacturer.id}`}>
                                {manufacturer.id === "veolia-suez" ? (
                                  <div className="flex items-center gap-3 cursor-pointer">
                                    <Image
                                      src="/manufacturers/veolia-capsule-logo.svg"
                                      alt="Veolia logo"
                                      width={120}
                                      height={80}
                                      className="h-16 w-auto object-contain"
                                    />
                                    <Image
                                      src="/manufacturers/suez-logo.png"
                                      alt="Suez logo"
                                      width={100}
                                      height={70}
                                      className="h-12 w-auto object-contain"
                                    />
                                  </div>
                                ) : (
                                  <Image
                                    src={manufacturer.logo}
                                    alt={`${manufacturer.name} logo`}
                                    width={180}
                                    height={90}
                                    className="object-contain cursor-pointer max-h-16 w-auto"
                                  />
                                )}
                              </Link>
                            </motion.div>
                          ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </motion.div>

            {/* Navigation arrows */}
            <button
              onClick={prevManufacturer}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-slate-50 transition-colors z-10"
              aria-label="Previous manufacturers"
            >
              <ChevronLeft className="h-6 w-6 text-[#123D6A]" />
            </button>
            <button
              onClick={nextManufacturer}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-3 hover:bg-slate-50 transition-colors z-10"
              aria-label="Next manufacturers"
            >
              <ChevronRight className="h-6 w-6 text-[#123D6A]" />
            </button>

            {/* Dot indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: Math.ceil(manufacturersData.length / 5) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setManufacturerSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === manufacturerSlide ? "bg-[#4986C8] w-8" : "bg-slate-300"
                  }`}
                  aria-label={`Go to manufacturer slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Badge variant="outline" className="border-[#4986C8]/30 text-[#1C4E80]">
                Our Story
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1C4E80]">
                From Garage to Industry Leader
              </h2>
              <p className="text-lg text-muted-foreground">
                W-Cubed began in 1986 when our founder started building custom control panels in his
                garage for local water treatment facilities. What started as a small operation
                focused on quality and customer service has grown into the Mountain West&apos;s
                premier water equipment representative.
              </p>
              <p className="text-lg text-muted-foreground">
                Today, we represent more than 10 leading manufacturers and serve customers across
                Utah, Nevada, Idaho, and Wyoming. Our success is built on the same principles that
                guided us from day one: technical expertise, reliable service, and genuine
                partnerships with our customers.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#4986C8]">38+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#4986C8]">4</div>
                  <div className="text-sm text-muted-foreground">States Served</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Image
                src="/placeholder.svg?height=500&width=600&text=Company+History"
                alt="W-Cubed Company History"
                width={600}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="text-center space-y-4 mb-16" {...fadeInUp}>
            <Badge variant="outline" className="border-[#4986C8]/30 text-[#1C4E80]">
              Our Expertise
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1C4E80]">
              Water-Process Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive water treatment and process equipment solutions for municipal,
              industrial, and pretreatment applications
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Droplets,
                title: "Water Treatment",
                description: "Complete treatment systems for potable and process water",
              },
              {
                icon: Package,
                title: "Pumping Systems",
                description:
                  "High-efficiency pumps and local control panels for pumping applications",
              },
              {
                icon: Wrench,
                title: "Technical Support",
                description: "Expert installation, maintenance, and repair services",
              },
              {
                icon: Cog,
                title: "Process Equipment",
                description: "Specialized equipment for industrial water processes",
              },
            ].map((service, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-l-[#4986C8]">
                  <CardHeader>
                    <div className="bg-[#4986C8]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-[#4986C8]" />
                    </div>
                    <CardTitle className="text-xl text-[#1C4E80]">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Meet Our Territory Representatives */}
      <section id="territory" className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="text-center space-y-4 mb-16" {...fadeInUp}>
            <Badge variant="outline" className="border-[#4986C8]/30 text-[#1C4E80]">
              Get In Touch
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1C4E80]">
              Meet Your Territory Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Reach out directly to the representative serving your area for quotes, project
              support, and technical guidance.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {territoryRepresentatives.map((rep) => (
              <motion.div key={rep.email} variants={fadeInUp}>
                <Card className="text-center hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    <div className="relative w-16 h-16 mx-auto mb-4">
                      <Image
                        src={rep.image || "/placeholder.svg"}
                        alt={rep.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <CardTitle className="text-xl text-[#1C4E80]">{rep.name}</CardTitle>
                    <CardDescription className="text-[#4986C8] font-medium">
                      {rep.title}
                    </CardDescription>
                    <Badge variant="secondary" className="mt-2 mx-auto">
                      {rep.role}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap justify-center gap-1">
                        {rep.territories.map((territory) => (
                          <Badge key={territory} variant="outline" className="text-xs">
                            {territory}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-center gap-2 text-[#1C4E80]">
                        <Phone className="h-4 w-4 text-[#4986C8]" />
                        <span>{rep.phone}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-[#1C4E80]">
                        <Mail className="h-4 w-4 text-[#4986C8]" />
                        <span>{rep.email}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 pt-2">
                      <Link href={`tel:${rep.phone}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          <Phone className="h-4 w-4 mr-2" /> Call
                        </Button>
                      </Link>
                      <Link href={`mailto:${rep.email}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          <Mail className="h-4 w-4 mr-2" /> Email
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-muted-foreground mb-4">Prefer a quick overview of territories?</p>
            <Link href="/territory">
              <Button
                variant="outline"
                size="lg"
                className="border-[#4986C8] text-[#4986C8] hover:bg-[#4986C8] hover:text-white"
              >
                Explore Territory Coverage
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Project Highlights Carousel */}
      <section id="projects" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="text-center space-y-4 mb-16" {...fadeInUp}>
            <Badge variant="outline" className="border-[#4986C8]/30 text-[#1C4E80]">
              Our Expertise
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1C4E80]">
              Project Types We Serve
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Specialized water-process equipment solutions across multiple industries and
              applications
            </p>
          </motion.div>

          <div className="relative">
            <motion.div
              className="overflow-hidden"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {projectHighlights.map((project, index) => {
                  const imageSrc = project.image ?? "/placeholder.svg";
                  const states = project.states ?? [];
                  return (
                    <div key={index} className="w-full flex-shrink-0 px-4">
                      <Card className="max-w-2xl mx-auto overflow-hidden">
                        <div className="md:flex">
                          <div className="md:w-1/2">
                            <Image
                              src={imageSrc}
                              alt={project.title}
                              width={300}
                              height={200}
                              className="w-full h-48 md:h-full object-cover"
                            />
                          </div>
                          <div className="md:w-1/2 p-6">
                            <Badge variant="secondary" className="mb-3">
                              {project.category}
                            </Badge>
                            <CardTitle className="text-xl mb-3 text-[#123D6A]">
                              {project.title}
                            </CardTitle>
                            <CardDescription className="mb-4">
                              {project.description}
                            </CardDescription>
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex gap-1">
                                {states.map((state, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {state}
                                  </Badge>
                                ))}
                              </div>
                              <Link href="/manufacturers">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-[#4986C8] border-[#4986C8] hover:bg-[#4986C8] hover:text-white bg-transparent"
                                >
                                  View Solutions
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Navigation buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-slate-50 transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-[#123D6A]" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-slate-50 transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-[#123D6A]" />
            </button>

            {/* Dots indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {projectHighlights.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? "bg-[#4986C8]" : "bg-slate-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Secondary CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link href="/manufacturers">
              <Button
                variant="outline"
                size="lg"
                className="border-[#1C4E80] text-[#1C4E80] hover:bg-[#1C4E80] hover:text-white bg-transparent"
              >
                View All Manufacturers
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="border-[#4986C8] text-[#4986C8] hover:bg-[#4986C8] hover:text-white bg-transparent"
              >
                Discuss Your Project
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
    </PageWrapper>
  );
}

function HeroHeadline() {
  const NB_HYPHEN = "\u2011"; // keep “Waste-water” together

  return (
    <span className="block">
      <span className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
        <WordWithAccent text="Water," />
        <WordWithAccent text={`Waste${NB_HYPHEN}Water,`} />
        <span className="inline-flex items-baseline whitespace-nowrap">Equipment</span>
        <span className="inline-flex items-baseline whitespace-nowrap">Experts</span>
      </span>
    </span>
  );
}

/**
 * Renders a word and adds a short accent underline under any leading 'W'/'w'.
 * For hyphenated words (e.g., Waste-water) it accents the 'W' of each part.
 * Uses #4986C8 for the accent, main text stays #1C4E80 (no recolor of the W).
 */
function WordWithAccent({ text }: { text: string }) {
  const NB_HYPHEN = "\u2011";

  // Split on NB hyphen but render the hyphen back between parts
  const parts = text.split(NB_HYPHEN);

  return (
    <span className="inline-flex items-baseline whitespace-nowrap text-[#1C4E80]">
      {parts.map((part, idx) => {
        // keep trailing punctuation out of the accent logic (e.g., the comma in "Water,")
        const match = part.match(/^([A-Za-z]+)([^A-Za-z]*)$/);
        const word = match ? match[1] : part;
        const trailing = match ? match[2] : "";

        const startsWithW = /^[Ww]/.test(word);

        return (
          <span key={idx} className="inline-flex items-baseline">
            {startsWithW ? (
              <>
                <span className="relative inline-block font-extrabold">
                  <span
                    className="inline-block"
                    style={{ borderBottom: "4px solid #4986C8", paddingBottom: "2px" }}
                  >
                    {word[0]}
                  </span>
                </span>
                <span className="font-extrabold">{word.slice(1)}</span>
              </>
            ) : (
              <span className="font-extrabold">{word}</span>
            )}
            <span className="font-extrabold">{trailing}</span>
            {idx < parts.length - 1 && <span className="font-extrabold">{NB_HYPHEN}</span>}
          </span>
        );
      })}
    </span>
  );
}
