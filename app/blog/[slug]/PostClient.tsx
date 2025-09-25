"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Calendar, User, Mail, Phone, Share2, Facebook, Twitter, Linkedin, ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { PortableText } from "@portabletext/react"

export type PostClientProps = {
    post: {
        title: string
        excerpt?: string
        imageUrl?: string
        date?: string
        authorName?: string
        authorImageUrl?: string
        categories?: string[]
        tags?: string[]
        body?: any
        related?: Array<{ id: string; title: string; imageUrl?: string }>
        slug: string
    }
}

const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
}

export default function PostClient({ post }: PostClientProps) {
    const date = post.date ? new Date(post.date) : undefined
    const tags = post.tags || post.categories || []

    return (
        <>
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
                            {tags.length > 0 && (
                                <Badge variant="outline" className="border-[#1FA9A4]/30 text-[#123D6A]">
                                    {tags[0]}
                                </Badge>
                            )}

                            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-[#123D6A]">{post.title}</h1>

                            {post.excerpt && <p className="text-xl text-muted-foreground">{post.excerpt}</p>}

                            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                                {date && (
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="h-4 w-4" />
                                        <span>
                                            {date.toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </span>
                                    </div>
                                )}
                                {post.authorName && (
                                    <div className="flex items-center space-x-2">
                                        <User className="h-4 w-4" />
                                        <span>{post.authorName}</span>
                                    </div>
                                )}
                            </div>

                            {tags.length > 1 && (
                                <div className="flex flex-wrap gap-2">
                                    {tags.slice(0, 5).map((tag, index) => (
                                        <Badge key={index} variant="secondary" className="text-xs">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Featured Image */}
            {post.imageUrl && (
                <section className="pb-12">
                    <div className="container mx-auto px-4 lg:px-6">
                        <motion.div
                            className="max-w-4xl mx-auto"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Image
                                src={post.imageUrl}
                                alt={post.title}
                                width={1200}
                                height={600}
                                className="w-full h-96 object-cover rounded-lg shadow-lg"
                            />
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Article Content */}
            <section className="pb-20">
                <div className="container mx-auto px-4 lg:px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="grid lg:grid-cols-4 gap-12">
                            {/* Main Content */}
                            <motion.div
                                className="lg:col-span-3 prose prose-lg max-w-none prose-headings:text-[#123D6A] prose-a:text-[#1FA9A4] prose-blockquote:border-l-[#1FA9A4] prose-blockquote:bg-slate-50 prose-blockquote:p-4 prose-blockquote:rounded-r-lg"
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                {post.body ? (
                                    <PortableText value={post.body} />
                                ) : null}

                                <Separator className="my-12" />

                                {/* Author Bio */}
                                {(post.authorName || post.authorImageUrl) && (
                                    <Card className="p-6">
                                        <div className="flex items-start space-x-4">
                                            {post.authorImageUrl && (
                                                <Image
                                                    src={post.authorImageUrl}
                                                    alt={post.authorName || "Author"}
                                                    width={80}
                                                    height={80}
                                                    className="rounded-full"
                                                />
                                            )}
                                            <div className="flex-1">
                                                {post.authorName && (
                                                    <h3 className="text-lg font-semibold text-[#123D6A]">{post.authorName}</h3>
                                                )}
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
                                )}
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
            {post.related && post.related.length > 0 && (
                <section className="py-20 bg-slate-50">
                    <div className="container mx-auto px-4 lg:px-6">
                        <div className="max-w-4xl mx-auto">
                            <motion.div className="text-center space-y-4 mb-12" {...fadeInUp}>
                                <h2 className="text-3xl font-bold text-[#123D6A]">Related Articles</h2>
                                <p className="text-muted-foreground">Continue reading</p>
                            </motion.div>

                            <div className="grid md:grid-cols-2 gap-8">
                                {post.related.map((relatedPost, index) => (
                                    <motion.div
                                        key={relatedPost.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <Card className="hover:shadow-lg transition-shadow overflow-hidden">
                                            {relatedPost.imageUrl && (
                                                <Image
                                                    src={relatedPost.imageUrl}
                                                    alt={relatedPost.title}
                                                    width={300}
                                                    height={200}
                                                    className="w-full h-48 object-cover"
                                                />
                                            )}
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
            <section className="py-20 bg[#123D6A]">
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
        </>
    )
}
