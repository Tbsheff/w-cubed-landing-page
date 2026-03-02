"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent, MouseEvent as ReactMouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";
import { geoCentroid } from "d3-geo";
import clsx from "clsx";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Mail, Minus, Phone, Plus, RefreshCcw, Search, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import type { RepCoverage } from "@/lib/types/territory";

type ColorMode = "rep" | "state";

type CountyFeatureProperties = {
  id: string;
  county: string;
  state: string;
  stateName: string;
  repSlug: string | null;
  fips: string;
  served: boolean;
};

type CountyFeature = Feature<Geometry | null, CountyFeatureProperties>;

interface CountyMeta {
  id: string;
  county: string;
  state: string;
  stateName: string;
  repSlug: string | null;
  center: [number, number];
  fips: string;
  served: boolean;
}

interface MapViewState {
  coordinates: [number, number];
  zoom: number;
}

const STATE_NAMES: Record<string, string> = {
  UT: "Utah",
  NV: "Nevada",
  ID: "Idaho",
  WY: "Wyoming",
};

const COLOR_PALETTE = [
  "rgb(var(--brand))",
  "rgb(var(--brand-deep))",
  "rgb(var(--brand-accent))",
  "rgb(var(--brand-light))",
];

const STATE_COLORS: Record<string, string> = {
  UT: "rgb(var(--brand))",
  NV: "rgb(var(--brand-deep))",
  ID: "rgb(var(--brand-accent))",
  WY: "rgb(var(--brand-light))",
};

const MAP_COLORS = {
  notServedFill: "hsl(var(--muted))",
  notServedStroke: "hsl(var(--border))",
  notServedHoverFill: "hsl(var(--secondary))",
  notServedHoverStroke: "rgb(var(--brand-light) / 0.8)",
  fallbackServedFill: "rgb(var(--brand) / 0.45)",
  selectedStroke: "rgb(var(--brand-deep))",
  hoveredStroke: "rgb(var(--brand))",
  defaultStroke: "rgb(var(--brand-light))",
};

const STATE_CHIPS = [
  { code: "UT", name: "Utah" },
  { code: "NV", name: "Nevada" },
  { code: "ID", name: "Idaho" },
  { code: "WY", name: "Wyoming" },
];

const STATE_LABEL_COORDS: Record<string, [number, number]> = {
  UT: [-111.5, 39.3],
  NV: [-116.8, 38.8],
  ID: [-114.5, 44.1],
  WY: [-107.5, 43.0],
};

const DEFAULT_VIEW: MapViewState = {
  coordinates: [-112.5, 41.5],
  zoom: 1.55,
};

const MAP_MIN_ZOOM = 1;
const MAP_MAX_ZOOM = 6;

const TOOLTIP_OFFSET = { x: 16, y: 16 };

const cloneViewState = (state: MapViewState): MapViewState => ({
  coordinates: [...state.coordinates] as [number, number],
  zoom: state.zoom,
});

type TerritorySplitMapProps = {
  representatives?: RepCoverage[];
};

const normalizeState = (value?: string | null) => (value ? value.trim().toUpperCase() : "");

const normalizeCounty = (value?: string | null) => (value ? value.trim().toLowerCase() : "");

const defaultStates = ["UT", "NV", "ID", "WY"];

export function TerritorySplitMap({ representatives = [] }: TerritorySplitMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapWrapperRef = useRef<HTMLDivElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [geographies, setGeographies] = useState<CountyFeature[]>([]);
  const [mapSize, setMapSize] = useState({ width: 820, height: 540 });
  const [colorMode, setColorMode] = useState<ColorMode>("rep");
  const [selectedCountyId, setSelectedCountyId] = useState<string | null>(null);
  const [hoveredCountyId, setHoveredCountyId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [countyListFilter, setCountyListFilter] = useState("");
  const [viewState, setViewState] = useState<MapViewState>(DEFAULT_VIEW);
  const lastUserView = useRef<MapViewState>(DEFAULT_VIEW);
  const [tooltip, setTooltip] = useState<{ content: string; x: number; y: number } | null>(null);
  const [activeStateCode, setActiveStateCode] = useState<string | null>(null);
  const tooltipHideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reps = useMemo(() => {
    return (representatives || []).map((rep) => ({
      ...rep,
      servedStates: (rep.servedStates || []).map(normalizeState).filter(Boolean),
      servedCounties: (rep.servedCounties || []).map((c) => ({
        state: normalizeState(c.state),
        county: normalizeCounty(c.county),
      })),
    }));
  }, [representatives]);

  const repBySlug = useMemo(() => {
    return reps.reduce<Record<string, RepCoverage>>((acc, rep) => {
      acc[rep.slug] = rep;
      return acc;
    }, {});
  }, [reps]);

  const allowedStates = useMemo(() => {
    const set = new Set<string>();
    reps.forEach((rep) => {
      rep.servedStates.forEach((s) => set.add(s));
      rep.servedCounties.forEach((c) => {
        if (c.state) set.add(c.state);
      });
    });
    return set.size ? Array.from(set) : defaultStates;
  }, [reps]);

  const repColorMap = useMemo(() => {
    const map = new Map<string, string>();
    const sorted = [...reps].sort((a, b) => a.slug.localeCompare(b.slug));
    sorted.forEach((rep, index) => {
      map.set(rep.slug, COLOR_PALETTE[index % COLOR_PALETTE.length]);
    });
    return map;
  }, [reps]);

  const determineRepForCounty = useCallback(
    (stateCode: string, countyName: string) => {
      const countyNormalized = normalizeCounty(countyName);
      const stateNormalized = normalizeState(stateCode);
      for (const rep of reps) {
        if (rep.servedStates.includes(stateNormalized)) {
          return rep.slug;
        }
        if (
          rep.servedCounties.some(
            (c) => c.state === stateNormalized && c.county === countyNormalized
          )
        ) {
          return rep.slug;
        }
      }
      return null;
    },
    [reps]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mapWrapperRef.current) {
      return;
    }

    const element = mapWrapperRef.current;
    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width } = entry.contentRect;
      const height = Math.max(360, Math.min(640, width * 0.68));
      setMapSize({ width, height });
    });

    resizeObserver.observe(element);

    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || geographies.length > 0) {
      return;
    }

    let isMounted = true;

    const load = async () => {
      const topoModule = await import("us-atlas/counties-10m.json");
      const topoJson = topoModule.default as any;
      const topoClient = await import("topojson-client");
      const { feature } = topoClient;
      const countyCollection = feature(
        topoJson,
        topoJson.objects.counties
      ) as unknown as FeatureCollection<Geometry | null, { name: string }>;

      if (!isMounted) return;

      const allowed = new Set(allowedStates.map(normalizeState));

      const filtered = countyCollection.features
        .map((featureItem) => {
          if (!featureItem.geometry) {
            return null;
          }

          const idValue = String(featureItem.id ?? "");
          const normalized = idValue.padStart(5, "0");
          const stateCode = normalized.slice(0, 2);
          const stateAlpha =
            stateCode === "49"
              ? "UT"
              : stateCode === "32"
                ? "NV"
                : stateCode === "16"
                  ? "ID"
                  : stateCode === "56"
                    ? "WY"
                    : "";
          if (!stateAlpha || !allowed.has(stateAlpha)) {
            return null;
          }

          const countyName = String(featureItem.properties?.name ?? "");
          if (!countyName) {
            return null;
          }

          const id = `${stateAlpha}:${countyName}`;

          const repSlug = determineRepForCounty(stateAlpha, countyName);
          const served = Boolean(repSlug);

          const nextFeature: CountyFeature = {
            type: "Feature",
            geometry: featureItem.geometry,
            properties: {
              id,
              county: countyName,
              state: stateAlpha,
              stateName: STATE_NAMES[stateAlpha] || stateAlpha,
              repSlug,
              fips: normalized,
              served,
            },
          } as CountyFeature;

          return nextFeature;
        })
        .filter(Boolean) as CountyFeature[];

      setGeographies(filtered);
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [allowedStates, determineRepForCounty, geographies.length, isInView]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchQuery.trim());
    }, 200);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  useEffect(() => {
    return () => {
      if (tooltipHideTimeout.current) {
        clearTimeout(tooltipHideTimeout.current);
      }
    };
  }, []);

  const countiesMeta = useMemo<CountyMeta[]>(() => {
    if (!geographies.length) {
      return [];
    }

    return geographies.map((featureItem) => {
      const center = geoCentroid(featureItem) as [number, number];
      const repSlug = determineRepForCounty(
        featureItem.properties.state,
        featureItem.properties.county
      );
      const served = Boolean(repSlug);

      return {
        id: featureItem.properties.id,
        county: featureItem.properties.county,
        state: featureItem.properties.state,
        stateName: featureItem.properties.stateName,
        repSlug,
        center,
        fips: featureItem.properties.fips,
        served,
      };
    });
  }, [determineRepForCounty, geographies]);

  const countiesByRep = useMemo(() => {
    return countiesMeta.reduce<Record<string, CountyMeta[]>>((acc, county) => {
      if (!county.served || !county.repSlug) {
        return acc;
      }
      acc[county.repSlug] = [...(acc[county.repSlug] ?? []), county];
      return acc;
    }, {});
  }, [countiesMeta]);

  const hasServedCoverage = useMemo(() => countiesMeta.some((county) => county.served), [countiesMeta]);
  const showEmptyCoverageNotice = geographies.length > 0 && !hasServedCoverage;

  const statesByRep = useMemo(() => {
    const result: Record<string, string[]> = {};
    reps.forEach((rep) => {
      rep.servedStates.forEach((stateCode) => {
        const name = STATE_NAMES[stateCode] || stateCode;
        result[rep.slug] = result[rep.slug] || [];
        if (!result[rep.slug].includes(name)) {
          result[rep.slug].push(name);
        }
      });
    });
    return result;
  }, [reps]);

  const selectedCounty = useMemo(() => {
    if (!selectedCountyId) return null;
    return countiesMeta.find((county) => county.id === selectedCountyId) ?? null;
  }, [countiesMeta, selectedCountyId]);

  const hoveredCounty = useMemo(() => {
    if (!hoveredCountyId) return null;
    return countiesMeta.find((county) => county.id === hoveredCountyId) ?? null;
  }, [countiesMeta, hoveredCountyId]);

  const activeCounty = selectedCounty ?? hoveredCounty;
  const activeRep = activeCounty?.repSlug
    ? repBySlug[activeCounty.repSlug]
    : selectedCounty?.repSlug
      ? repBySlug[selectedCounty.repSlug]
      : null;
  const selectedRep = selectedCounty?.repSlug ? repBySlug[selectedCounty.repSlug] : null;

  const filteredSearchResults = useMemo(() => {
    if (!debouncedSearch) {
      return [];
    }

    const query = debouncedSearch.toLowerCase();

    return countiesMeta
      .filter((county) => `${county.county}, ${county.state}`.toLowerCase().includes(query))
      .sort((a, b) => {
        if (a.served !== b.served) return a.served ? -1 : 1;
        return a.county.localeCompare(b.county);
      })
      .slice(0, 12);
  }, [countiesMeta, debouncedSearch]);

  const filteredCountyList = useMemo(() => {
    if (!selectedCounty) {
      return [];
    }

    const repCounties = selectedCounty.repSlug ? (countiesByRep[selectedCounty.repSlug] ?? []) : [];

    if (!countyListFilter.trim()) {
      return repCounties.sort((a, b) => a.county.localeCompare(b.county));
    }

    const query = countyListFilter.toLowerCase();
    return repCounties
      .filter((county) => county.county.toLowerCase().includes(query))
      .sort((a, b) => a.county.localeCompare(b.county));
  }, [countiesByRep, countyListFilter, selectedCounty]);

  const handleSelectCounty = useCallback(
    (countyId: string, opts?: { animate?: boolean }) => {
      const county = countiesMeta.find((meta) => meta.id === countyId);
      if (!county) {
        return;
      }

      lastUserView.current = cloneViewState(viewState);
      setSelectedCountyId(countyId);
      setHoveredCountyId(null);

      if (opts?.animate !== false) {
        setViewState({
          coordinates: county.center,
          zoom: Math.min(3.2, Math.max(2, viewState.zoom)),
        });
      }
    },
    [countiesMeta, viewState]
  );

  const handleHoverCounty = useCallback(
    (countyId: string | null) => {
      if (!countyId) {
        setHoveredCountyId(null);
        return;
      }

      const county = countiesMeta.find((meta) => meta.id === countyId);
      if (!county?.served) {
        setHoveredCountyId(null);
        return;
      }

      setHoveredCountyId(countyId);
    },
    [countiesMeta]
  );

  const handleStateChipClick = useCallback(
    (stateCode: string) => {
      const countiesForState = countiesMeta.filter(
        (county) => county.state === stateCode && county.served
      );
      if (!countiesForState.length) {
        return;
      }

      const [avgLon, avgLat] = countiesForState.reduce<[number, number]>(
        (acc, county) => {
          acc[0] += county.center[0];
          acc[1] += county.center[1];
          return acc;
        },
        [0, 0]
      );

      const center: [number, number] = [
        avgLon / countiesForState.length,
        avgLat / countiesForState.length,
      ];

      lastUserView.current = cloneViewState(viewState);
      setSelectedCountyId(null);
      setHoveredCountyId(null);
      setActiveStateCode(stateCode);
      setViewState({ coordinates: center, zoom: 2.2 });
    },
    [countiesMeta, viewState]
  );

  const resetSelection = useCallback(() => {
    setSelectedCountyId(null);
    setHoveredCountyId(null);
    setCountyListFilter("");
    setActiveStateCode(null);
    setViewState(cloneViewState(lastUserView.current));
  }, []);

  const handleSearchSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!filteredSearchResults.length) {
        return;
      }

      handleSelectCounty(filteredSearchResults[0].id);
      setSearchQuery("");
    },
    [filteredSearchResults, handleSelectCounty]
  );

  const handleCopy = useCallback(async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
    } catch (error) {
      console.error("Copy failed", error);
    }
  }, []);

  const mapStyles = useCallback(
    (county: CountyFeature) => {
      if (!county.properties.served) {
        return {
          default: {
            fill: MAP_COLORS.notServedFill,
            fillOpacity: 0.8,
            stroke: MAP_COLORS.notServedStroke,
            strokeWidth: 0.6,
            outline: "none",
            transition: "fill-opacity 150ms ease, stroke-width 150ms ease",
          },
          hover: {
            fill: MAP_COLORS.notServedHoverFill,
            fillOpacity: 0.85,
            stroke: MAP_COLORS.notServedHoverStroke,
            strokeWidth: 0.75,
            cursor: "not-allowed",
          },
          pressed: {
            fill: MAP_COLORS.notServedHoverFill,
            fillOpacity: 0.85,
            stroke: MAP_COLORS.notServedHoverStroke,
            strokeWidth: 0.75,
          },
        };
      }

      const repColor = county.properties.repSlug
        ? repColorMap.get(county.properties.repSlug)
        : undefined;
      const fillColor =
        colorMode === "rep"
          ? repColor || MAP_COLORS.fallbackServedFill
          : STATE_COLORS[county.properties.state] || MAP_COLORS.fallbackServedFill;
      const isSelected = county.properties.id === selectedCountyId;
      const isHovered = county.properties.id === hoveredCountyId;

      const opacity = isSelected ? 0.9 : isHovered ? 0.78 : 0.6;
      const strokeWidth = isSelected ? 1.8 : isHovered ? 1.4 : 0.75;
      const strokeColor = isSelected
        ? MAP_COLORS.selectedStroke
        : isHovered
          ? MAP_COLORS.hoveredStroke
          : MAP_COLORS.defaultStroke;

      return {
        default: {
          fill: fillColor,
          fillOpacity: opacity,
          stroke: strokeColor,
          strokeWidth,
          outline: "none",
          transition: "fill-opacity 150ms ease, stroke-width 150ms ease",
        },
        hover: {
          fill: fillColor,
          fillOpacity: 0.85,
          stroke: MAP_COLORS.selectedStroke,
          strokeWidth: 1.6,
          cursor: "pointer",
        },
        pressed: {
          fill: fillColor,
          fillOpacity: 0.88,
          stroke: MAP_COLORS.selectedStroke,
          strokeWidth: 1.8,
        },
      };
    },
    [colorMode, hoveredCountyId, repColorMap, selectedCountyId]
  );

  const handleMapMouseMove = useCallback(
    (event: ReactMouseEvent<SVGPathElement, globalThis.MouseEvent>, county: CountyFeature) => {
      if (tooltipHideTimeout.current) {
        clearTimeout(tooltipHideTimeout.current);
        tooltipHideTimeout.current = null;
      }
      const rep = county.properties.repSlug ? repBySlug[county.properties.repSlug] : null;
      setTooltip({
        content: county.properties.served
          ? `${county.properties.county} County • ${county.properties.state} • ${
              rep?.name ?? "Representative"
            }`
          : `${county.properties.county} County • ${county.properties.state} • Not currently served`,
        x: event.clientX + TOOLTIP_OFFSET.x,
        y: event.clientY + TOOLTIP_OFFSET.y,
      });
      if (county.properties.served) {
        handleHoverCounty(county.properties.id);
      } else {
        setHoveredCountyId(null);
      }
    },
    [handleHoverCounty, repBySlug]
  );

  const handleMapMouseLeave = useCallback(() => {
    if (!selectedCountyId) {
      handleHoverCounty(null);
    } else {
      setHoveredCountyId(null);
    }
    tooltipHideTimeout.current = setTimeout(() => {
      setTooltip(null);
      tooltipHideTimeout.current = null;
    }, 150);
  }, [handleHoverCounty, selectedCountyId]);

  const handleCountyKeyDown = useCallback(
    (event: KeyboardEvent<SVGPathElement>, county: CountyFeature) => {
      if (!county.properties.served) {
        return;
      }
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleSelectCounty(county.properties.id);
      }
    },
    [handleSelectCounty]
  );

  const zoomIn = useCallback(() => {
    setViewState((prev) => ({
      coordinates: prev.coordinates,
      zoom: Math.min(MAP_MAX_ZOOM, prev.zoom * 1.3),
    }));
  }, []);

  const zoomOut = useCallback(() => {
    setViewState((prev) => ({
      coordinates: prev.coordinates,
      zoom: Math.max(MAP_MIN_ZOOM, prev.zoom / 1.3),
    }));
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  const orderedReps = useMemo(() => [...reps].sort((a, b) => a.name.localeCompare(b.name)), [reps]);

  const drawerContent = (
    <div className="space-y-6">
      {showEmptyCoverageNotice && (
        <div className="rounded-xl border border-amber-300/70 bg-amber-50 p-4 text-sm text-amber-900">
          Territory coverage data is not configured in CMS yet. The map is available, but counties
          are currently shown as unserved.
        </div>
      )}

      <div className="rounded-xl border border-brand/15 bg-brand/5 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm font-semibold text-brand">Color by</span>
          <div className="flex items-center gap-2" role="radiogroup" aria-label="Color counties by">
            {(
              [
                { label: "Representative", value: "rep" },
                { label: "State", value: "state" },
              ] as const
            ).map((item) => (
              <Button
                key={item.value}
                type="button"
                variant={colorMode === item.value ? "default" : "outline"}
                size="sm"
                onClick={() => setColorMode(item.value)}
                aria-pressed={colorMode === item.value}
                className={clsx(
                  "rounded-full border-brand/30 px-3",
                  colorMode === item.value
                    ? "bg-brand text-white hover:bg-brand/90"
                    : "bg-white/70 text-brand hover:bg-brand/10"
                )}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {STATE_CHIPS.map((state) => (
            <Button
              key={state.code}
              type="button"
              variant={activeStateCode === state.code ? "default" : "outline"}
              size="sm"
              onClick={() => handleStateChipClick(state.code)}
              aria-label={`Zoom to ${state.name}`}
              className={clsx(
                activeStateCode === state.code
                  ? "bg-brand text-white hover:bg-brand/90"
                  : "border-brand/20 bg-white/70 text-brand hover:bg-brand/10"
              )}
            >
              {state.code}
            </Button>
          ))}
        </div>
        <form onSubmit={handleSearchSubmit} className="relative mt-4">
          <Input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search county..."
            aria-label="Search county"
            className="bg-white pr-12"
          />
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand" />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search"
              className="absolute inset-y-0 right-8 flex items-center text-brand-accent"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </form>
        {debouncedSearch && filteredSearchResults.length > 0 && (
          <div className="mt-3 rounded-lg border border-brand/10 bg-white shadow-sm">
            <ul
              role="listbox"
              aria-label="County search results"
              className="max-h-64 overflow-y-auto"
            >
              {filteredSearchResults.map((county) => (
                <li key={county.id}>
                  <button
                    type="button"
                    className={clsx(
                      "flex w-full items-center justify-between gap-4 px-3 py-2 text-left focus:outline-none",
                      county.served
                        ? "hover:bg-brand/5 focus:bg-brand/10"
                        : "hover:bg-muted/50 focus:bg-muted/60"
                    )}
                    onClick={() => {
                      handleSelectCounty(county.id);
                      setSearchQuery("");
                    }}
                    onMouseEnter={() => county.served && handleHoverCounty(county.id)}
                    onMouseLeave={() => handleHoverCounty(null)}
                    onFocus={() => county.served && handleHoverCounty(county.id)}
                    onBlur={() => handleHoverCounty(null)}
                  >
                    <span className={clsx(
                      "text-sm font-medium",
                      county.served ? "text-brand" : "text-muted-foreground"
                    )}>
                      {county.county} County
                    </span>
                    {county.served ? (
                      <Badge variant="outline" className="border-brand/20 text-xs text-brand">
                        {county.state}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-muted-foreground/30 text-xs text-muted-foreground">
                        Not served
                      </Badge>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-brand">
            Representative coverage
          </h3>
          <p className="text-xs text-muted-foreground">
            Select a county or tap a card to explore territory details.
          </p>
        </div>
        <div className="space-y-3">
          {orderedReps.map((rep) => {
            const isHighlighted = activeRep?.slug === rep.slug || selectedRep?.slug === rep.slug;
            const totalCounties = countiesByRep[rep.slug]?.length ?? 0;
            const statesServed = (statesByRep[rep.slug] || []).join(" • ");

            return (
              <div
                key={rep.slug}
                className={clsx(
                  "flex items-start gap-3 rounded-xl border p-4 transition-colors",
                  isHighlighted ? "border-brand bg-brand/5" : "border-brand/10 bg-background"
                )}
              >
                {rep.photoUrl ? (
                  <Image
                    src={rep.photoUrl}
                    alt={rep.name}
                    width={56}
                    height={56}
                    className="h-14 w-14 flex-shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-brand/10 text-base font-semibold text-brand">
                    {rep.name.slice(0, 1)}
                  </div>
                )}
                <div className="flex-1 space-y-2">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-brand">{rep.name}</p>
                      <Badge variant="outline" className="border-brand/20 text-xs text-brand">
                        {totalCounties ? `${totalCounties} counties` : "Loading counties"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {statesServed ? `Serving ${statesServed}` : "Coverage not specified"}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 text-xs text-brand">
                    {rep.email && (
                      <a
                        href={`mailto:${rep.email}`}
                        className="inline-flex items-center gap-1 hover:underline"
                      >
                        <Mail className="h-3.5 w-3.5" /> {rep.email}
                      </a>
                    )}
                    {rep.phone && (
                      <a
                        href={`tel:${rep.phone}`}
                        className="inline-flex items-center gap-1 hover:underline"
                      >
                        <Phone className="h-3.5 w-3.5" /> {rep.phone}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedCounty && (
        <div className="space-y-4 rounded-xl border border-brand/20 bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className={clsx(
                  "text-lg font-semibold",
                  selectedCounty.served ? "text-brand" : "text-muted-foreground"
                )}>
                  {selectedCounty.county} County
                </h3>
                <Badge variant="outline" className={clsx(
                  "text-xs",
                  selectedCounty.served ? "border-brand/20 text-brand" : "border-muted-foreground/30 text-muted-foreground"
                )}>
                  {selectedCounty.state}
                </Badge>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{selectedCounty.stateName}</p>
              {!selectedCounty.served && (
                <p className="mt-2 text-sm text-muted-foreground">Not currently served</p>
              )}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-brand hover:bg-brand/10"
              onClick={resetSelection}
            >
              <RefreshCcw className="mr-2 h-4 w-4" /> Reset
            </Button>
          </div>

          {selectedCounty.served && (
            <details className="rounded-lg border border-dashed border-brand/20 bg-brand/5 text-sm text-brand">
              <summary className="flex cursor-pointer items-center justify-between px-3 py-2 font-medium">
                Counties served by this representative
                <span className="text-xs text-brand/80">
                  {
                    (selectedCounty.repSlug ? (countiesByRep[selectedCounty.repSlug] ?? []) : [])
                      .length
                  }
                </span>
              </summary>
              <div className="border-t border-brand/10">
                <div className="p-3">
                  <Input
                    value={countyListFilter}
                    onChange={(event) => setCountyListFilter(event.target.value)}
                    placeholder="Filter counties"
                    aria-label="Filter counties for representative"
                    className="mb-3 bg-white"
                  />
                  <div className="max-h-44 space-y-1 overflow-y-auto">
                    {(filteredCountyList.length
                      ? filteredCountyList
                      : selectedCounty.repSlug
                        ? (countiesByRep[selectedCounty.repSlug] ?? [])
                        : []
                    ).map((county) => (
                      <button
                        key={county.id}
                        type="button"
                        className={clsx(
                          "flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-sm text-brand-deep/80 hover:bg-brand/10 focus:bg-brand/10 focus:outline-none",
                          county.id === selectedCountyId ? "bg-brand/15" : ""
                        )}
                        onClick={() => handleSelectCounty(county.id, { animate: false })}
                        onMouseEnter={() => handleHoverCounty(county.id)}
                        onMouseLeave={() => handleHoverCounty(null)}
                        onFocus={() => handleHoverCounty(county.id)}
                        onBlur={() => handleHoverCounty(null)}
                      >
                        <span>{county.county} County</span>
                        <Badge variant="outline" className="border-brand/20 text-xs text-brand">
                          {county.state}
                        </Badge>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </details>
          )}
        </div>
      )}
    </div>
  );

  return (
    <section ref={containerRef} className="relative py-16">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="mb-10 max-w-2xl">
          <Badge variant="outline" className="border-brand/30 text-brand">
            Interactive Coverage
          </Badge>
          <h2 className="mt-3 text-3xl font-bold text-brand md:text-4xl">
            County-level Territory Explorer
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">
            Explore every county we serve across Utah, Nevada, Idaho, and Wyoming. Hover to preview,
            search to find your area, and click a county for representative details.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8">
          <div
            ref={mapWrapperRef}
            className="relative w-full overflow-hidden rounded-2xl border bg-background shadow-sm"
          >
            <div
              role="region"
              aria-label="Territories map—use arrow keys or mouse to explore."
              className="relative"
            >
              {geographies.length === 0 ? (
                <div
                  className="flex items-center justify-center"
                  style={{ width: mapSize.width, height: mapSize.height }}
                >
                  <Skeleton className="absolute inset-0 rounded-2xl" />
                  <span className="relative z-10 text-sm text-muted-foreground">Loading map…</span>
                </div>
              ) : (
              <ComposableMap
                projection="geoAlbersUsa"
                projectionConfig={{ scale: Math.max(620, mapSize.width) * 1.05 }}
                width={mapSize.width}
                height={mapSize.height}
                className="w-full"
              >
                <ZoomableGroup
                  center={viewState.coordinates}
                  zoom={viewState.zoom}
                  minZoom={MAP_MIN_ZOOM}
                  maxZoom={MAP_MAX_ZOOM}
                  translateExtent={[
                    [-500, -200],
                    [mapSize.width + 500, mapSize.height + 300],
                  ]}
                  onMoveEnd={(position: { coordinates: [number, number]; zoom: number }) => {
                    setViewState({ coordinates: position.coordinates, zoom: position.zoom });
                  }}
                >
                  <Geographies
                    geography={{
                      type: "FeatureCollection",
                      features: geographies as CountyFeature[],
                    }}
                  >
                    {({ geographies: mapGeographies }: { geographies: CountyFeature[] }) =>
                      mapGeographies.map((geo) => (
                        <Geography
                          key={geo.properties.id as string}
                          geography={geo}
                          onMouseMove={(event) => handleMapMouseMove(event, geo as CountyFeature)}
                          onMouseLeave={handleMapMouseLeave}
                          onFocus={() => handleHoverCounty((geo as CountyFeature).properties.id)}
                          onBlur={() => handleHoverCounty(null)}
                          onClick={() => handleSelectCounty((geo as CountyFeature).properties.id)}
                          onKeyDown={(event) => handleCountyKeyDown(event, geo as CountyFeature)}
                          tabIndex={0}
                          role="button"
                          aria-label={`${(geo as CountyFeature).properties.county} County, ${
                            (geo as CountyFeature).properties.state
                          }`}
                          style={mapStyles(geo as CountyFeature)}
                        />
                      ))
                    }
                  </Geographies>
                  {Object.entries(STATE_LABEL_COORDS).map(([code, coords]) => (
                    <Marker key={code} coordinates={coords}>
                      <text
                        textAnchor="middle"
                        dominantBaseline="central"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: 14 / viewState.zoom,
                          fontWeight: 600,
                          fill: "rgb(var(--brand))",
                          opacity: 0.4,
                          pointerEvents: "none",
                          userSelect: "none",
                        }}
                      >
                        {code}
                      </text>
                    </Marker>
                  ))}
                </ZoomableGroup>
              </ComposableMap>
              )}

              <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-background/90 to-transparent" />

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background/80 to-transparent" />

              <div className="absolute left-4 top-4 flex flex-col gap-2">
                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  onClick={zoomIn}
                  aria-label="Zoom in"
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  onClick={zoomOut}
                  aria-label="Zoom out"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  onClick={() => {
                    setViewState(cloneViewState(DEFAULT_VIEW));
                    setSelectedCountyId(null);
                    setActiveStateCode(null);
                  }}
                  aria-label="Reset zoom"
                >
                  <RefreshCcw className="h-4 w-4" />
                </Button>
              </div>

              {geographies.length > 0 && (
                <div className="absolute bottom-4 right-4 rounded-lg border bg-white/90 px-3 py-2 shadow-sm backdrop-blur-sm">
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-brand">
                    {colorMode === "rep"
                      ? orderedReps.map((rep) => (
                          <span key={rep.slug} className="flex items-center gap-1.5">
                            <span
                              className="inline-block h-2.5 w-2.5 rounded-full"
                              style={{ backgroundColor: repColorMap.get(rep.slug) }}
                            />
                            {rep.name.split(" ")[0]}
                          </span>
                        ))
                      : Object.entries(STATE_COLORS).map(([code, color]) => (
                          <span key={code} className="flex items-center gap-1.5">
                            <span
                              className="inline-block h-2.5 w-2.5 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                            {code}
                          </span>
                        ))}
                  </div>
                </div>
              )}

              {tooltip && (
                <div
                  className="pointer-events-none fixed z-50 rounded-md border border-brand/40 bg-brand px-3 py-1 text-xs font-medium text-white shadow-lg"
                  style={{ left: tooltip.x, top: tooltip.y }}
                >
                  {tooltip.content}
                </div>
              )}
            </div>
          </div>

          {/* Desktop sidebar - hidden on mobile */}
          <aside className="hidden rounded-2xl border bg-background p-6 shadow-sm lg:block">
            {drawerContent}
          </aside>
        </div>

        {/* Mobile content - visible below map on mobile, hidden on desktop */}
        <div className="mt-6 rounded-2xl border bg-background p-6 shadow-sm lg:hidden">
          {drawerContent}
        </div>
      </div>
    </section>
  );
}
