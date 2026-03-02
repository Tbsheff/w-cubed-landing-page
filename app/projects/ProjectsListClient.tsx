"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Calendar, ArrowRight, Filter, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { PageWrapper } from "@/components/page-wrapper";

export type ProjectsListItem = {
  id: string;
  title: string;
  excerpt?: string;
  image?: string | null;
  date?: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
};

type ProjectsListClientProps = {
  projects: Array<ProjectsListItem>;
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

export default function ProjectsListClient({ projects }: ProjectsListClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = new Set(["All"]);
    projects.forEach((p) => {
      if (p.category) cats.add(p.category);
    });
    return Array.from(cats);
  }, [projects]);

  const filtered = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      p.tags?.some((t: string) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featured = filtered.filter((p) => p.featured);
  const regular = filtered.filter((p) => !p.featured);

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-light/20 to-brand-accent/5" />
        <div className="container mx-auto px-4 lg:px-6 relative">
          <motion.div className="text-center space-y-6 max-w-4xl mx-auto" {...fadeInUp}>
            <Badge variant="outline" className="border-brand-accent/30 text-brand-deep">
              Our Work
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-display font-extrabold uppercase tracking-wide text-brand-deep">
              Project References
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our completed water equipment projects across Utah, Idaho, and Wyoming.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-brand-light/20">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="space-y-6" {...fadeInUp}>
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e: any) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-brand-accent hover:bg-brand-accent/90 shadow-none hover:shadow-none hover:translate-y-0 normal-case tracking-normal"
                      : "bg-transparent shadow-none hover:shadow-none hover:translate-y-0 normal-case tracking-normal"
                  }
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {category}
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      {featured.length > 0 && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-6">
            <motion.div className="text-center space-y-4 mb-16" {...fadeInUp}>
              <h2 className="text-3xl lg:text-4xl font-display font-extrabold uppercase tracking-wide text-brand-deep">Featured Projects</h2>
            </motion.div>

            <motion.div
              className="grid md:grid-cols-2 gap-8"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {featured.map((project) => (
                <motion.div key={project.id} variants={fadeInUp}>
                  <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                    <div className="relative">
                      {project.image && (
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={600}
                          height={400}
                          className="w-full h-64 object-cover"
                        />
                      )}
                      <Badge className="absolute top-4 left-4 bg-brand-accent">Featured</Badge>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl text-brand-deep hover:text-brand-accent transition-colors">
                        <Link href={`/projects/${project.id}`}>{project.title}</Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {project.excerpt && (
                        <CardDescription className="text-base">{project.excerpt}</CardDescription>
                      )}
                      <div className="flex items-center justify-between pt-2">
                        <Link href={`/projects/${project.id}`}>
                          <Button variant="outline" size="sm" className="bg-transparent">
                            View Project
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

      {/* Regular Projects */}
      <section className="py-20 bg-brand-light/20">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="text-center space-y-4 mb-16" {...fadeInUp}>
            <h2 className="text-3xl lg:text-4xl font-display font-extrabold uppercase tracking-wide text-brand-deep">Recent Projects</h2>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {regular.map((project) => (
              <motion.div key={project.id} variants={fadeInUp}>
                <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="relative">
                    {project.image && (
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={400}
                        height={250}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    {project.category && (
                      <Badge
                        variant="secondary"
                        className="absolute top-4 left-4 flex items-center gap-1"
                      >
                        <MapPin className="h-3 w-3" />
                        {project.category}
                      </Badge>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg text-brand-deep hover:text-brand-accent transition-colors">
                      <Link href={`/projects/${project.id}`}>{project.title}</Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {project.excerpt && (
                      <CardDescription className="text-sm line-clamp-3">
                        {project.excerpt}
                      </CardDescription>
                    )}
                    <div className="flex items-center justify-between pt-4">
                      <Link href={`/projects/${project.id}`}>
                        <Button variant="ghost" size="sm">
                          View Project
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filtered.length === 0 && (
            <motion.div className="text-center py-12" {...fadeInUp}>
              <p className="text-muted-foreground text-lg">
                No projects found matching your criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="mt-4 bg-transparent"
              >
                Clear Filters
              </Button>
              <div className="mt-4">
                <Link href="/contact">
                  <Button size="sm">
                    Discuss Your Project
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </PageWrapper>
  );
}
