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
import { Phone, Mail, Clock, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { PageWrapper } from "@/components/page-wrapper";
import { territoryRepresentatives } from "@/lib/representatives";
import type { RepCoverage, TerritoryInfo as TerritoryInfoType } from "@/lib/types/territory";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
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
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const data = new FormData(form);
    const name = `${data.get("firstName") || ""} ${data.get("lastName") || ""}`.trim();
    const email = data.get("email") as string;
    const phone = data.get("phone") as string;
    const company = data.get("company") as string;
    const location = data.get("location") as string;
    const projectType = data.get("projectType") as string;
    const equipment = data.get("equipment") as string;
    const timeline = data.get("timeline") as string;
    const message = data.get("message") as string;

    const subject = encodeURIComponent(`Project Inquiry from ${name}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        email && `Email: ${email}`,
        phone && `Phone: ${phone}`,
        company && `Company: ${company}`,
        location && `Location: ${location}`,
        projectType && `Project Type: ${projectType}`,
        equipment && `Equipment: ${equipment}`,
        timeline && `Timeline: ${timeline}`,
        `\nMessage:\n${message}`,
      ]
        .filter(Boolean)
        .join("\n")
    );

    window.open(`mailto:Shared@wcubedinc.com?subject=${subject}&body=${body}`, "_self");
    setSubmitted(true);
  };

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
        <div className="absolute inset-0 bg-gradient-to-br from-brand-light/20 to-brand-light/5" />
        <div className="container mx-auto px-4 lg:px-6 relative">
          <motion.div className="max-w-4xl mx-auto text-center space-y-4" {...fadeInUp}>
            <h1 className="text-3xl lg:text-5xl font-display font-extrabold uppercase tracking-wide text-brand">
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
              <h2 className="text-2xl lg:text-3xl font-display font-extrabold uppercase tracking-wide text-brand">Ways to Connect</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto lg:mx-0">
                Start the conversation using the project form or reach your local representative
                right away.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col gap-6 h-full"
              initial={{ opacity: 0, x: -20 }}
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
              initial={{ opacity: 0, x: 20 }}
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
                  {submitted ? (
                    <div className="flex flex-col items-center justify-center gap-4 py-12">
                      <CheckCircle className="h-12 w-12 text-green-600" />
                      <h3 className="text-lg font-semibold text-brand">Thank you!</h3>
                      <p className="text-sm text-muted-foreground text-center max-w-sm">
                        Your email client should have opened with the inquiry details.
                        If it didn&apos;t, email us directly at{" "}
                        <a href="mailto:Shared@wcubedinc.com" className="text-brand-accent hover:underline">
                          Shared@wcubedinc.com
                        </a>
                      </p>
                      <Button
                        variant="outline"
                        className="bg-transparent"
                        onClick={() => setSubmitted(false)}
                      >
                        Send Another Inquiry
                      </Button>
                    </div>
                  ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="flex h-full flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-brand">First Name *</label>
                        <Input name="firstName" placeholder="John" required />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-brand">Last Name *</label>
                        <Input name="lastName" placeholder="Doe" required />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-brand">Email *</label>
                        <Input name="email" type="email" placeholder="john@company.com" required />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-brand">Phone</label>
                        <Input name="phone" type="tel" placeholder="(801) 555-1234" />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-brand">Company</label>
                        <Input name="company" placeholder="Your Company Name" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-brand">Location *</label>
                        <Select name="location" required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Utah">Utah</SelectItem>
                            <SelectItem value="Nevada">Nevada</SelectItem>
                            <SelectItem value="Idaho">Idaho</SelectItem>
                            <SelectItem value="Wyoming">Wyoming</SelectItem>
                            <SelectItem value="Other">Other State</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-brand">Project Type</label>
                        <Select name="projectType">
                          <SelectTrigger>
                            <SelectValue placeholder="Select project type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="New Installation">New Installation</SelectItem>
                            <SelectItem value="Equipment Replacement">Equipment Replacement</SelectItem>
                            <SelectItem value="System Upgrade">System Upgrade</SelectItem>
                            <SelectItem value="Maintenance Contract">Maintenance Contract</SelectItem>
                            <SelectItem value="Urgent Repair">Urgent Repair</SelectItem>
                            <SelectItem value="Consultation/Design">Consultation/Design</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-brand">Equipment Category</label>
                        <Select name="equipment">
                          <SelectTrigger>
                            <SelectValue placeholder="What type of equipment?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pumps & Pumping Systems">Pumps & Pumping Systems</SelectItem>
                            <SelectItem value="Valves & Flow Control">Valves & Flow Control</SelectItem>
                            <SelectItem value="Water Treatment Systems">Water Treatment Systems</SelectItem>
                            <SelectItem value="Wastewater Treatment">Wastewater Treatment</SelectItem>
                            <SelectItem value="Air Systems & Blowers">Air Systems & Blowers</SelectItem>
                            <SelectItem value="Mixers & Agitation">Mixers & Agitation</SelectItem>
                            <SelectItem value="Multiple Equipment Types">Multiple Equipment Types</SelectItem>
                            <SelectItem value="Not Sure">Not Sure</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-brand">Timeline</label>
                      <Select name="timeline">
                        <SelectTrigger>
                          <SelectValue placeholder="When do you need this completed?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Immediate (This Week)">Immediate (This Week)</SelectItem>
                          <SelectItem value="Urgent (Within 2 Weeks)">Urgent (Within 2 Weeks)</SelectItem>
                          <SelectItem value="Within 1 Month">Within 1 Month</SelectItem>
                          <SelectItem value="Within 3 Months">Within 3 Months</SelectItem>
                          <SelectItem value="Planning Phase (6+ Months)">Planning Phase (6+ Months)</SelectItem>
                          <SelectItem value="Budget Planning Only">Budget Planning Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex-1">
                      <label className="text-sm font-medium text-brand">Project Message *</label>
                      <Textarea
                        name="message"
                        placeholder="- Describe your specific equipment needs&#10;- Project specifications or requirements&#10;- Current system issues (if any)&#10;- Any other important details..."
                        rows={5}
                        required
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      * Required fields. By submitting this form, you agree to be contacted by
                      W-Cubed regarding your project inquiry.
                    </div>
                    <Button type="submit" className="w-full">
                      Submit Project Inquiry
                    </Button>
                  </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 16 }}
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
            <h2 className="text-3xl lg:text-4xl font-display font-extrabold uppercase tracking-wide after:content-[''] after:block after:w-[60px] after:h-[3px] after:bg-brand-yellow after:mx-auto after:mt-3">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Whether you&apos;re planning a new installation or need immediate support, our team is
              ready to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/manufacturers">
                <Button size="lg">
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
