"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const territories = {
  utah: { name: "Utah", rep: "John Smith", color: "#1FA9A4" },
  idaho: { name: "Idaho", rep: "Sarah Johnson", color: "#123D6A" },
  wyoming: { name: "Wyoming", rep: "Mike Davis", color: "#1FA9A4" },
}

export function TerritoryMap() {
  const [hoveredState, setHoveredState] = useState<string | null>(null)
  const [selectedState, setSelectedState] = useState<string>("")

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="relative">
        <svg width="300" height="200" viewBox="0 0 300 200" className="border rounded-lg bg-slate-50">
          {/* Utah */}
          <motion.path
            d="M50 50 L120 50 L120 150 L50 150 Z"
            fill={hoveredState === "utah" ? territories.utah.color : "#e2e8f0"}
            stroke="#64748b"
            strokeWidth="2"
            className="cursor-pointer"
            onMouseEnter={() => setHoveredState("utah")}
            onMouseLeave={() => setHoveredState(null)}
            whileHover={{ scale: 1.05 }}
          />
          <text x="85" y="100" textAnchor="middle" className="text-sm font-medium fill-slate-700">
            UT
          </text>

          {/* Idaho */}
          <motion.path
            d="M130 30 L200 30 L200 120 L130 120 Z"
            fill={hoveredState === "idaho" ? territories.idaho.color : "#e2e8f0"}
            stroke="#64748b"
            strokeWidth="2"
            className="cursor-pointer"
            onMouseEnter={() => setHoveredState("idaho")}
            onMouseLeave={() => setHoveredState(null)}
            whileHover={{ scale: 1.05 }}
          />
          <text x="165" y="75" textAnchor="middle" className="text-sm font-medium fill-slate-700">
            ID
          </text>

          {/* Wyoming */}
          <motion.path
            d="M210 60 L280 60 L280 160 L210 160 Z"
            fill={hoveredState === "wyoming" ? territories.wyoming.color : "#e2e8f0"}
            stroke="#64748b"
            strokeWidth="2"
            className="cursor-pointer"
            onMouseEnter={() => setHoveredState("wyoming")}
            onMouseLeave={() => setHoveredState(null)}
            whileHover={{ scale: 1.05 }}
          />
          <text x="245" y="110" textAnchor="middle" className="text-sm font-medium fill-slate-700">
            WY
          </text>
        </svg>

        {/* Tooltip */}
        {hoveredState && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-3 py-1 rounded text-sm whitespace-nowrap"
          >
            {territories[hoveredState as keyof typeof territories].name} - Rep:{" "}
            {territories[hoveredState as keyof typeof territories].rep}
          </motion.div>
        )}
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-[#1FA9A4] hover:bg-[#1FA9A4]/90">Find Your Rep</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Contact Your Territory Representative</DialogTitle>
            <DialogDescription>
              Select your state and we'll connect you with the right representative for your water-process equipment
              needs.
            </DialogDescription>
          </DialogHeader>
          <form className="space-y-4">
            <div>
              <label className="text-sm font-medium">State</label>
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utah">Utah</SelectItem>
                  <SelectItem value="idaho">Idaho</SelectItem>
                  <SelectItem value="wyoming">Wyoming</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">First Name</label>
                <Input placeholder="John" />
              </div>
              <div>
                <label className="text-sm font-medium">Last Name</label>
                <Input placeholder="Doe" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input type="email" placeholder="john@company.com" />
            </div>
            <div>
              <label className="text-sm font-medium">Brief Message</label>
              <Textarea placeholder="Tell us about your water-process equipment needs..." rows={3} />
            </div>
            <Button className="w-full bg-[#1FA9A4] hover:bg-[#1FA9A4]/90">Contact My Rep</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
