"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Users, Award } from "lucide-react";
import Image from "next/image";
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

const representatives = [
  {
    name: "Brad Gwinnup",
    title: "President",
    territories: ["Utah", "Nevada"],
    phone: "801-232-8241",
    email: "BradG@WCubedInc.com",
    role: "Sales Representative",
    image: "/placeholder.svg?height=300&width=300&text=Brad+Gwinnup",
  },
  {
    name: "Austin Gwinnup",
    title: "Sales Representative",
    territories: ["Idaho", "Wyoming"],
    phone: "801-803-8558",
    email: "AustinG@WCubedInc.com",
    role: "Sales Representative",
    image: "/placeholder.svg?height=300&width=300&text=Austin+Gwinnup",
  },
  {
    name: "Cason Gwinnup",
    title: "Application Engineer/Project Manager",
    territories: ["All Territories"],
    phone: "801-664-2438",
    email: "CasonG@WCubedInc.com",
    role: "Aftermarket Sales",
    image: "/placeholder.svg?height=300&width=300&text=Cason+Gwinnup",
  },
  {
    name: "Robert Haws",
    title: "Application Engineer/Project Manager",
    territories: ["All Territories"],
    phone: "385-270-6128",
    email: "RobertH@WCubedInc.com",
    role: "Parts",
    image: "/placeholder.svg?height=300&width=300&text=Robert+Haws",
  },
];

const states = [
  {
    name: "Utah",
    rep: "Brad Gwinnup",
    counties: [
      "Beaver",
      "Box Elder",
      "Cache",
      "Carbon",
      "Daggett",
      "Davis",
      "Duchesne",
      "Emery",
      "Garfield",
      "Grand",
      "Iron",
      "Juab",
      "Kane",
      "Millard",
      "Morgan",
      "Piute",
      "Rich",
      "Salt Lake",
      "San Juan",
      "Sanpete",
      "Sevier",
      "Summit",
      "Tooele",
      "Uintah",
      "Utah",
      "Wasatch",
      "Washington",
      "Wayne",
      "Weber",
    ],
    color: "#1C4E80",
  },
  {
    name: "Nevada",
    rep: "Brad Gwinnup",
    counties: [
      "Carson City",
      "Churchill",
      "Clark",
      "Douglas",
      "Elko",
      "Esmeralda",
      "Eureka",
      "Humboldt",
      "Lander",
      "Lincoln",
      "Lyon",
      "Mineral",
      "Nye",
      "Pershing",
      "Storey",
      "Washoe",
      "White Pine",
    ],
    color: "#4986C8",
  },
  {
    name: "Idaho",
    rep: "Austin Gwinnup",
    counties: [
      "Ada",
      "Adams",
      "Bannock",
      "Bear Lake",
      "Benewah",
      "Bingham",
      "Blaine",
      "Boise",
      "Bonner",
      "Bonneville",
      "Boundary",
      "Butte",
      "Camas",
      "Canyon",
      "Caribou",
      "Cassia",
      "Clark",
      "Clearwater",
      "Custer",
      "Elmore",
      "Franklin",
      "Fremont",
      "Gem",
      "Gooding",
      "Idaho",
      "Jefferson",
      "Jerome",
      "Kootenai",
      "Latah",
      "Lemhi",
      "Lewis",
      "Lincoln",
      "Madison",
      "Minidoka",
      "Nez Perce",
      "Oneida",
      "Owyhee",
      "Payette",
      "Power",
      "Shoshone",
      "Teton",
      "Twin Falls",
      "Valley",
      "Washington",
    ],
    color: "#95C6EC",
  },
  {
    name: "Wyoming",
    rep: "Austin Gwinnup",
    counties: [
      "Albany",
      "Big Horn",
      "Campbell",
      "Carbon",
      "Converse",
      "Crook",
      "Fremont",
      "Goshen",
      "Hot Springs",
      "Johnson",
      "Laramie",
      "Lincoln",
      "Natrona",
      "Niobrara",
      "Park",
      "Platte",
      "Sheridan",
      "Sublette",
      "Sweetwater",
      "Teton",
      "Uinta",
      "Washakie",
      "Weston",
    ],
    color: "#1C4E80",
  },
];

export default function TerritoryPage() {
  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-[#95C6EC]/5" />
        <div className="container mx-auto px-4 lg:px-6 relative">
          <motion.div className="text-center space-y-6 max-w-4xl mx-auto" {...fadeInUp}>
            <Badge variant="outline" className="border-[#1C4E80]/30 text-[#1C4E80]">
              Service Territory
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-[#1C4E80]">
              Four-State Coverage Area
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our experienced representatives provide personalized service across Utah, Nevada,
              Idaho, and Wyoming. Find your local representative and discover the counties we serve.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Representatives Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="text-center space-y-4 mb-16" {...fadeInUp}>
            <Badge variant="outline" className="border-[#1C4E80]/30 text-[#1C4E80]">
              Our Team
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1C4E80]">
              Meet Your Representatives
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Dedicated professionals ready to help with your water-process equipment needs
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {representatives.map((rep, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    <div className="relative w-32 h-32 mx-auto mb-4">
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
                    <Badge variant="secondary" className="mt-2">
                      {rep.role}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-center space-x-2">
                        <MapPin className="h-4 w-4 text-[#4986C8]" />
                        <span className="text-sm font-medium text-[#1C4E80]">Territories:</span>
                      </div>
                      <div className="flex flex-wrap justify-center gap-1">
                        {rep.territories.map((territory, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {territory}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-center space-x-2">
                        <Phone className="h-4 w-4 text-[#4986C8]" />
                        <span className="text-sm">{rep.phone}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2">
                        <Mail className="h-4 w-4 text-[#4986C8]" />
                        <span className="text-sm">{rep.email}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 pt-2">
                      <Button variant="outline" size="sm" className="bg-transparent">
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* States and Counties Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="text-center space-y-4 mb-16" {...fadeInUp}>
            <Badge variant="outline" className="border-[#1C4E80]/30 text-[#1C4E80]">
              Coverage Areas
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1C4E80]">
              States and Counties We Serve
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive coverage across four states with dedicated representatives for each
              region
            </p>
          </motion.div>

          <motion.div
            className="grid lg:grid-cols-2 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {states.map((state, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl text-[#1C4E80]">{state.name}</CardTitle>
                        <CardDescription className="text-lg">
                          Represented by {state.rep}
                        </CardDescription>
                      </div>
                      <div
                        className="w-8 h-8 rounded-full border-4 border-white shadow-lg"
                        style={{ backgroundColor: state.color }}
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-[#4986C8]" />
                        <span className="font-semibold text-[#1C4E80]">
                          {state.counties.length} Counties Served
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                        {state.counties.map((county, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs justify-start">
                            {county}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Territory Map Visualization */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="text-center space-y-4 mb-16" {...fadeInUp}>
            <Badge variant="outline" className="border-[#1C4E80]/30 text-[#1C4E80]">
              Territory Map
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1C4E80]">
              Visual Territory Overview
            </h2>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br from-slate-50 to-[#95C6EC]/10 rounded-2xl p-8"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {states.map((state, index) => (
                <div key={index} className="text-center">
                  <div
                    className="w-16 h-16 rounded-lg mx-auto mb-4 flex items-center justify-center text-white font-bold text-lg shadow-lg"
                    style={{ backgroundColor: state.color }}
                  >
                    {state.name.substring(0, 2).toUpperCase()}
                  </div>
                  <h3 className="font-semibold text-[#1C4E80] mb-1">{state.name}</h3>
                  <p className="text-sm text-muted-foreground">{state.rep}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#1C4E80]">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="text-center space-y-6 text-white" {...fadeInUp}>
            <h2 className="text-3xl lg:text-4xl font-bold">Ready to Connect with Your Rep?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Contact your local representative to discuss your water-process equipment needs and
              get expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#4986C8] hover:bg-[#4986C8]/90">
                Find Your Representative
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#1C4E80] bg-transparent"
              >
                View All Products
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
