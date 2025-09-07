"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { TerritoryMap } from "@/components/territory-map"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export default function TerritoryPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-[#1FA9A4]/5" />
        <div className="container mx-auto px-4 lg:px-6 relative">
          <motion.div className="text-center space-y-6 max-w-4xl mx-auto" {...fadeInUp}>
            <Badge variant="outline" className="border-[#1FA9A4]/30 text-[#123D6A]">
              Service Area
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-[#123D6A]">Territory Coverage</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              W-Cubed provides comprehensive coverage across Utah, Idaho, and Wyoming with dedicated territory
              representatives.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Territory Map Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            className="flex justify-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <TerritoryMap />
          </motion.div>

          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-[#123D6A] mb-4">Our Coverage Area</h2>
            <p className="text-lg text-muted-foreground mb-6">
              W-Cubed provides comprehensive coverage across Utah, Idaho, and Wyoming with dedicated territory
              representatives who understand local needs and regulations.
            </p>
            <p className="text-lg text-muted-foreground">
              For detailed information about your specific location, please visit our contact page to find your local
              representative.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
