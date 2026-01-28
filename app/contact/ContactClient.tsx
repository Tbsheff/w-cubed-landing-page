"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Phone, Mail, Clock } from "lucide-react";
import Link from "next/link";
import { PageWrapper } from "@/components/page-wrapper";
import { territoryRepresentatives } from "@/lib/representatives";
import type { RepCoverage, TerritoryInfo as TerritoryInfoType } from "@/lib/types/territory";

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
    title: "Office Number",
    details: "+1 (801) 466-3819",
    description: "General inquiries and appointments",
    action: "tel:+18014663819",
    color: "bg-brand/10",
    iconColor: "text-brand",
    cta: "Call Now",
  },
  {
    icon: Mail,
    title: "Office Email",
    details: "Shared@wcubedinc.com",
    description: "Send us details about your project",
    action: "mailto:Shared@wcubedinc.com",
    color: "bg-brand-accent/10",
    iconColor: "text-brand-accent",
    cta: "Email Now",
  },
];

const quickContactMethods = contactMethods.slice(0, 2);

type Props = {
  representatives?: RepCoverage[] | null;
  territoryInfo?: TerritoryInfoType | null;
};

const defaultBusinessHours = [
  { label: "Monday - Friday", value: "8:00 AM - 5:00 PM MT" },
  { label: "Saturday", value: "By Appointment" },
  { label: "Sunday", value: "Closed" },
];

export default function ContactPage({ representatives, territoryInfo }: Props) {
  const repsData: Array<RepCoverage | (typeof territoryRepresentatives)[number]> =
    representatives && representatives.length > 0 ? representatives : territoryRepresentatives;
  const hours =
    territoryInfo?.businessHours && territoryInfo.businessHours.length > 0
      ? territoryInfo.businessHours
      : defaultBusinessHours;
  const heroTitle = territoryInfo?.heroTitle || "Get Your Project Started";
  const heroSubtitle =
    territoryInfo?.heroSubtitle ||
    "Tell us about your water equipment needs or reach out directly to the right representative. We respond within one business day across Utah, Nevada, Idaho, and Wyoming.";

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative py-10 lg:py-14 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-brand-light/5" />
        <div className="container mx-auto px-4 lg:px-6 relative">
          <motion.div className="max-w-4xl mx-auto text-center space-y-4" {...fadeInUp}>
            <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-brand">
              {heroTitle}
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground">{heroSubtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Project Inquiry & Quick Contact */}
      <section className="pb-20 lg:pb-24 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            className="mt-10 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="h-1 w-24 rounded-full bg-brand-accent/60" />
          </motion.div>

          <div className="grid gap-12 mt-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.6fr)] items-start">
            <motion.div
              className="space-y-3 text-center lg:text-left lg:col-span-2"
              {...fadeInUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              <h2 className="text-2xl lg:text-3xl font-semibold text-brand">Ways to Connect</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto lg:mx-0">
                Start the conversation using the project form or reach your local representative
                right away.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col gap-6 h-full"
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="flex-1"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                <motion.div variants={fadeInUp} className="h-full">
                  <Card className="border-brand-accent/20 bg-white h-full flex flex-col">
                    <CardContent className="p-6 space-y-4 flex-1">
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-brand-accent" />
                        <h3 className="font-semibold text-brand">Contact Your Representative</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Reach out to the team member covering your territory for project-specific
                        support.
                      </p>
                      <div className="space-y-3">
                        {repsData.map((rep) => (
                          <div
                            key={`${rep.email}-${rep.name}`}
                            className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-brand-accent/10 p-3"
                          >
                            <div>
                              <p className="text-sm font-medium text-brand">{rep.name}</p>
                              <p className="text-xs text-muted-foreground">{rep.role}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              {rep.phone && (
                                <a
                                  href={`tel:${rep.phone}`}
                                  className="text-sm font-semibold text-brand-accent hover:text-brand"
                                >
                                  {rep.phone}
                                </a>
                              )}
                              {rep.email && (
                                <a
                                  href={`mailto:${rep.email}`}
                                  className="text-xs text-muted-foreground hover:text-brand-accent"
                                >
                                  Email
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      <Link
                        href="/territory"
                        className="inline-flex text-sm font-semibold text-brand-accent hover:text-brand"
                      >
                        View full territory coverage
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>

              <motion.div
                className="grid sm:grid-cols-2 gap-4"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
              >
                {quickContactMethods.map((method) => (
                  <motion.div key={method.title} variants={fadeInUp}>
                    <Card className="h-full border-brand-accent/20 bg-white">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div
                            className={`${method.color} w-12 h-12 rounded-full flex items-center justify-center`}
                          >
                            <method.icon className={`h-6 w-6 ${method.iconColor}`} />
                          </div>
                          <div className="space-y-2 text-left">
                            <div>
                              <p className="font-semibold text-brand">{method.title}</p>
                              <p className="text-sm text-muted-foreground">{method.details}</p>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {method.description}
                            </p>
                            <a
                              href={method.action}
                              className="inline-flex text-sm font-semibold text-brand-accent hover:text-brand"
                            >
                              {method.cta}
                            </a>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="flex flex-col gap-4 h-full"
            >
              <Card className="p-6 flex-1 flex flex-col">
                <CardHeader className="px-0 pt-0">
                  <CardTitle className="text-brand">Project Contact Form</CardTitle>
                  <CardDescription>
                    Provide details about your project and we&apos;ll get you connected with the
                    right solutions.
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-0 pb-0 flex-1">
                  <form className="flex h-full flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-brand">First Name *</label>
                        <Input placeholder="John" required />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-brand">Last Name *</label>
                        <Input placeholder="Doe" required />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-brand">Email *</label>
                        <Input type="email" placeholder="john@company.com" required />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-brand">Phone</label>
                        <Input type="tel" placeholder="(801) 555-1234" />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-brand">Company</label>
                        <Input placeholder="Your Company Name" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-brand">Location *</label>
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
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-brand">Project Type</label>
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
                        <label className="text-sm font-medium text-brand">Equipment Category</label>
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
                    </div>
                    <div>
                      <label className="text-sm font-medium text-brand">Timeline</label>
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
                    <div className="flex-1">
                      <label className="text-sm font-medium text-brand">Project Message *</label>
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
                    <Button className="w-full bg-brand-accent hover:bg-brand-accent/90">
                      Submit Project Inquiry
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="p-6 bg-white border-brand-accent/20">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-brand-accent" />
                  <h3 className="font-semibold text-brand">Business Hours</h3>
                </div>
                <div className="grid gap-2 text-sm md:grid-cols-3 md:gap-4 flex-1">
                  {hours.map((hour) => (
                    <div
                      key={`${hour.label}-${hour.value}`}
                      className="flex justify-between md:flex-col md:gap-1 md:text-center"
                    >
                      <span>{hour.label}</span>
                      <span>{hour.value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground md:text-right">
                  Response time: Within 24 hours for standard inquiries
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="text-center space-y-6 text-white" {...fadeInUp}>
            <h2 className="text-3xl lg:text-4xl font-bold">Ready to Start Your Project?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Whether you&apos;re planning a new installation or need immediate support, our team is
              ready to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/manufacturers">
                <Button size="lg" className="bg-brand-accent hover:bg-brand-accent/90">
                  View Our Products
                </Button>
              </Link>
              <Link href="/territory">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-brand bg-transparent"
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
