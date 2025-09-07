"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Droplets, Award, Users } from "lucide-react"
import Image from "next/image"

// Option 1: Clean Equipment Focus
export function HeroOption1() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-[#1FA9A4]/5" />
      <div className="container mx-auto px-4 lg:px-6 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="outline" className="border-[#1FA9A4]/30 text-[#123D6A]">
              Serving the Mountain West Since 1986
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-[#123D6A]">
              Water-process equipment experts,
              <span className="text-[#1FA9A4] block">serving UT · ID · WY</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg">
              Your trusted partner for water treatment, pumping systems, and process equipment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-[#1FA9A4] hover:bg-[#1FA9A4]/90">
                Contact Your Rep
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#123D6A] text-[#123D6A] hover:bg-[#123D6A] hover:text-white bg-transparent"
              >
                View Manufacturers
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Clean, simple equipment showcase */}
            <div className="relative bg-gradient-to-br from-white to-slate-50 rounded-2xl p-8 shadow-xl border">
              <Image
                src="/placeholder.svg?height=400&width=500&text=Clean+Industrial+Pump"
                alt="Industrial Water Equipment"
                width={500}
                height={400}
                className="rounded-lg"
              />

              {/* Simple floating badges */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-sm">
                <div className="flex items-center space-x-2">
                  <Droplets className="h-5 w-5 text-[#1FA9A4]" />
                  <span className="text-sm font-medium text-[#123D6A]">38+ Years</span>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-[#123D6A]">EPA Certified</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Option 2: Abstract Water Pattern
export function HeroOption2() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-[#1FA9A4]/5" />
      <div className="container mx-auto px-4 lg:px-6 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="outline" className="border-[#1FA9A4]/30 text-[#123D6A]">
              Serving the Mountain West Since 1986
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-[#123D6A]">
              Water-process equipment experts,
              <span className="text-[#1FA9A4] block">serving UT · ID · WY</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg">
              Your trusted partner for water treatment, pumping systems, and process equipment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-[#1FA9A4] hover:bg-[#1FA9A4]/90">
                Contact Your Rep
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#123D6A] text-[#123D6A] hover:bg-[#123D6A] hover:text-white bg-transparent"
              >
                View Manufacturers
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Abstract water flow pattern */}
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-[#1FA9A4]/10 to-[#123D6A]/10 rounded-2xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=400&width=600&text=Water+Flow+Pattern"
                  alt="Water Flow Pattern"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover opacity-80"
                />
              </div>

              {/* Floating stats */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-[#1FA9A4]">38+</div>
                    <div className="text-xs text-[#123D6A]">Years</div>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-[#1FA9A4]">15+</div>
                    <div className="text-xs text-[#123D6A]">Partners</div>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-[#1FA9A4]">3</div>
                    <div className="text-xs text-[#123D6A]">States</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Option 3: Minimalist with Icons
export function HeroOption3() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-[#1FA9A4]/5" />
      <div className="container mx-auto px-4 lg:px-6 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="outline" className="border-[#1FA9A4]/30 text-[#123D6A]">
              Serving the Mountain West Since 1986
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-[#123D6A]">
              Water-process equipment experts,
              <span className="text-[#1FA9A4] block">serving UT · ID · WY</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg">
              Your trusted partner for water treatment, pumping systems, and process equipment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-[#1FA9A4] hover:bg-[#1FA9A4]/90">
                Contact Your Rep
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-[#123D6A] text-[#123D6A] hover:bg-[#123D6A] hover:text-white bg-transparent"
              >
                View Manufacturers
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Minimalist icon-based design */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-8 rounded-2xl shadow-lg border">
                  <div className="bg-[#1FA9A4]/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Droplets className="h-8 w-8 text-[#1FA9A4]" />
                  </div>
                  <h3 className="font-semibold text-[#123D6A] mb-2">Water Treatment</h3>
                  <p className="text-sm text-muted-foreground">Complete treatment solutions</p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg border mt-8">
                  <div className="bg-[#123D6A]/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Award className="h-8 w-8 text-[#123D6A]" />
                  </div>
                  <h3 className="font-semibold text-[#123D6A] mb-2">Expert Service</h3>
                  <p className="text-sm text-muted-foreground">38+ years experience</p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg border -mt-4">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-[#123D6A] mb-2">EPA Certified</h3>
                  <p className="text-sm text-muted-foreground">Compliant solutions</p>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg border">
                  <div className="bg-[#1FA9A4]/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-[#1FA9A4]" />
                  </div>
                  <h3 className="font-semibold text-[#123D6A] mb-2">Local Team</h3>
                  <p className="text-sm text-muted-foreground">UT, ID, WY coverage</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
