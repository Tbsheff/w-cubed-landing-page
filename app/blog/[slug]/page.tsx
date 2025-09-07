"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Calendar,
  User,
  Clock,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { PageWrapper } from "@/components/page-wrapper"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

// This would typically come from a CMS or API
const blogPostData = {
  "optimizing-water-treatment-systems": {
    title: "Optimizing Water Treatment Systems for Industrial Applications",
    excerpt:
      "Learn how to maximize efficiency in your water treatment processes with the latest equipment innovations and best practices from our 38 years of experience.",
    image: "/placeholder.svg?height=600&width=1200&text=Water+Treatment+System",
    date: "2024-12-15",
    author: "Jason Miller",
    authorTitle: "Senior Sales Representative",
    authorImage: "/placeholder.svg?height=100&width=100&text=Jason+Miller",
    category: "Technical",
    readTime: "8 min read",
    tags: ["Water Treatment", "Industrial", "Efficiency", "Best Practices"],
    content: `
      <p>Industrial water treatment systems are the backbone of many manufacturing processes, yet they're often overlooked when it comes to optimization. After 38 years in the water equipment industry, we've seen countless opportunities where simple adjustments and upgrades can dramatically improve system performance while reducing operational costs.</p>

      <h2>Understanding Your Current System</h2>
      <p>Before making any changes, it's crucial to conduct a comprehensive assessment of your existing water treatment infrastructure. This includes:</p>
      <ul>
        <li>Flow rate analysis and capacity utilization</li>
        <li>Energy consumption patterns and peak demand periods</li>
        <li>Water quality testing at multiple points in the system</li>
        <li>Equipment age, condition, and maintenance history</li>
        <li>Regulatory compliance status and upcoming requirements</li>
      </ul>

      <h2>Key Optimization Strategies</h2>
      
      <h3>1. Variable Frequency Drives (VFDs)</h3>
      <p>One of the most impactful upgrades you can make is installing VFDs on your pump systems. These devices allow pumps to operate at variable speeds based on actual demand, rather than running at full capacity continuously. In our experience, VFDs can reduce energy consumption by 20-50% while extending equipment life.</p>

      <h3>2. Advanced Process Control</h3>
      <p>Modern control systems can automatically adjust treatment parameters based on real-time water quality data. This ensures optimal treatment while minimizing chemical usage and energy consumption. We've seen facilities reduce chemical costs by up to 30% with proper automation.</p>

      <h3>3. Equipment Right-Sizing</h3>
      <p>Many industrial facilities operate with oversized equipment that was installed during initial construction or expansion phases. Right-sizing your equipment to match actual demand can significantly improve efficiency and reduce maintenance costs.</p>

      <h2>Case Study: Manufacturing Facility Optimization</h2>
      <p>Recently, we worked with a manufacturing facility in Utah that was experiencing high energy costs and frequent equipment failures. Through a comprehensive system analysis, we identified several optimization opportunities:</p>
      
      <blockquote>
        <p>"The optimization project resulted in a 35% reduction in energy costs and 60% fewer equipment failures. The payback period was just 18 months." - Plant Manager</p>
      </blockquote>

      <p>The key improvements included:</p>
      <ul>
        <li>Installation of VFDs on three main circulation pumps</li>
        <li>Upgrade to a modern PLC-based control system</li>
        <li>Replacement of oversized treatment equipment with properly sized units</li>
        <li>Implementation of predictive maintenance protocols</li>
      </ul>

      <h2>ROI Considerations</h2>
      <p>When evaluating optimization projects, consider both immediate and long-term benefits:</p>
      
      <h3>Immediate Benefits:</h3>
      <ul>
        <li>Reduced energy consumption</li>
        <li>Lower chemical usage</li>
        <li>Decreased maintenance requirements</li>
        <li>Improved water quality consistency</li>
      </ul>

      <h3>Long-term Benefits:</h3>
      <ul>
        <li>Extended equipment life</li>
        <li>Reduced risk of regulatory violations</li>
        <li>Improved process reliability</li>
        <li>Enhanced environmental sustainability</li>
      </ul>

      <h2>Getting Started</h2>
      <p>The first step in any optimization project is a thorough system assessment. Our team can provide comprehensive evaluations that identify the most cost-effective improvement opportunities for your specific application.</p>

      <p>Contact us today to schedule a consultation and learn how we can help optimize your water treatment systems for maximum efficiency and reliability.</p>
    `,
    relatedPosts: [
      {
        id: "salt-lake-city-municipal-upgrade",
        title: "Case Study: Municipal Water Plant Upgrade in Salt Lake City",
        image: "/placeholder.svg?height=200&width=300&text=Municipal+Water+Plant",
      },
      {
        id: "energy-efficiency-water-systems",
        title: "Energy Efficiency in Modern Water Systems",
        image: "/placeholder.svg?height=200&width=300&text=Energy+Efficient+Systems",
      },
    ],
  },
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string

  // In a real app, you'd fetch this data based on the slug
  const post = blogPostData[slug as keyof typeof blogPostData] || blogPostData["optimizing-water-treatment-systems"]

  return (
    <PageWrapper>
      {/* Breadcrumb */}
      <section className="py-6 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="flex items-center space-x-2 text-sm" {...fadeInUp}>
            <Link href="/blog" className="flex items-center text-[#1FA9A4] hover:underline">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Blog
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Article Header */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div className="space-y-6" {...fadeInUp}>
              <Badge variant="outline" className="border-[#1FA9A4]/30 text-[#123D6A]">
                {post.category}
              </Badge>

              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-[#123D6A]">{post.title}</h1>

              <p className="text-xl text-muted-foreground">{post.excerpt}</p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-12">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              width={1200}
              height={600}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-12">
              {/* Main Content */}
              <motion.div
                className="lg:col-span-3"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div
                  className="prose prose-lg max-w-none prose-headings:text-[#123D6A] prose-a:text-[#1FA9A4] prose-blockquote:border-l-[#1FA9A4] prose-blockquote:bg-slate-50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <Separator className="my-12" />

                {/* Author Bio */}
                <Card className="p-6">
                  <div className="flex items-start space-x-4">
                    <Image
                      src={post.authorImage || "/placeholder.svg"}
                      alt={post.author}
                      width={80}
                      height={80}
                      className="rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[#123D6A]">{post.author}</h3>
                      <p className="text-[#1FA9A4] font-medium">{post.authorTitle}</p>
                      <p className="text-muted-foreground mt-2">
                        {post.author} is a technical sales specialist with 15+ years of experience in industrial water
                        systems. He helps customers across Utah optimize their water treatment processes for maximum
                        efficiency and reliability.
                      </p>
                      <div className="flex space-x-2 mt-4">
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <Mail className="h-4 w-4 mr-2" />
                          Email
                        </Button>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <Phone className="h-4 w-4 mr-2" />
                          Call
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Sidebar */}
              <motion.div
                className="lg:col-span-1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="sticky top-24 space-y-8">
                  {/* Share */}
                  <Card className="p-6">
                    <h3 className="font-semibold text-[#123D6A] mb-4 flex items-center">
                      <Share2 className="h-5 w-5 mr-2" />
                      Share Article
                    </h3>
                    <div className="flex flex-col space-y-2">
                      <Button variant="outline" size="sm" className="justify-start bg-transparent">
                        <Facebook className="h-4 w-4 mr-2" />
                        Facebook
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start bg-transparent">
                        <Twitter className="h-4 w-4 mr-2" />
                        Twitter
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start bg-transparent">
                        <Linkedin className="h-4 w-4 mr-2" />
                        LinkedIn
                      </Button>
                      <Button variant="outline" size="sm" className="justify-start bg-transparent">
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </Button>
                    </div>
                  </Card>

                  {/* Contact CTA */}
                  <Card className="p-6 bg-[#1FA9A4]/5 border-[#1FA9A4]/20">
                    <h3 className="font-semibold text-[#123D6A] mb-2">Need Expert Advice?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Our team can help you optimize your water treatment systems for maximum efficiency.
                    </p>
                    <Button className="w-full bg-[#1FA9A4] hover:bg-[#1FA9A4]/90">Contact Our Experts</Button>
                  </Card>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div className="text-center space-y-4 mb-12" {...fadeInUp}>
                <h2 className="text-3xl font-bold text-[#123D6A]">Related Articles</h2>
                <p className="text-muted-foreground">Continue reading about water treatment optimization</p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-8">
                {post.relatedPosts.map((relatedPost, index) => (
                  <motion.div
                    key={relatedPost.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="hover:shadow-lg transition-shadow overflow-hidden">
                      <Image
                        src={relatedPost.image || "/placeholder.svg"}
                        alt={relatedPost.title}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover"
                      />
                      <CardHeader>
                        <CardTitle className="text-lg text-[#123D6A] hover:text-[#1FA9A4] transition-colors">
                          <Link href={`/blog/${relatedPost.id}`}>{relatedPost.title}</Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Link href={`/blog/${relatedPost.id}`}>
                          <Button variant="ghost" size="sm" className="p-0">
                            Read More
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-[#123D6A]">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="text-center space-y-6 text-white" {...fadeInUp}>
            <h2 className="text-3xl lg:text-4xl font-bold">Ready to Optimize Your Systems?</h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Contact our team to discuss how we can help improve your water treatment efficiency and reduce costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-[#1FA9A4] hover:bg-[#1FA9A4]/90">
                <Phone className="mr-2 h-4 w-4" />
                Contact Your Rep
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#123D6A] bg-transparent"
              >
                <Mail className="mr-2 h-4 w-4" />
                Request Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}
