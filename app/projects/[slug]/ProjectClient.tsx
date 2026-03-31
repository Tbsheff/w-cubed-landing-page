"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar, ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { portableRichContentComponents } from "@/components/portable-rich-content";

export type ProjectClientProps = {
  project: {
    title: string;
    excerpt?: string;
    imageUrl?: string;
    date?: string;
    categories?: string[];
    body?: unknown[];
    related?: Array<{ id: string; title: string; imageUrl?: string }>;
    slug: string;
  };
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function ProjectClient({ project }: ProjectClientProps) {
  const date = project.date ? new Date(project.date) : undefined;
  const tags = project.categories || [];

  return (
    <>
      {/* Breadcrumb */}
      <section className="py-6 bg-brand-light/20">
        <div className="container mx-auto px-4 lg:px-6">
          <motion.div className="flex items-center space-x-2 text-sm" {...fadeInUp}>
            <Link href="/projects" className="flex items-center text-brand-accent hover:underline">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Projects
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Header */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div className="space-y-6" {...fadeInUp}>
              {tags.length > 0 && (
                <Badge
                  variant="outline"
                  className="border-brand-accent/30 text-brand-deep flex items-center gap-1"
                >
                  <MapPin className="h-3 w-3" />
                  {tags[0]}
                </Badge>
              )}

              <h1 className="text-4xl lg:text-5xl font-display font-extrabold uppercase tracking-wide text-brand-deep">
                {project.title}
              </h1>

              {project.excerpt && (
                <p className="text-xl text-muted-foreground">{project.excerpt}</p>
              )}

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

      {/* Image */}
      {project.imageUrl && (
        <section className="pb-12">
          <div className="container mx-auto px-4 lg:px-6">
            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src={project.imageUrl}
                alt={project.title}
                width={1200}
                height={600}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="pb-20">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-12">
              <motion.div
                className="lg:col-span-3 prose prose-lg max-w-none prose-p:text-[1.06rem] prose-p:leading-8 prose-p:text-foreground/95 prose-p:my-5 prose-h2:text-3xl prose-h2:leading-tight prose-h2:mt-12 prose-h2:mb-5 prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4 prose-strong:text-brand-deep prose-a:text-brand-accent prose-a:no-underline hover:prose-a:underline prose-li:my-1 prose-blockquote:border-l-brand-accent prose-blockquote:bg-brand-light/20 prose-blockquote:p-4 prose-blockquote:rounded-r-lg"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                {project.body ? (
                  <PortableText value={project.body} components={portableRichContentComponents} />
                ) : null}

                <Separator className="my-12" />
              </motion.div>

              {/* Sidebar */}
              <motion.div
                className="lg:col-span-1"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="sticky top-24 space-y-8">
                  {tags.length > 0 && (
                    <Card className="p-6">
                      <h3 className="font-semibold text-brand-deep mb-4">Project Details</h3>
                      <div className="flex flex-wrap gap-2">
                        {tags.map((t, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  )}

                  <Card className="p-6">
                    <Link href="/contact">
                      <Button className="w-full">Request Info</Button>
                    </Link>
                    <div className="flex justify-center mt-3">
                      <Link
                        href="/projects"
                        className="text-sm text-muted-foreground hover:text-brand-accent flex items-center"
                      >
                        Back to projects
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Link>
                    </div>
                  </Card>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
