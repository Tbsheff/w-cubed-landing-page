import Image from "next/image";
import Link from "next/link";

type ManufacturerItem = { id: string; name: string; logo: string };

export function PartnersStrip({ manufacturers }: { manufacturers: ManufacturerItem[] }) {
  return (
    <section
      className="bg-white py-16"
      style={{ contentVisibility: "auto", containIntrinsicSize: "1px 420px" }}
    >
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header with yellow underline accent */}
        <div className="text-center mb-12">
          <h3 className="inline-block relative font-display text-2xl font-extrabold uppercase text-brand tracking-wide">
            Trusted Manufacturing Partners
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[60px] h-[3px] bg-brand-yellow" />
          </h3>
        </div>

        {/* Logo grid — greyscale → color on hover */}
        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-14">
          {manufacturers.map((m) => (
            <Link
              key={m.id}
              href={`/manufacturers/${m.id}`}
              prefetch={false}
              className="transition-all duration-200"
            >
              {m.id === "veolia-suez" ? (
                <div className="flex items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-200">
                  <Image
                    src="/manufacturers/veolia-capsule-logo.svg"
                    alt="Veolia logo"
                    width={120}
                    height={80}
                    sizes="120px"
                    className="h-12 w-auto object-contain"
                  />
                  <Image
                    src="/manufacturers/suez-logo.webp"
                    alt="Suez logo"
                    width={100}
                    height={70}
                    sizes="100px"
                    className="h-10 w-auto object-contain"
                  />
                </div>
              ) : (
                <Image
                  src={m.logo}
                  alt={`${m.name} logo`}
                  width={180}
                  height={90}
                  sizes="(max-width: 768px) 36vw, 180px"
                  className="object-contain max-h-12 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-200"
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
