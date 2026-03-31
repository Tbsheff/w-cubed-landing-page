import type { PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity.image";

type BodyImageValue = {
  asset?: {
    _ref?: string;
  };
  alt?: string;
  caption?: string;
  display?: "normal" | "wide";
};

type SectionBreakValue = {
  label?: string;
};

export const portableRichContentComponents: PortableTextComponents = {
  block: {
    lead: ({ children }) => (
      <p className="not-prose !my-8 !max-w-3xl !text-3xl !font-semibold !leading-tight !text-brand-deep md:!text-[2.15rem]">
        {children}
      </p>
    ),
    eyebrow: ({ children }) => (
      <p className="not-prose !my-5 !text-xs !tracking-[0.12em] !font-semibold !text-brand-accent/90">
        {children}
      </p>
    ),
    finePrint: ({ children }) => (
      <p className="not-prose !my-5 !max-w-3xl !text-[0.84rem] !leading-6 !text-muted-foreground">
        {children}
      </p>
    ),
  },
  types: {
    image: ({ value }) => {
      const imageValue = value as BodyImageValue;
      if (!imageValue.asset?._ref) return null;
      const src = urlForImage(value).width(1400).quality(85).url();
      const isWide = imageValue.display === "wide";

      if (!src) return null;

      return (
        <figure className={isWide ? "my-12 -mx-2 md:-mx-8" : "my-12"}>
          <div className="overflow-hidden rounded-xl border border-black/10 bg-white">
            <Image
              src={src}
              alt={imageValue.alt || "Content image"}
              width={isWide ? 1400 : 1000}
              height={isWide ? 840 : 700}
              className="w-full object-cover"
            />
          </div>
          {imageValue.caption ? (
            <figcaption className="mt-3 px-1 text-center text-xs text-muted-foreground">
              {imageValue.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
    sectionBreak: ({ value }) => {
      const section = value as SectionBreakValue;

      return (
        <div className="my-12 not-prose">
          <div className="mb-2">
            {section.label ? (
              <p className="text-sm tracking-[0.08em] font-semibold text-brand-accent">
                {section.label}
              </p>
            ) : null}
          </div>
          <div className="h-px w-full bg-brand-accent/35" aria-hidden="true" />
        </div>
      );
    },
  },
};
