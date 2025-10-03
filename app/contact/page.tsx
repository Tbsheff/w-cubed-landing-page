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
import Link from "next/link";
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

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    details: "+1 (801) 555-0199",
    description: "General inquiries and appointments",
    action: "tel:+18015550199",
    color: "bg-[#1C4E80]/10",
    iconColor: "text-[#1C4E80]",
  },
  {
    icon: Mail,
    title: "Email Us",
    details: "info@wcubedinc.com",
    description: "Send us details about your project",
    action: "mailto:info@wcubedinc.com",
    color: "bg-[#4986C8]/10",
    iconColor: "text-[#4986C8]",
  },
  {
    icon: MapPin,
    title: "Visit Our Office",
    details: "Salt Lake City, Utah",
    description: "Appointment recommended for consultations",
    action: "#",
    color: "bg-[#95C6EC]/10",
    iconColor: "text-[#95C6EC]",
  },
];

export default function ContactPage() {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-[#95C6EC]/5" />
        <div className="container mx-auto px-4 lg:px-6 relative">
          <motion.div className="text-center space-y-6 max-w-4xl mx-auto" {...fadeInUp}>
            <Badge variant="outline" className="border-[#4986C8]/30 text-[#1C4E80]">
              Contact Us
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-[#1C4E80]">
              Get Your Project Started
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ready to discuss your water equipment needs? Our experienced team is here to help you
              find the right solutions for your project across Utah, Nevada, Idaho, and Wyoming.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="text-center space-y-4 mb-16" {...fadeInUp}>
            <Badge variant="outline" className="border-[#1C4E80]/30 text-[#1C4E80]">
              How to Reach Us
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1C4E80]">
              Choose Your Preferred Contact Method
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Multiple ways to get your project discussion started
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {contactMethods.map((method, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    <div
                      className={`${method.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <method.icon className={`h-8 w-8 ${method.iconColor}`} />
                    </div>
                    <CardTitle className="text-xl text-[#1C4E80]">{method.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-semibold text-lg">{method.details}</p>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                    </div>
                    {method.action !== "#" ? (
                      <Button variant="outline" className="bg-transparent" asChild>
                        <a href={method.action}>{method.title}</a>
                      </Button>
                    ) : (
                      <Button variant="outline" className="bg-transparent">
                        Schedule Visit
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Territory Redirect */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-slate-50 mx-auto max-w-2xl">
              <CardContent className="py-8">
                <h3 className="text-xl font-semibold text-[#1C4E80] mb-4">
                  Looking for Your Territory Representative?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Find detailed contact information for representatives covering your specific state
                  or region.
                </p>
                <Link href="/territory">
                  <Button className="bg-[#4986C8] hover:bg-[#4986C8]/90">
                    <MapPin className="mr-2 h-4 w-4" />
                    Find Your Territory Rep
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-slate-50">
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
                <Badge variant="outline" className="border-[#4986C8]/30 text-[#1C4E80] mb-4">
                  Project Inquiry
                </Badge>
                <h2 className="text-3xl lg:text-4xl font-bold text-[#1C4E80]">
                  Tell Us About Your Project
                </h2>
                <p className="text-lg text-muted-foreground">
                  Fill out the form and we&apos;ll connect you with the right representative for
                  your area and project type.
                </p>
              </div>

              {/* Business Hours */}
              <Card className="p-6 bg-white border-[#4986C8]/20">
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
                    <span>By Appointment</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Response time: Within 24 hours for standard inquiries
                </p>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-6">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-[#1C4E80]">Project Contact Form</CardTitle>
                  <CardDescription>
                    Provide details about your project and we&apos;ll get you connected with the
                    right solutions.
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-0 pb-0">
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-[#1C4E80]">First Name *</label>
                        <Input placeholder="John" required />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-[#1C4E80]">Last Name *</label>
                        <Input placeholder="Doe" required />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#1C4E80]">Email *</label>
                      <Input type="email" placeholder="john@company.com" required />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#1C4E80]">Phone</label>
                      <Input type="tel" placeholder="(801) 555-1234" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#1C4E80]">Company</label>
                      <Input placeholder="Your Company Name" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#1C4E80]">Location *</label>
                      <Select required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="utah">Utah</SelectItem>
                          <SelectItem value="nevada">Nevada</SelectItem>
                          <SelectItem value="idaho">Idaho</SelectItem>
                          <SelectItem value="wyoming">Wyoming</SelectItem>
                          <SelectItem value="other">Other State</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#1C4E80]">Project Type</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new-installation">New Installation</SelectItem>
                          <SelectItem value="replacement">Equipment Replacement</SelectItem>
                          <SelectItem value="upgrade">System Upgrade</SelectItem>
                          <SelectItem value="maintenance">Maintenance Contract</SelectItem>
                          <SelectItem value="urgent-repair">Urgent Repair</SelectItem>
                          <SelectItem value="consultation">Consultation/Design</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#1C4E80]">
                        Equipment Category
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="What type of equipment?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pumps">Pumps & Pumping Systems</SelectItem>
                          <SelectItem value="valves">Valves & Flow Control</SelectItem>
                          <SelectItem value="treatment">Water Treatment Systems</SelectItem>
                          <SelectItem value="wastewater">Wastewater Treatment</SelectItem>
                          <SelectItem value="blowers">Air Systems & Blowers</SelectItem>
                          <SelectItem value="mixers">Mixers & Agitation</SelectItem>
                          <SelectItem value="multiple">Multiple Equipment Types</SelectItem>
                          <SelectItem value="unsure">Not Sure</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#1C4E80]">Timeline</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="When do you need this completed?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate (This Week)</SelectItem>
                          <SelectItem value="urgent">Urgent (Within 2 Weeks)</SelectItem>
                          <SelectItem value="month">Within 1 Month</SelectItem>
                          <SelectItem value="quarter">Within 3 Months</SelectItem>
                          <SelectItem value="planning">Planning Phase (6+ Months)</SelectItem>
                          <SelectItem value="budget">Budget Planning Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#1C4E80]">
                        Project Message *
                      </label>
                      <Textarea
                        placeholder="- Describe your specific equipment needs&#10;- Project specifications or requirements&#10;- Current system issues (if any)&#10;- Any other important details..."
                        rows={5}
                        required
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      * Required fields. By submitting this form, you agree to be contacted by
                      W-Cubed regarding your project inquiry.
                    </div>
                    <Button className="w-full bg-[#4986C8] hover:bg-[#4986C8]/90">
                      Submit Project Inquiry
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#1C4E80]">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="text-center space-y-6 text-white" {...fadeInUp}>
            <h2 className="text-3xl lg:text-4xl font-bold">Ready to Start Your Project?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Whether you&apos;re planning a new installation or need immediate support, our team is
              ready to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/manufacturers">
                <Button size="lg" className="bg-[#4986C8] hover:bg-[#4986C8]/90">
                  View Our Products
                </Button>
              </Link>
              <Link href="/territory">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#1C4E80] bg-transparent"
                >
                  Find Your Representative
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
