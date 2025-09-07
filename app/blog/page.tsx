"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Calendar, User, ArrowRight, Filter } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { PageWrapper } from "@/components/page-wrapper"
import SiteFooter from "@/components/site-footer" // Import SiteFooter

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

const blogPosts = [
  {
    id: "optimizing-water-treatment-systems",
    title: "Optimizing Water Treatment Systems for Industrial Applications",
    excerpt:
      "Learn how to maximize efficiency in your water treatment processes with the latest equipment innovations and best practices from our 38 years of experience.",
    content: "Industrial water treatment systems are the backbone of many manufacturing processes...",
    image: "/placeholder.svg?height=400&width=600&text=Water+Treatment+System",
    date: "2024-12-15",
    author: "Jason Miller",
    category: "Technical",
    readTime: "8 min read",
    tags: ["Water Treatment", "Industrial", "Efficiency", "Best Practices"],
    featured: true,
  },
  {
    id: "salt-lake-city-municipal-upgrade",
    title: "Case Study: Municipal Water Plant Upgrade in Salt Lake City",
    excerpt:
      "How we helped upgrade a major municipal facility with state-of-the-art KSB pumping systems, improving efficiency by 35% while reducing maintenance costs.",
    content: "The Salt Lake City Water Department approached us with a challenge...",
    image: "/placeholder.svg?height=400&width=600&text=Municipal+Water+Plant",
    date: "2024-12-10",
    author: "Austin Gwinnup",
    category: "Case Study",
    readTime: "12 min read",
    tags: ["Municipal", "KSB", "Pumps", "Upgrade", "Case Study"],
    featured: true,
  },
  {
    id: "preventive-maintenance-best-practices",
    title: "Preventive Maintenance Best Practices for Water Equipment",
    excerpt:
      "Essential maintenance tips to extend the life of your water-process equipment and reduce downtime. A comprehensive guide based on decades of field experience.",
    content: "Preventive maintenance is crucial for water equipment longevity...",
    image: "/placeholder.svg?height=400&width=600&text=Equipment+Maintenance",
    date: "2024-12-05",
    author: "John Smith",
    category: "Maintenance",
    readTime: "6 min read",
    tags: ["Maintenance", "Equipment Care", "Preventive", "Operations"],
    featured: false,
  },
  {
    id: "energy-efficiency-water-systems",
    title: "Energy Efficiency in Modern Water Systems",
    excerpt:
      "Discover how modern water treatment technologies can reduce energy consumption by up to 40% while maintaining optimal performance standards.",
    content: "Energy costs represent a significant portion of water treatment operational expenses...",
    image: "/placeholder.svg?height=400&width=600&text=Energy+Efficient+Systems",
    date: "2024-11-28",
    author: "Sarah Johnson",
    category: "Technical",
    readTime: "10 min read",
    tags: ["Energy Efficiency", "Sustainability", "Cost Savings", "Technology"],
    featured: false,
  },
  {
    id: "winter-equipment-protection",
    title: "Protecting Water Equipment During Mountain West Winters",
    excerpt:
      "Essential winterization strategies for water equipment in Utah, Idaho, and Wyoming's harsh winter conditions.",
    content: "The Mountain West's extreme winter conditions pose unique challenges...",
    image: "/placeholder.svg?height=400&width=600&text=Winter+Protection",
    date: "2024-11-20",
    author: "Mike Davis",
    category: "Seasonal",
    readTime: "7 min read",
    tags: ["Winter", "Protection", "Mountain West", "Seasonal Maintenance"],
    featured: false,
  },
  {
    id: "regulatory-compliance-water-treatment",
    title: "Navigating Regulatory Compliance in Water Treatment",
    excerpt:
      "A comprehensive guide to EPA regulations and state-specific requirements for water treatment facilities in our service area.",
    content: "Regulatory compliance is a critical aspect of water treatment operations...",
    image: "/placeholder.svg?height=400&width=600&text=Regulatory+Compliance",
    date: "2024-11-15",
    author: "Brad Gwinnup",
    category: "Regulatory",
    readTime: "15 min read",
    tags: ["EPA", "Compliance", "Regulations", "Legal"],
    featured: false,
  },
]

const categories = ["All", "Technical", "Case Study", "Maintenance", "Seasonal", "Regulatory"]

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredPosts = filteredPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-[#1FA9A4]/5" />
        <div className="container mx-auto px-4 lg:px-6 relative">
          <motion.div className="text-center space-y-6 max-w-4xl mx-auto" {...fadeInUp}>
            <Badge variant="outline" className="border-[#1FA9A4]/30 text-[#123D6A]">
              Insights & Updates
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-[#123D6A]">W-Cubed Blog</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Industry insights, project updates, and technical information about water-process equipment from our team
              of experts.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Rest of the page content remains the same */}
      {/* ... */}

      {/* Search and Filter Section */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="space-y-6" {...fadeInUp}>
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-[#1FA9A4] hover:bg-[#1FA9A4]/90" : "bg-transparent"}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-6">
            <motion.div className="text-center space-y-4 mb-16" {...fadeInUp}>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#123D6A]">Featured Articles</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Our most popular and impactful content</p>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {featuredPosts.map((post, index) => (
                <motion.div key={post.id} variants={fadeInUp}>
                  <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                    <div className="relative">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        width={600}
                        height={400}
                        className="w-full h-64 object-cover"
                      />
                      <Badge className="absolute top-4 left-4 bg-[#1FA9A4]">Featured</Badge>
                    </div>
                    <CardHeader>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                        <Badge variant="secondary">{post.category}</Badge>
                      </div>
                      <CardTitle className="text-xl text-[#123D6A] hover:text-[#1FA9A4] transition-colors">
                        <Link href={`/blog/${post.id}`}>{post.title}</Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <CardDescription className="text-base">{post.excerpt}</CardDescription>
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-4">
                        <span className="text-sm text-muted-foreground">{post.readTime}</span>
                        <Link href={`/blog/${post.id}`}>
                          <Button variant="outline" size="sm" className="bg-transparent">
                            Read More
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Regular Posts */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="text-center space-y-4 mb-16" {...fadeInUp}>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#123D6A]">Latest Articles</h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {regularPosts.map((post, index) => (
              <motion.div key={post.id} variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="relative">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover"
                    />
                    <Badge variant="secondary" className="absolute top-4 left-4">
                      {post.category}
                    </Badge>
                  </div>
                  <CardHeader>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <span>{post.readTime}</span>
                    </div>
                    <CardTitle className="text-lg text-[#123D6A] hover:text-[#1FA9A4] transition-colors">
                      <Link href={`/blog/${post.id}`}>{post.title}</Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <CardDescription className="text-sm line-clamp-3">{post.excerpt}</CardDescription>
                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <Link href={`/blog/${post.id}`}>
                        <Button variant="ghost" size="sm">
                          Read More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filteredPosts.length === 0 && (
            <motion.div className="text-center py-12" {...fadeInUp}>
              <p className="text-muted-foreground text-lg">No articles found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("All")
                }}
                className="mt-4 bg-transparent"
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-[#123D6A]">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="text-center space-y-6 text-white" {...fadeInUp}>
            <h2 className="text-3xl lg:text-4xl font-bold">Stay Updated</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest water equipment insights and industry updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input placeholder="Enter your email" className="bg-white text-black" />
              <Button className="bg-[#1FA9A4] hover:bg-[#1FA9A4]/90">Subscribe</Button>
            </div>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
    </PageWrapper>
  )
}
