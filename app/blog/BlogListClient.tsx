"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Calendar, User, ArrowRight, Filter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { PageWrapper } from "@/components/page-wrapper";

export type BlogListPost = {
  id: string;
  title: string;
  excerpt?: string;
  image?: string | null;
  date?: string;
  author?: string;
  category?: string;
  readTime?: string | undefined;
  tags?: string[];
  featured?: boolean;
};

type BlogListClientProps = {
  posts: Array<BlogListPost>;
  categories?: string[];
  authors?: string[];
};

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

export default function BlogListClient({
  posts,
  categories = [],
  authors = [],
}: BlogListClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedAuthor, setSelectedAuthor] = useState("All");

  const categoriesList = useMemo(() => {
    const cats = new Set(["All"]);
    posts.forEach((p) => {
      if (p.category) cats.add(p.category);
    });
    categories.filter(Boolean).forEach((c) => cats.add(c as string));
    return Array.from(cats);
  }, [posts, categories]);

  const authorsList = useMemo(() => {
    const auths = new Set(["All"]);
    posts.forEach((p) => {
      if (p.author) auths.add(p.author);
    });
    authors.forEach((a) => {
      if (a) auths.add(a);
    });
    return Array.from(auths);
  }, [posts, authors]);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      post.tags?.some((t: string) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesAuthor = selectedAuthor === "All" || post.author === selectedAuthor;
    return matchesSearch && matchesCategory && matchesAuthor;
  });

  const featuredPosts = filteredPosts.filter((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <PageWrapper>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-brand-accent/5" />
        <div className="container mx-auto px-4 lg:px-6 relative">
          <motion.div className="text-center space-y-6 max-w-4xl mx-auto" {...fadeInUp}>
            <Badge variant="outline" className="border-brand-accent/30 text-brand-deep">
              Insights & Updates
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-brand-deep">
              W-Cubed Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Industry insights, project updates, and technical information about water-process
              equipment from our team of experts.
            </p>
          </motion.div>
        </div>
      </section>

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
                onChange={(e: any) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2">
              {categoriesList.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-brand-accent hover:bg-brand-accent/90"
                      : "bg-transparent"
                  }
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {category}
                </Button>
              ))}
            </div>
            <div className="flex justify-center gap-2">
              <Select value={selectedAuthor} onValueChange={setSelectedAuthor}>
                <SelectTrigger className="w-64 bg-white">
                  <SelectValue placeholder="Filter by author" />
                </SelectTrigger>
                <SelectContent>
                  {authorsList.map((author) => (
                    <SelectItem key={author} value={author}>
                      {author}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts (none by default) */}
      {featuredPosts.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-6">
            <motion.div className="text-center space-y-4 mb-16" {...fadeInUp}>
              <h2 className="text-3xl lg:text-4xl font-bold text-brand-deep">Featured Articles</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Our most popular and impactful content
              </p>
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
                      {post.image && (
                        <Image
                          src={post.image}
                          alt={post.title}
                          width={600}
                          height={400}
                          className="w-full h-64 object-cover"
                        />
                      )}
                      <Badge className="absolute top-4 left-4 bg-brand-accent">Featured</Badge>
                    </div>
                    <CardHeader>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{post.date ? new Date(post.date).toLocaleDateString() : ""}</span>
                        </div>
                        {post.author && (
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>{post.author}</span>
                          </div>
                        )}
                        {post.category && <Badge variant="secondary">{post.category}</Badge>}
                      </div>
                      <CardTitle className="text-xl text-brand-deep hover:text-brand-accent transition-colors">
                        <Link href={`/blog/${post.id}`}>{post.title}</Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {post.excerpt && (
                        <CardDescription className="text-base">{post.excerpt}</CardDescription>
                      )}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 3).map((tag: any, idx: number) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center justify-between pt-4">
                        <span className="text-sm text-muted-foreground">{post.readTime ?? ""}</span>
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
            <h2 className="text-3xl lg:text-4xl font-bold text-brand-deep">Latest Articles</h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {regularPosts.map((post) => (
              <motion.div key={post.id} variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="relative">
                    {post.image && (
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    {post.category && (
                      <Badge variant="secondary" className="absolute top-4 left-4">
                        {post.category}
                      </Badge>
                    )}
                  </div>
                  <CardHeader>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date ? new Date(post.date).toLocaleDateString() : ""}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg text-brand-deep hover:text-brand-accent transition-colors">
                      <Link href={`/blog/${post.id}`}>{post.title}</Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {post.excerpt && (
                      <CardDescription className="text-sm line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                    )}
                    <div className="flex items-center justify-between pt-4">
                      {post.author && (
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <User className="h-4 w-4" />
                          <span>{post.author}</span>
                        </div>
                      )}
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
              <p className="text-muted-foreground text-lg">
                No articles found matching your criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setSelectedAuthor("All");
                }}
                className="mt-4 bg-transparent"
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </PageWrapper>
  );
}
