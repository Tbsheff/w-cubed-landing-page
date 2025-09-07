"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, ArrowLeft, Calendar, MapPin, Award, Phone, Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

// This would typically come from a CMS or API
const manufacturerData = {
  ksb: {
    name: "KSB",
    logo: "/placeholder.svg?height=120&width=200&text=KSB",
    category: "Pumps & Systems",
    established: "1871",
    headquarters: "Frankenthal, Germany",
    description:
      "KSB is a leading manufacturer of pumps, valves, and systems for water transport and treatment. With over 150 years of experience, KSB provides innovative solutions for municipal water supply, wastewater treatment, and industrial applications.",
    keyProducts: [
      "Centrifugal Pumps",
      "Submersible Pumps",
      "Control Valves",
      "Pump Systems",
      "Water Treatment Equipment",
      "Process Pumps",
    ],
    applications: [
      "Municipal Water Supply",
      "Wastewater Treatment",
      "Industrial Process",
      "Building Services",
      "Mining & Minerals",
      "Power Generation",
    ],
    certifications: ["ISO 9001", "ISO 14001", "OHSAS 18001"],
    website: "https://www.ksb.com",
    brochure: "/placeholder.pdf",
    images: [
      "/placeholder.svg?height=400&width=600&text=KSB+Pump+Installation",
      "/placeholder.svg?height=400&width=600&text=KSB+Manufacturing",
      "/placeholder.svg?height=400&width=600&text=KSB+Products",
    ],
    features: [
      {
        title: "Energy Efficiency",
        description: "Advanced hydraulic designs for maximum efficiency and reduced operating costs",
      },
      {
        title: "Reliability",
        description: "Proven technology with minimal maintenance requirements",
      },
      {
        title: "Customization",
        description: "Tailored solutions for specific application requirements",
      },
    ],
  },
}

export default function ManufacturerDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  // In a real app, you'd fetch this data based on the slug
  const manufacturer = manufacturerData[slug as keyof typeof manufacturerData] || manufacturerData.ksb

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <SiteHeader />

      {/* Breadcrumb */}
      <section className="py-6 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="flex items-center space-x-2 text-sm" {...fadeInUp}>
            <Link href="/manufacturers" className="flex items-center text-[#1FA9A4] hover:underline">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Manufacturers
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center space-x-4">
                <Image
                  src={manufacturer.logo || "/placeholder.svg"}
                  alt={`${manufacturer.name} logo`}
                  width={200}
                  height={120}
                  className="h-16 w-auto object-contain"
                />
                <Badge variant="outline" className="border-[#1FA9A4]/30 text-[#123D6A]">
                  {manufacturer.category}
                </Badge>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-[#123D6A]">{manufacturer.name}</h1>
              <p className="text-xl text-muted-foreground">{manufacturer.description}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-[#1FA9A4] hover:bg-[#1FA9A4]/90">
                  <Phone className="mr-2 h-4 w-4" />
                  Contact Rep
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent" asChild>
                  <a href={manufacturer.website} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Visit Website
                  </a>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Image
                src={manufacturer.images?.[0] || "/placeholder.svg?height=500&width=600"}
                alt={`${manufacturer.name} products`}
                width={600}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-[#1FA9A4]" />
                    <CardTitle className="text-lg text-[#123D6A]">Established</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-[#1FA9A4]">{manufacturer.established}</p>
                  <p className="text-sm text-muted-foreground">Years of experience</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-[#1FA9A4]" />
                    <CardTitle className="text-lg text-[#123D6A]">Headquarters</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold">{manufacturer.headquarters}</p>
                  <p className="text-sm text-muted-foreground">Global presence</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div {...fadeInUp}>
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-[#1FA9A4]" />
                    <CardTitle className="text-lg text-[#123D6A]">Certifications</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {manufacturer.certifications.map((cert, index) => (
                      <Badge key={index} variant="outline" className="mr-1">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Products */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="text-center space-y-4 mb-16" {...fadeInUp}>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#123D6A]">Key Products</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive range of water equipment solutions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {manufacturer.keyProducts.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg text-[#123D6A]">{product}</CardTitle>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-[#123D6A]">Applications</h2>
              <p className="text-lg text-muted-foreground">
                {manufacturer.name} equipment serves a wide range of water and wastewater applications across various
                industries.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {manufacturer.applications.map((application, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#1FA9A4] rounded-full"></div>
                    <span className="text-sm">{application}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Image
                src={manufacturer.images?.[1] || "/placeholder.svg?height=400&width=500"}
                alt={`${manufacturer.name} applications`}
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="text-center space-y-4 mb-16" {...fadeInUp}>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#123D6A]">Why Choose {manufacturer.name}?</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {manufacturer.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full">
                  <CardHeader>
                    <CardTitle className="text-xl text-[#123D6A]">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#123D6A]">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="text-center space-y-6 text-white" {...fadeInUp}>
            <h2 className="text-3xl lg:text-4xl font-bold">Ready to Learn More?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Contact our team to discuss {manufacturer.name} solutions for your next project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#1FA9A4] hover:bg-[#1FA9A4]/90">
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
      </section>

      {/* Footer */}
      <SiteFooter />
    </div>
  )
}
