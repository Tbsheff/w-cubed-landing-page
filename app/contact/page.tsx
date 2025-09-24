"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import Image from "next/image";
import { TerritoryMap } from "@/components/territory-map";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: "+1 (555) 123-4567",
    description: "Monday - Friday, 8:00 AM - 5:00 PM MT",
    action: "tel:+15551234567",
  },
  {
    icon: Mail,
    title: "Email",
    details: "info@wcubedinc.com",
    description: "We'll respond within 24 hours",
    action: "mailto:info@wcubedinc.com",
  },
  {
    icon: MapPin,
    title: "Address",
    details: "1234 Water Works Drive\nSalt Lake City, UT 84101",
    description: "Visit our showroom by appointment",
    action: "#",
  },
];

const territoryReps = [
  {
    name: "Brad Gwinnup",
    title: "President",
    phone: "801-232-8241",
    email: "BradG@WCubedInc.com",
    image: "/placeholder.svg?height=200&width=200&text=Brad+Gwinnup",
    coverage: "Utah and Nevada",
  },
  {
    name: "Austin Gwinnup",
    title: "Sales Representative",
    phone: "801-803-8558",
    email: "AustinG@WCubedInc.com",
    image: "/placeholder.svg?height=200&width=200&text=Austin+Gwinnup",
    coverage: "Idaho and Wyoming",
  },
  {
    name: "Cason Gwinnup",
    title: "Application Engineer/Project Manager",
    phone: "801-664-2438",
    email: "CasonG@WCubedInc.com",
    image: "/placeholder.svg?height=200&width=200&text=Cason+Gwinnup",
    coverage: "Aftermarket Sales",
  },
  {
    name: "Robert Haws",
    title: "Application Engineer/Project Manager",
    phone: "385-270-6128",
    email: "RobertH@WCubedInc.com",
    image: "/placeholder.svg?height=200&width=200&text=Robert+Haws",
    coverage: "Parts",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-[#95C6EC]/5" />
        <div className="container mx-auto px-4 lg:px-6 relative">
          <motion.div className="text-center space-y-6 max-w-4xl mx-auto" {...fadeInUp}>
            <Badge variant="outline" className="border-[#4986C8]/30 text-[#1C4E80]">
              Get In Touch
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-[#1C4E80]">
              Contact W-Cubed
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to discuss your water equipment needs? Our experienced team is here to help you
              find the right solutions for your project across Utah, Nevada, Idaho, and Wyoming.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="text-center space-y-4 mb-16" {...fadeInUp}>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1C4E80]">How to Reach Us</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Multiple ways to connect with our team
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    <div className="bg-[#4986C8]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <info.icon className="h-8 w-8 text-[#4986C8]" />
                    </div>
                    <CardTitle className="text-xl text-[#1C4E80]">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-semibold text-lg">{info.details}</p>
                      <p className="text-sm text-muted-foreground">{info.description}</p>
                    </div>
                    <Button
                      variant="outline"
                      className="bg-transparent"
                      asChild={info.action !== "#"}
                    >
                      {info.action !== "#" ? (
                        <a href={info.action}>Contact</a>
                      ) : (
                        <span>Visit Us</span>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Territory Map Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="text-center space-y-4 mb-16" {...fadeInUp}>
            <Badge variant="outline" className="border-[#4986C8]/30 text-[#1C4E80]">
              Territory Coverage
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1C4E80]">
              Find Your Territory Representative
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our experienced representatives provide personalized service across Utah, Nevada,
              Idaho, and Wyoming
            </p>
          </motion.div>

          <motion.div
            className="flex justify-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <TerritoryMap />
          </motion.div>

          {/* Territory Representatives */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {territoryReps.map((rep, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="relative w-24 h-24 mx-auto mb-4">
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
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{rep.coverage}</p>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                        <a href={`tel:${rep.phone}`}>
                          <Phone className="h-4 w-4 mr-2" />
                          {rep.phone}
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                        <a href={`mailto:${rep.email}`}>
                          <Mail className="h-4 w-4 mr-2" />
                          Email
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                <h2 className="text-3xl lg:text-4xl font-bold text-[#1C4E80]">Send Us a Message</h2>
                <p className="text-lg text-muted-foreground">
                  Have a specific question or project in mind? Fill out the form and we'll get back
                  to you within 24 hours.
                </p>
              </div>

              <Card className="p-6 bg-[#4986C8]/5 border-[#4986C8]/20">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="h-5 w-5 text-[#4986C8]" />
                  <h3 className="font-semibold text-[#1C4E80]">Business Hours</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>8:00 AM - 5:00 PM MT</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>Emergency calls only</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-[#4986C8]/5 border-[#4986C8]/20">
                <h3 className="font-semibold text-lg mb-2 text-[#1C4E80]">Emergency Support</h3>
                <p className="text-muted-foreground mb-4">
                  Need urgent assistance with your water systems? Our emergency support team is
                  available 24/7.
                </p>
                <Button className="bg-[#4986C8] hover:bg-[#4986C8]/90">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Emergency Line
                </Button>
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
                  <CardTitle className="text-[#1C4E80]">Contact Form</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll connect you with the right representative.
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">First Name *</label>
                        <Input placeholder="John" required />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Last Name *</label>
                        <Input placeholder="Doe" required />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email *</label>
                      <Input type="email" placeholder="john@company.com" required />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Phone</label>
                      <Input type="tel" placeholder="(555) 123-4567" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Company</label>
                      <Input placeholder="Your Company Name" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">State *</label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="utah">Utah</SelectItem>
                          <SelectItem value="nevada">Nevada</SelectItem>
                          <SelectItem value="idaho">Idaho</SelectItem>
                          <SelectItem value="wyoming">Wyoming</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Project Type</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="municipal">Municipal Water</SelectItem>
                          <SelectItem value="wastewater">Wastewater Treatment</SelectItem>
                          <SelectItem value="industrial">Industrial Process</SelectItem>
                          <SelectItem value="replacement">Equipment Replacement</SelectItem>
                          <SelectItem value="maintenance">Maintenance & Service</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Message *</label>
                      <Textarea
                        placeholder="Tell us about your water-process equipment needs, project timeline, and any specific requirements..."
                        rows={4}
                        required
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      * Required fields. By submitting this form, you agree to be contacted by
                      W-Cubed regarding your inquiry.
                    </div>
                    <Button className="w-full bg-[#4986C8] hover:bg-[#4986C8]/90">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}
