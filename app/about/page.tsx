"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Award, Calendar, MapPin, Phone, Mail } from "lucide-react"
import Image from "next/image"
import { PageWrapper } from "@/components/page-wrapper"
import SiteFooter from "@/components/site-footer" // Declare the SiteFooter variable

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

const timeline = [
  {
    year: "1986",
    title: "Company Founded",
    description: "Started in a garage building custom control panels for water treatment facilities",
  },
  {
    year: "1992",
    title: "First Major Partnership",
    description: "Became authorized representative for KSB Pumps in the Mountain West region",
  },
  {
    year: "1998",
    title: "Expanded Territory",
    description: "Extended coverage to include Idaho and Wyoming markets",
  },
  {
    year: "2005",
    title: "Technology Focus",
    description: "Specialized in advanced water treatment and process automation systems",
  },
  {
    year: "2015",
    title: "15+ Manufacturers",
    description: "Grew to represent over 15 leading water equipment manufacturers",
  },
  {
    year: "2024",
    title: "Digital Transformation",
    description: "Launched comprehensive digital presence to better serve customers",
  },
]

const team = [
  {
    name: "Brad Gwinnup",
    title: "President & CEO",
    bio: "Leading W-Cubed for over 20 years with extensive experience in water treatment systems and municipal projects.",
    image: "/placeholder.svg?height=300&width=300&text=Brad+Gwinnup",
    email: "brad@wcubedinc.com",
    phone: "(555) 123-4567",
  },
  {
    name: "Austin Gwinnup",
    title: "Vice President of Operations",
    bio: "Oversees daily operations and customer relationships across our three-state territory.",
    image: "/placeholder.svg?height=300&width=300&text=Austin+Gwinnup",
    email: "austin@wcubedinc.com",
    phone: "(555) 123-4568",
  },
  {
    name: "Jason Miller",
    title: "Senior Sales Representative",
    bio: "Technical sales specialist with 15+ years experience in industrial water systems.",
    image: "/placeholder.svg?height=300&width=300&text=Jason+Miller",
    email: "jason@wcubedinc.com",
    phone: "(555) 123-4569",
  },
]

export default function AboutPage() {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-[#1FA9A4]/5" />
        <div className="container mx-auto px-4 lg:px-6 relative">
          <motion.div className="text-center space-y-6 max-w-4xl mx-auto" {...fadeInUp}>
            <Badge variant="outline" className="border-[#1FA9A4]/30 text-[#123D6A]">
              Our Story
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-[#123D6A]">
              38 Years of Water Equipment Excellence
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From humble beginnings in a garage to becoming the Mountain West's trusted water equipment representative,
              our story is built on relationships, expertise, and unwavering commitment to our customers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Rest of the page content remains the same */}
      {/* ... */}

      {/* Company Story */}
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
              <h2 className="text-3xl lg:text-4xl font-bold text-[#123D6A]">From Garage to Industry Leader</h2>
              <p className="text-lg text-muted-foreground">
                W-Cubed began in 1986 when our founder started building custom control panels in his garage for local
                water treatment facilities. What started as a small operation focused on quality and customer service
                has grown into the Mountain West's premier water equipment representative.
              </p>
              <p className="text-lg text-muted-foreground">
                Today, we represent more than 15 leading manufacturers and serve customers across Utah, Idaho, and
                Wyoming. Our success is built on the same principles that guided us from day one: technical expertise,
                reliable service, and genuine partnerships with our customers.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#1FA9A4]">1000+</div>
                  <div className="text-sm text-muted-foreground">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#1FA9A4]">500+</div>
                  <div className="text-sm text-muted-foreground">Satisfied Customers</div>
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

      {/* Timeline */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="text-center space-y-4 mb-16" {...fadeInUp}>
            <Badge variant="outline" className="border-[#1FA9A4]/30 text-[#123D6A]">
              Our Journey
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#123D6A]">Company Timeline</h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#1FA9A4]/20"></div>
            <motion.div
              className="space-y-12"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8"}`}>
                    <Card className="inline-block">
                      <CardHeader>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-5 w-5 text-[#1FA9A4]" />
                          <Badge variant="outline" className="border-[#1FA9A4]/30 text-[#123D6A]">
                            {item.year}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl text-[#123D6A]">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">{item.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-[#1FA9A4] rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="text-center space-y-4 mb-16" {...fadeInUp}>
            <Badge variant="outline" className="border-[#1FA9A4]/30 text-[#123D6A]">
              Our Team
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#123D6A]">Meet the W-Cubed Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our experienced team brings decades of water equipment expertise to every project
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {team.map((member, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <Image
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <CardTitle className="text-xl text-[#123D6A]">{member.name}</CardTitle>
                    <CardDescription className="text-[#1FA9A4] font-medium">{member.title}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{member.bio}</p>
                    <div className="flex justify-center space-x-4">
                      <Button variant="outline" size="sm" className="bg-transparent">
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </Button>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="text-center space-y-4 mb-16" {...fadeInUp}>
            <Badge variant="outline" className="border-[#1FA9A4]/30 text-[#123D6A]">
              Our Values
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#123D6A]">What Drives Us</h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: Users,
                title: "Customer Partnership",
                description: "We build lasting relationships based on trust, expertise, and mutual success.",
              },
              {
                icon: Award,
                title: "Technical Excellence",
                description: "Our team stays current with the latest water treatment technologies and best practices.",
              },
              {
                icon: MapPin,
                title: "Regional Focus",
                description: "Deep knowledge of Mountain West markets and local regulatory requirements.",
              },
            ].map((value, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center h-full">
                  <CardHeader>
                    <div className="bg-[#1FA9A4]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-8 w-8 text-[#1FA9A4]" />
                    </div>
                    <CardTitle className="text-xl text-[#123D6A]">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{value.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#123D6A]">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="text-center space-y-6 text-white" {...fadeInUp}>
            <h2 className="text-3xl lg:text-4xl font-bold">Ready to Work Together?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Let's discuss how our 38 years of experience can help with your next water equipment project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#1FA9A4] hover:bg-[#1FA9A4]/90">
                Contact Your Rep
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#123D6A] bg-transparent"
              >
                View Our Projects
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </PageWrapper>
  )
}
