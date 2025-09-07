"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
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
} from "lucide-react"
import Image from "next/image"
import { TerritoryMap } from "@/components/territory-map"
import { useState } from "react"
import { PageWrapper } from "@/components/page-wrapper"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const manufacturers = [
  { name: "KSB", logo: "/placeholder.svg?height=60&width=120&text=KSB" },
  { name: "Kaeser", logo: "/placeholder.svg?height=60&width=120&text=Kaeser" },
  { name: "Pratt", logo: "/placeholder.svg?height=60&width=120&text=Pratt" },
  { name: "Hydro Gate", logo: "/placeholder.svg?height=60&width=120&text=Hydro+Gate" },
  { name: "Fournier", logo: "/placeholder.svg?height=60&width=120&text=Fournier" },
  { name: "Nexom", logo: "/placeholder.svg?height=60&width=120&text=Nexom" },
]

const blogPosts = [
  {
    title: "Optimizing Water Treatment Systems for Industrial Applications",
    excerpt:
      "Learn how to maximize efficiency in your water treatment processes with the latest equipment innovations.",
    image: "/placeholder.svg?height=200&width=300&text=Water+Treatment",
    date: "Dec 15, 2024",
    category: "Technical",
  },
  {
    title: "Case Study: Municipal Water Plant Upgrade in Salt Lake City",
    excerpt: "How we helped upgrade a major municipal facility with state-of-the-art pumping systems.",
    image: "/placeholder.svg?height=200&width=300&text=Case+Study",
    date: "Dec 10, 2024",
    category: "Project",
  },
  {
    title: "Preventive Maintenance Best Practices for Water Equipment",
    excerpt: "Essential maintenance tips to extend the life of your water-process equipment and reduce downtime.",
    image: "/placeholder.svg?height=200&width=300&text=Maintenance",
    date: "Dec 5, 2024",
    category: "Technical",
  },
]

export default function WCubedLanding() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % blogPosts.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + blogPosts.length) % blogPosts.length)
  }

  return (
    <PageWrapper>
      {/* Hero Section - Full Screen Height minus header */}
      <section className="relative h-[calc(100vh-4rem)] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-[#1FA9A4]/5" />
        <div className="container mx-auto px-4 lg:px-6 relative w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center h-full py-8">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge variant="outline" className="border-[#1FA9A4]/30 text-[#123D6A]">
                Serving the Mountain West Since 1986
              </Badge>
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-[#123D6A] leading-tight">
                Water-process equipment experts,
                <span className="text-[#1FA9A4] block">serving UT · ID · WY</span>
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-lg leading-relaxed">
                Your trusted partner for water treatment, pumping systems, and process equipment. Delivering reliable
                solutions across the Mountain West for nearly four decades.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="bg-[#1FA9A4] hover:bg-[#1FA9A4]/90 text-lg px-8 py-4">
                  Contact Your Rep
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#123D6A] text-[#123D6A] hover:bg-[#123D6A] hover:text-white bg-transparent text-lg px-8 py-4"
                >
                  View Manufacturers
                </Button>
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
                    <div className="bg-[#1FA9A4]/10 p-3 rounded-full">
                      <Droplets className="h-6 w-6 text-[#1FA9A4]" />
                    </div>
                    <div>
                      <div className="font-bold text-lg text-[#123D6A]">38+ Years</div>
                      <div className="text-sm text-muted-foreground">Experience</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -right-6 bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border">
                  <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-3 rounded-full">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <div className="font-bold text-lg text-[#123D6A]">EPA Certified</div>
                      <div className="text-sm text-muted-foreground">Compliant Solutions</div>
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
              className="w-6 h-10 border-2 border-[#1FA9A4]/30 rounded-full flex justify-center"
            >
              <div className="w-1 h-3 bg-[#1FA9A4] rounded-full mt-2"></div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Credibility Bar */}
      <section className="py-12 bg-[#123D6A]">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp} className="space-y-2">
              <div className="text-4xl font-bold text-[#1FA9A4]">38+</div>
              <div className="text-lg">Years in Business</div>
              <div className="text-sm opacity-80">Serving the Mountain West since 1986</div>
            </motion.div>
            <motion.div variants={fadeInUp} className="space-y-2">
              <div className="text-4xl font-bold text-[#1FA9A4]">15+</div>
              <div className="text-lg">Trusted Manufacturers</div>
              <div className="text-sm opacity-80">Premium equipment partnerships</div>
            </motion.div>
            <motion.div variants={fadeInUp} className="space-y-2">
              <div className="text-4xl font-bold text-[#1FA9A4]">3-State</div>
              <div className="text-lg">Coverage Area</div>
              <div className="text-sm opacity-80">Utah, Idaho, and Wyoming</div>
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
                key={index}
                variants={fadeInUp}
                className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              >
                <Image
                  src={manufacturer.logo || "/placeholder.svg"}
                  alt={`${manufacturer.name} logo`}
                  width={120}
                  height={60}
                  className="h-12 w-auto object-contain"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="text-center space-y-4 mb-16" {...fadeInUp}>
            <Badge variant="outline" className="border-[#1FA9A4]/30 text-[#123D6A]">
              Our Expertise
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#123D6A]">Water-Process Solutions</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive water treatment and process equipment solutions for municipal, industrial, and commercial
              applications
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
                <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-l-[#1FA9A4]">
                  <CardHeader>
                    <div className="bg-[#1FA9A4]/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-[#1FA9A4]" />
                    </div>
                    <CardTitle className="text-xl text-[#123D6A]">{service.title}</CardTitle>
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
      <section id="territory" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="text-center space-y-4 mb-16" {...fadeInUp}>
            <Badge variant="outline" className="border-[#1FA9A4]/30 text-[#123D6A]">
              Service Territory
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#123D6A]">Find Your Territory Representative</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our experienced representatives provide personalized service across Utah, Idaho, and Wyoming
            </p>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <TerritoryMap />
          </motion.div>
        </div>
      </section>

      {/* Blog/Project Carousel */}
      <section id="blog" className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="text-center space-y-4 mb-16" {...fadeInUp}>
            <Badge variant="outline" className="border-[#1FA9A4]/30 text-[#123D6A]">
              Latest Updates
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#123D6A]">Recent Projects & Insights</h2>
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
                {blogPosts.map((post, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <Card className="max-w-2xl mx-auto overflow-hidden">
                      <div className="md:flex">
                        <div className="md:w-1/2">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            width={300}
                            height={200}
                            className="w-full h-48 md:h-full object-cover"
                          />
                        </div>
                        <div className="md:w-1/2 p-6">
                          <Badge variant="secondary" className="mb-3">
                            {post.category}
                          </Badge>
                          <CardTitle className="text-xl mb-3 text-[#123D6A]">{post.title}</CardTitle>
                          <CardDescription className="mb-4">{post.excerpt}</CardDescription>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">{post.date}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-[#1FA9A4] border-[#1FA9A4] hover:bg-[#1FA9A4] hover:text-white bg-transparent"
                            >
                              Read More
                            </Button>
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
              {blogPosts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? "bg-[#1FA9A4]" : "bg-slate-300"
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
            <Button
              variant="outline"
              size="lg"
              className="border-[#123D6A] text-[#123D6A] hover:bg-[#123D6A] hover:text-white bg-transparent"
            >
              View All Manufacturers
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-[#1FA9A4] text-[#1FA9A4] hover:bg-[#1FA9A4] hover:text-white bg-transparent"
            >
              Read Our Blog
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="text-center space-y-4 mb-16" {...fadeInUp}>
            <Badge variant="outline" className="border-[#1FA9A4]/30 text-[#123D6A]">
              Get In Touch
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#123D6A]">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Contact our team for quotes, technical support, or to discuss your water-process equipment needs
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-[#1FA9A4]/10 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-[#1FA9A4]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#123D6A]">Phone</h3>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-[#1FA9A4]/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-[#1FA9A4]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#123D6A]">Email</h3>
                    <p className="text-muted-foreground">info@wcubedinc.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-[#1FA9A4]/10 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-[#1FA9A4]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#123D6A]">Address</h3>
                    <p className="text-muted-foreground">
                      1234 Water Works Drive
                      <br />
                      Salt Lake City, UT 84101
                    </p>
                  </div>
                </div>
              </div>
              <Card className="p-6 bg-[#1FA9A4]/5 border-[#1FA9A4]/20">
                <h3 className="font-semibold text-lg mb-2 text-[#123D6A]">Emergency Support</h3>
                <p className="text-muted-foreground mb-4">
                  Need urgent assistance with your water systems? Our emergency support team is available 24/7.
                </p>
                <Button className="bg-[#1FA9A4] hover:bg-[#1FA9A4]/90">Call Emergency Line</Button>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-[#123D6A]">Send us a message</CardTitle>
                  <CardDescription>Fill out the form below and we'll get back to you within 24 hours.</CardDescription>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">First Name</label>
                        <Input placeholder="John" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Last Name</label>
                        <Input placeholder="Doe" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <Input type="email" placeholder="john@company.com" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Company</label>
                      <Input placeholder="Your Company Name" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Message</label>
                      <Textarea placeholder="Tell us about your water-process equipment needs..." rows={4} />
                    </div>
                    <Button className="w-full bg-[#1FA9A4] hover:bg-[#1FA9A4]/90">Send Message</Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
    </PageWrapper>
  )
}
