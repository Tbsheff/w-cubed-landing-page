import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplets, Phone, Mail, Wrench, Cog, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PageWrapper } from "@/components/page-wrapper";
import type { RepresentativeCard } from "@/lib/representatives";
import { HeroSection } from "@/components/hero-section";
import { PartnersStrip } from "@/components/partners-strip";

type HeroSlide = {
  image: string;
  alt: string;
  tags: string[];
  slideLabel?: string | null;
  slideTitle?: string | null;
};

type HeroContent = {
  badge?: string | null;
  title?: string | null;
  description?: string | null;
  heroImage?: string | null;
  heroSlides?: HeroSlide[] | null;
  primaryCta?: { label?: string | null; href?: string | null } | null;
  secondaryCta?: { label?: string | null; href?: string | null } | null;
};

type StatItem = { value: string; label: string; detail?: string | null };

type ManufacturerStripItem = { id: string; name: string; logo: string };

type HighlightItem = {
  title: string;
  description?: string | null;
  image?: string | null;
  category?: string | null;
  states?: string[] | null;
};

type HomePageProps = {
  hero?: HeroContent | null;
  stats?: StatItem[] | null;
  manufacturers?: ManufacturerStripItem[] | null;
  highlights?: HighlightItem[] | null;
  representatives?: RepresentativeCard[] | null;
};

const defaultManufacturers: ManufacturerStripItem[] = [
  { id: "ksb", name: "KSB", logo: "/manufacturers/ksb-logo.svg" },
  { id: "kaeser", name: "Kaeser Blowers", logo: "/manufacturers/Kaeser-compressor-logo.png" },
  { id: "pratt", name: "Pratt Valves", logo: "/manufacturers/pratt-a-mueller-brand-logo-vector.png" },
  { id: "hydro-gate", name: "Hydro Gate", logo: "/manufacturers/Hydro-gate-logo.png" },
  { id: "fournier", name: "Fournier", logo: "/manufacturers/Fournier-logo.svg" },
  { id: "edi", name: "EDI", logo: "/manufacturers/EDI-Logo.png" },
  { id: "veolia-suez", name: "Veolia/Suez", logo: "/manufacturers/suez-logo.webp" },
  { id: "trillium-flow", name: "Trillium Flow", logo: "/manufacturers/Trillium-logo.png" },
  { id: "kusters-zima", name: "Kusters Zima", logo: "/manufacturers/kusters-water-logo.png" },
  { id: "pentair-fairbanks", name: "Pentair Fairbanks", logo: "/manufacturers/pentair-logo.png" },
];

const defaultHighlights: HighlightItem[] = [
  {
    title: "Municipal Water Treatment Facilities and Collections",
    description:
      "Successfully designed and installed pumping systems for municipal water and wastewater treatment plants and collection systems across our four-state territory.",
    image: "/placeholder.svg?height=200&width=300&text=Municipal+Project",
    category: "Municipal",
    states: ["UT", "NV", "ID", "WY"],
  },
  {
    title: "Industrial Pretreatment Solutions",
    description:
      "Custom water-process equipment solutions for manufacturing facilities and processing plants throughout the Mountain West.",
    image: "/placeholder.svg?height=200&width=300&text=Industrial+Project",
    category: "Industrial",
    states: ["UT", "NV", "ID", "WY"],
  },
  {
    title: "Commercial Pretreatment Solutions",
    description:
      "Reliable pumping and treatment systems for commercial pretreatment facilities, resorts, and infrastructure projects.",
    image: "/placeholder.svg?height=200&width=300&text=Commercial+Project",
    category: "Commercial",
    states: ["UT", "NV", "ID", "WY"],
  },
];

const defaultStats: StatItem[] = [
  { value: "38+", label: "Years in Business", detail: "Serving the Mountain West since 1986" },
  { value: "10+", label: "Trusted Manufacturers", detail: "Premium equipment partnerships" },
  { value: "4-State", label: "Coverage Area", detail: "Utah, Nevada, Idaho, and Wyoming" },
];

const defaultHero: HeroContent = {
  badge: "Serving the Mountain West Since 1986",
  title: "Municipal Equipment\nYou Can Count On.",
  description:
    "Your trusted partner for water treatment, pumping systems, and process equipment. Delivering reliable solutions across the Mountain West for nearly four decades.",
  heroImage: "/hero-image.webp",
  heroSlides: [
    {
      image: "/hero-image.webp",
      alt: "Industrial Water Equipment",
      tags: ["Municipal", "Industrial", "Pretreatment"],
    },
  ],
  primaryCta: { label: "Find Equipment", href: "/contact" },
  secondaryCta: { label: "View Manufacturers", href: "/manufacturers" },
};

export default function WCubedLanding({ hero, stats, manufacturers, highlights, representatives }: HomePageProps) {
  const heroData = { ...defaultHero, ...(hero || {}) };

  const heroSlidesData: HeroSlide[] =
    heroData.heroSlides
      ?.filter((slide) => Boolean(slide?.image))
      .map((slide, idx) => ({
        image: slide.image || "/hero-image.webp",
        alt: slide.alt || `Hero slide ${idx + 1}`,
        tags: (slide.tags || []).filter(Boolean),
        slideLabel: slide.slideLabel,
        slideTitle: slide.slideTitle,
      })) || [];

  if (!heroSlidesData.length) {
    heroSlidesData.push({
      image: heroData.heroImage ?? "/hero-image.webp",
      alt: "Industrial Water Equipment",
      tags: ["Municipal", "Industrial", "Pretreatment"],
    });
  }

  const statsData = stats && stats.length ? stats : defaultStats;
  const manufacturersData =
    manufacturers && manufacturers.length ? manufacturers : defaultManufacturers;
  const projectHighlights = highlights && highlights.length ? highlights : defaultHighlights;

  return (
    <PageWrapper>
      {/* Hero Section */}
      <HeroSection
        hero={{
          badge: heroData.badge,
          title: heroData.title,
          description: heroData.description,
          heroSlides: heroSlidesData,
          primaryCta: heroData.primaryCta,
          secondaryCta: heroData.secondaryCta,
        }}
      />

      {/* Credibility Bar */}
      <section className="pt-8 pb-12 bg-brand">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            {statsData.map((stat) => (
              <div key={stat.label} className="space-y-2">
                <div className="text-4xl font-bold text-brand-yellow">{stat.value}</div>
                <div className="text-lg">{stat.label}</div>
                {stat.detail && <div className="text-sm opacity-80">{stat.detail}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Strip */}
      <PartnersStrip manufacturers={manufacturersData} />

      {/* Company Story Section */}
      <section
        className="py-20 bg-background"
        style={{ contentVisibility: "auto", containIntrinsicSize: "1px 820px" }}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="outline" className="border-brand-accent/30 text-brand">
                Our Story
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-display font-extrabold uppercase tracking-wide text-brand after:content-[''] after:block after:w-[60px] after:h-[3px] after:bg-brand-yellow after:mt-3">
                From Garage to Industry Leader
              </h2>
              <p className="text-lg text-muted-foreground">
                W-Cubed began in 1986 when our founder started building custom control panels in his
                garage for local water treatment facilities. What started as a small operation
                focused on quality and customer service has grown into the Mountain West&apos;s
                premier water equipment representative.
              </p>
              <p className="text-lg text-muted-foreground">
                Today, we represent more than 10 leading manufacturers and serve customers across
                Utah, Nevada, Idaho, and Wyoming. Our success is built on the same principles that
                guided us from day one: technical expertise, reliable service, and genuine
                partnerships with our customers.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-accent">38+</div>
                  <div className="text-sm text-muted-foreground">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-brand-accent">4</div>
                  <div className="text-sm text-muted-foreground">States Served</div>
                </div>
              </div>
            </div>
            <div>
              <Image
                src="/placeholder.svg?height=500&width=600&text=Company+History"
                alt="W-Cubed Company History"
                width={600}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="py-20 bg-brand-light/20"
        style={{ contentVisibility: "auto", containIntrinsicSize: "1px 1020px" }}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="border-brand-accent/30 text-brand">
              Our Expertise
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-display font-extrabold uppercase tracking-wide text-brand after:content-[''] after:block after:w-[60px] after:h-[3px] after:bg-brand-yellow after:mx-auto after:mt-3">
              Water-Process Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive water treatment and process equipment solutions for municipal,
              industrial, and pretreatment applications
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Droplets,
                title: "Water Treatment",
                description: "Complete treatment systems for potable and process water",
              },
              {
                icon: Package,
                title: "Pumping Systems",
                description:
                  "High-efficiency pumps and local control panels for pumping applications",
              },
              {
                icon: Wrench,
                title: "Technical Support",
                description: "Expert installation, maintenance, and repair services",
              },
              {
                icon: Cog,
                title: "Process Equipment",
                description: "Specialized equipment for industrial water processes",
              },
            ].map((service, index) => (
              <div key={index}>
                <Card className="h-full hover:shadow-lg transition-shadow border-l-4 border-l-brand-accent">
                  <CardHeader>
                    <div className="bg-brand-accent/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-brand-accent" />
                    </div>
                    <CardTitle className="text-xl text-brand">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Territory Representatives */}
      <section
        id="territory"
        className="py-20 bg-background"
        style={{ contentVisibility: "auto", containIntrinsicSize: "1px 1180px" }}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="border-brand-accent/30 text-brand">
              Get In Touch
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-display font-extrabold uppercase tracking-wide text-brand after:content-[''] after:block after:w-[60px] after:h-[3px] after:bg-brand-yellow after:mx-auto after:mt-3">
              Meet Your Territory Team
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Reach out directly to the representative serving your area for quotes, project
              support, and technical guidance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(representatives || []).map((rep) => (
              <div
                key={rep.email}
                className="row-span-6 grid-rows-subgrid gap-y-3 rounded-lg border bg-card text-card-foreground shadow-sm text-center hover:shadow-lg transition-shadow p-6"
                style={{ display: "grid" }}
              >
                <div className="text-xl font-semibold leading-none tracking-tight text-brand">
                  {rep.image && (
                    <div className="relative w-16 h-16 mx-auto mb-2">
                      <Image
                        src={rep.image}
                        alt={rep.name}
                        fill
                        sizes="64px"
                        className="rounded-full object-cover"
                      />
                    </div>
                  )}
                  {rep.name}
                </div>
                <div className="text-sm text-brand-accent font-medium">
                  {rep.title}
                </div>
                <div>
                  <Badge variant="secondary">{rep.role}</Badge>
                </div>
                <div className="flex flex-wrap justify-center gap-1">
                  {rep.territories.map((territory) => (
                    <Badge key={territory} variant="outline" className="text-xs">
                      {territory}
                    </Badge>
                  ))}
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center gap-2 text-brand">
                    <Phone className="h-4 w-4 text-brand-accent" />
                    <span>{rep.phone}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-brand">
                    <Mail className="h-4 w-4 text-brand-accent" />
                    <span>{rep.email}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Link href={`tel:+1${rep.phone.replace(/\D/g, "")}`} className="w-full">
                    <Button variant="outline" size="sm" className="w-full shadow-none hover:shadow-none hover:translate-y-0 normal-case tracking-normal">
                      <Phone className="h-4 w-4 mr-2" /> Call
                    </Button>
                  </Link>
                  <Link href={`mailto:${rep.email}`} className="w-full">
                    <Button variant="outline" size="sm" className="w-full shadow-none hover:shadow-none hover:translate-y-0 normal-case tracking-normal">
                      <Mail className="h-4 w-4 mr-2" /> Email
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Prefer a quick overview of territories?</p>
            <Link href="/territory" prefetch={false}>
              <Button
                variant="outline"
                size="lg"
                className="border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white"
              >
                Explore Territory Coverage
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Project Highlights */}
      <section
        id="projects"
        className="py-20 bg-brand-light/20"
        style={{ contentVisibility: "auto", containIntrinsicSize: "1px 1120px" }}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="border-brand-accent/30 text-brand">
              Our Expertise
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-display font-extrabold uppercase tracking-wide text-brand after:content-[''] after:block after:w-[60px] after:h-[3px] after:bg-brand-yellow after:mx-auto after:mt-3">
              Project Types We Serve
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Specialized water-process equipment solutions across multiple industries and
              applications
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projectHighlights.map((project, idx) => (
              <Card key={`${project.title}-${idx}`} className="h-full overflow-hidden flex flex-col">
                <div className="relative h-48">
                  <Image
                    src={project.image ?? "/placeholder.svg"}
                    alt={project.title}
                    fill
                    sizes="(min-width: 1280px) 360px, (min-width: 768px) 44vw, 92vw"
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6 flex flex-col flex-1">
                  <Badge variant="secondary" className="mb-3 self-start">
                    {project.category}
                  </Badge>
                  <CardTitle className="text-xl mb-3 text-brand-deep">{project.title}</CardTitle>
                  <CardDescription className="mb-4">{project.description}</CardDescription>
                  <div className="flex flex-wrap items-center justify-between gap-3 mt-auto">
                    <div className="flex flex-wrap gap-1">
                      {(project.states ?? []).map((state) => (
                        <Badge key={`${project.title}-${state}`} variant="outline" className="text-xs">
                          {state}
                        </Badge>
                      ))}
                    </div>
                    <Link href="/manufacturers" prefetch={false}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-brand-accent border-brand-accent hover:bg-brand-accent hover:text-white bg-transparent shadow-none hover:shadow-none hover:translate-y-0 normal-case tracking-normal"
                      >
                        View Solutions
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Secondary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Link href="/manufacturers" prefetch={false}>
              <Button
                variant="outline"
                size="lg"
                className="border-brand text-brand hover:bg-brand hover:text-white bg-transparent"
              >
                View All Manufacturers
              </Button>
            </Link>
            <Link href="/contact" prefetch={false}>
              <Button
                variant="outline"
                size="lg"
                className="border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white bg-transparent"
              >
                Discuss Your Project
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
    </PageWrapper>
  );
}
