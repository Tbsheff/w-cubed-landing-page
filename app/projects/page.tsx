"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-[#1FA9A4]/5" />
        <div className="container mx-auto px-4 lg:px-6 relative">
          <motion.div className="text-center space-y-6 max-w-4xl mx-auto" {...fadeInUp}>
            <Badge variant="outline" className="border-[#1FA9A4]/30 text-[#123D6A]">
              Our Work
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-[#123D6A]">Project References</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our completed water equipment projects across Utah, Idaho, and Wyoming.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#123D6A] mb-4">Coming Soon</h2>
            <p className="text-lg text-muted-foreground">
              Our projects showcase is currently under development. Check back soon to explore our completed water
              equipment installations.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
