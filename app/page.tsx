"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Droplets,
  Phone,
  Mail,
  MapPin,
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

const projectHighlights = [
  {
    title: "Municipal Water Treatment Facilities",
    description:
      "Successfully designed and installed pumping systems for municipal water and wastewater treatment plants across our four-state territory.",
    image: "/placeholder.svg?height=200&width=300&text=Municipal+Project",
    category: "Municipal",
    states: ["UT", "NV", "ID", "WY"],
  },
  {
    title: "Industrial Plant Solutions",
    description:
      "Custom water-process equipment solutions for manufacturing facilities, mines, and processing plants throughout the Mountain West.",
    image: "/placeholder.svg?height=200&width=300&text=Industrial+Project",
    category: "Industrial",
    states: ["UT", "ID"],
  },
  {
    title: "Commercial & Infrastructure",
    description:
      "Reliable pumping and treatment systems for commercial developments, resorts, and infrastructure projects.",
    image: "/placeholder.svg?height=200&width=300&text=Commercial+Project",
    category: "Commercial",
    states: ["NV", "WY"],
  },
];

export default function WCubedLanding() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projectHighlights.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projectHighlights.length) % projectHighlights.length);
  };

  return (
    <PageWrapper>
      {/* Hero Section - Full Screen Height minus header */}
      <section className="relative h-[calc(100vh-4rem)] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-[#95C6EC]/5" />
        <div className="container mx-auto px-4 lg:px-6 relative w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center h-full py-8">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge variant="outline" className="border-[#1C4E80]/30 text-[#1C4E80]">
                Serving the Mountain West Since 1986
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-[#1C4E80] leading-tight">
                Water-process equipment experts,
                <span className="text-[#4986C8] block">serving UT · NV · ID · WY</span>
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-lg leading-relaxed">
                Your trusted partner for water treatment, pumping systems, and process equipment.
                Delivering reliable solutions across the Mountain West for nearly four decades.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-[#4986C8] hover:bg-[#4986C8]/90 text-lg px-8 py-4"
                  >
                    Get Project Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/manufacturers">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-[#1C4E80] text-[#1C4E80] hover:bg-[#1C4E80] hover:text-white bg-transparent text-lg px-8 py-4"
                  >
                    Browse Equipment
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex items-center justify-center h-full"
            >
              {/* Clean, simple equipment showcase */}
              <div className="relative bg-gradient-to-br from-white to-slate-50 rounded-3xl p-12 shadow-2xl border max-w-2xl">
                <Image
                  src="/placeholder.svg?height=500&width=600&text=Clean+Industrial+Pump"
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

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm text-muted-foreground">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="w-6 h-10 border-2 border-[#4986C8]/30 rounded-full flex justify-center"
            >
              <div className="w-1 h-3 bg-[#4986C8] rounded-full mt-2"></div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Credibility Bar */}
      <section className="py-12 bg-[#1C4E80]">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="space-y-2">
              <div className="text-4xl font-bold text-[#4986C8]">38+</div>
              <div className="text-lg">Years in Business</div>
              <div className="text-sm opacity-80">Serving the Mountain West since 1986</div>
            </motion.div>
            <motion.div variants={fadeInUp} className="space-y-2">
              <div className="text-4xl font-bold text-[#4986C8]">10+</div>
              <div className="text-lg">Trusted Manufacturers</div>
              <div className="text-sm opacity-80">Premium equipment partnerships</div>
            </motion.div>
            <motion.div variants={fadeInUp} className="space-y-2">
              <div className="text-4xl font-bold text-[#4986C8]">4-State</div>
              <div className="text-lg">Coverage Area</div>
              <div className="text-sm opacity-80">Utah, Nevada, Idaho, and Wyoming</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Manufacturer Logo Strip */}
      <section id="manufacturers" className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="text-center space-y-4 mb-12" {...fadeInUp}>
            <h2 className="text-2xl font-bold text-[#123D6A]">Trusted Manufacturing Partners</h2>
            <p className="text-muted-foreground">
              We represent industry-leading manufacturers of water-process equipment
            </p>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {manufacturers.map((manufacturer, index) => (
              <motion.div
                key={manufacturer.id}
                variants={fadeInUp}
                className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              >
                <Link href={`/manufacturers/${manufacturer.id}`}>
                  {manufacturer.id === "veolia-suez" ? (
                    <div className="flex items-center gap-3 cursor-pointer">
                      <Image
                        src="/manufacturers/veolia-capsule-logo.svg"
                        alt="Veolia logo"
                        width={100}
                        height={70}
                        className="h-12 w-auto object-contain"
                      />
                      <Image
                        src="/manufacturers/suez-logo.png"
                        alt="Suez logo"
                        width={80}
                        height={60}
                        className="h-8 w-auto object-contain"
                      />
                    </div>
                  ) : (
                    <Image
                      src={manufacturer.logo}
                      alt={`${manufacturer.name} logo`}
                      width={120}
                      height={60}
                      className={`object-contain cursor-pointer ${
                        manufacturer.id === "pentair-fairbanks"
                          ? "max-h-16"
                          : manufacturer.id === "fournier"
                          ? "max-h-10"
                          : "max-h-12"
                      } w-auto`}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </motion.div>
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
              industrial, and commercial applications
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
                description: "High-efficiency pumps for all water applications",
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

      {/* Territory Selector Section */}
      <section id="territory" className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="text-center space-y-4 mb-16" {...fadeInUp}>
            <Badge variant="outline" className="border-[#4986C8]/30 text-[#1C4E80]">
              Service Territory
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1C4E80]">
              Our Expert Team Across Four States
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Dedicated representatives and specialized engineers providing comprehensive support
              across Utah, Nevada, Idaho, and Wyoming
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                name: "Brad Gwinnup",
                title: "President",
                territories: ["Utah", "Nevada"],
                phone: "801-232-8241",
                color: "#1C4E80",
              },
              {
                name: "Austin Gwinnup",
                title: "Sales Representative",
                territories: ["Idaho", "Wyoming"],
                phone: "801-803-8558",
                color: "#4986C8",
              },
              {
                name: "Cason Gwinnup",
                title: "Application Engineer",
                territories: ["All Territories"],
                phone: "801-664-2438",
                color: "#95C6EC",
              },
              {
                name: "Robert Haws",
                title: "Project Manager",
                territories: ["All Territories"],
                phone: "385-270-6128",
                color: "#1C4E80",
              },
            ].map((rep, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    <div
                      className="w-16 h-16 rounded-lg mx-auto mb-4 flex items-center justify-center text-white font-bold text-lg shadow-lg"
                      style={{ backgroundColor: rep.color }}
                    >
                      {rep.territories
                        .slice(0, 2)
                        .map((t) => t.slice(0, 2))
                        .join("")}
                    </div>
                    <CardTitle className="text-lg text-[#1C4E80]">{rep.name}</CardTitle>
                    <CardDescription className="text-sm text-[#4986C8] font-medium">
                      {rep.title}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex flex-wrap justify-center gap-1">
                      {rep.territories.map((territory, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {territory}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">{rep.phone}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Button size="lg" className="bg-[#4986C8] hover:bg-[#4986C8]/90">
              View Complete Team Directory
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Project Highlights Carousel */}
      <section id="projects" className="py-20 bg-background">
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
                {projectHighlights.map((project, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <Card className="max-w-2xl mx-auto overflow-hidden">
                      <div className="md:flex">
                        <div className="md:w-1/2">
                          <Image
                            src={project.image}
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
                          <CardDescription className="mb-4">{project.description}</CardDescription>
                          <div className="flex items-center justify-between">
                            <div className="flex gap-1">
                              {project.states.map((state, idx) => (
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
                ))}
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

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="text-center space-y-4 mb-16" {...fadeInUp}>
            <Badge variant="outline" className="border-[#4986C8]/30 text-[#1C4E80]">
              Get In Touch
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1C4E80]">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Contact our team for quotes, technical support, or to discuss your water-process
              equipment needs
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-[#4986C8]/10 p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Phone className="h-10 w-10 text-[#4986C8]" />
              </div>
              <h3 className="font-semibold text-lg text-[#1C4E80] mb-2">Call Us</h3>
              <p className="text-muted-foreground mb-2 text-sm">(801) 232-8241</p>
              <p className="text-muted-foreground mb-4">
                Speak directly with your territory representative
              </p>
              <Link href="/territory">
                <Button className="bg-[#4986C8] hover:bg-[#4986C8]/90">Find Your Rep</Button>
              </Link>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-[#4986C8]/10 p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <Mail className="h-10 w-10 text-[#4986C8]" />
              </div>
              <h3 className="font-semibold text-lg text-[#1C4E80] mb-2">Email Us</h3>
              <p className="text-muted-foreground mb-2 text-sm">Bradg@wcubedinc.com</p>
              <p className="text-muted-foreground mb-4">Send detailed project information</p>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-[#4986C8] text-[#4986C8] hover:bg-[#4986C8] hover:text-white"
                >
                  Get Quote Form
                </Button>
              </Link>
            </motion.div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="bg-[#4986C8]/10 p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-10 w-10 text-[#4986C8]" />
              </div>
              <h3 className="font-semibold text-lg text-[#1C4E80] mb-2">Visit Us</h3>
              <p className="text-muted-foreground mb-2 text-sm">Salt Lake City, Utah</p>
              <p className="text-muted-foreground mb-4">Appointment recommended</p>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-[#1C4E80] text-[#1C4E80] hover:bg-[#1C4E80] hover:text-white"
                >
                  Schedule Visit
                </Button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-muted-foreground mb-4">Need more detailed contact information?</p>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="border-[#4986C8] text-[#4986C8] hover:bg-[#4986C8] hover:text-white"
              >
                Complete Contact Form
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
    </PageWrapper>
  );
}
