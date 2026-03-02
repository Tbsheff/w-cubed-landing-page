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
  repSlugs: string[];
  fips: string;
  served: boolean;
};

type CountyFeature = Feature<Geometry | null, CountyFeatureProperties>;

interface CountyMeta {
  id: string;
  county: string;
  state: string;
  stateName: string;
  repSlugs: string[];
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
  "#0055a5", // industrial blue
  "#0e7c6b", // teal
  "#c06c00", // amber
  "#6b4fa0", // plum
];

const STATE_COLORS: Record<string, string> = {
  UT: "#0055a5",
  NV: "#0e7c6b",
  ID: "#c06c00",
  WY: "#6b4fa0",
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

  /* ── Unified coverage map ────────────────────────────────────────────
   * Expands state-level wildcards (servedStates) into explicit county
   * entries using the loaded TopoJSON, producing a single
   * Map<repSlug, Set<"STATE:county">> for O(1) lookups.
   */
  const repCoverageMap = useMemo(() => {
    const map = new Map<string, Set<string>>();
    if (!geographies.length) return map;

    const countiesByState = new Map<string, string[]>();
    for (const feat of geographies) {
      const st = feat.properties.state;
      const cn = normalizeCounty(feat.properties.county);
      if (!countiesByState.has(st)) countiesByState.set(st, []);
      countiesByState.get(st)!.push(cn);
    }

    for (const rep of reps) {
      const keys = new Set<string>();
      for (const stateCode of rep.servedStates) {
        for (const cn of countiesByState.get(stateCode) || []) {
          keys.add(`${stateCode}:${cn}`);
        }
      }
      for (const c of rep.servedCounties) {
        if (c.state && c.county) keys.add(`${c.state}:${c.county}`);
      }
      if (keys.size) map.set(rep.slug, keys);
    }
    return map;
  }, [reps, geographies]);

  const determineRepsForCounty = useCallback(
    (stateCode: string, countyName: string): string[] => {
      const key = `${normalizeState(stateCode)}:${normalizeCounty(countyName)}`;
      const slugs: string[] = [];
      for (const [slug, keys] of repCoverageMap) {
        if (keys.has(key)) slugs.push(slug);
      }
      return slugs;
    },
    [repCoverageMap]
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

      // Pass 1: filter to allowed states and collect counties per state
      type BasicFeature = { geometry: Geometry; stateAlpha: string; countyName: string; id: string; fips: string };
      const basics: BasicFeature[] = [];
      const countiesByState = new Map<string, string[]>();

      for (const featureItem of countyCollection.features) {
        if (!featureItem.geometry) continue;

        const idValue = String(featureItem.id ?? "");
        const fips = idValue.padStart(5, "0");
        const stateCode = fips.slice(0, 2);
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
        if (!stateAlpha || !allowed.has(stateAlpha)) continue;

        const countyName = String(featureItem.properties?.name ?? "");
        if (!countyName) continue;

        const cn = normalizeCounty(countyName);
        if (!countiesByState.has(stateAlpha)) countiesByState.set(stateAlpha, []);
        countiesByState.get(stateAlpha)!.push(cn);

        basics.push({ geometry: featureItem.geometry, stateAlpha, countyName, id: `${stateAlpha}:${countyName}`, fips });
      }

      // Build coverage map: expand state wildcards → explicit county keys
      const coverage = new Map<string, Set<string>>();
      for (const rep of reps) {
        const keys = new Set<string>();
        for (const sc of rep.servedStates) {
          for (const cn of countiesByState.get(sc) || []) keys.add(`${sc}:${cn}`);
        }
        for (const c of rep.servedCounties) {
          if (c.state && c.county) keys.add(`${c.state}:${c.county}`);
        }
        if (keys.size) coverage.set(rep.slug, keys);
      }

      // Pass 2: tag features with rep assignment
      const filtered = basics.map(({ geometry, stateAlpha, countyName, id, fips }) => {
        const key = `${normalizeState(stateAlpha)}:${normalizeCounty(countyName)}`;
        const repSlugs: string[] = [];
        for (const [slug, keys] of coverage) {
          if (keys.has(key)) repSlugs.push(slug);
        }
        return {
          type: "Feature" as const,
          geometry,
          properties: {
            id,
            county: countyName,
            state: stateAlpha,
            stateName: STATE_NAMES[stateAlpha] || stateAlpha,
            repSlugs,
            fips,
            served: repSlugs.length > 0,
          },
        } as CountyFeature;
      });

      setGeographies(filtered);
    };

    load().catch((err) => {
      if (isMounted) console.error("Failed to load map data", err);
    });

    return () => {
      isMounted = false;
    };
  }, [allowedStates, reps, geographies.length, isInView]);

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
      const repSlugs = determineRepsForCounty(
        featureItem.properties.state,
        featureItem.properties.county
      );
      const served = repSlugs.length > 0;

      return {
        id: featureItem.properties.id,
        county: featureItem.properties.county,
        state: featureItem.properties.state,
        stateName: featureItem.properties.stateName,
        repSlugs,
        center,
        fips: featureItem.properties.fips,
        served,
      };
    });
  }, [determineRepsForCounty, geographies]);

  const countiesByRep = useMemo(() => {
    return countiesMeta.reduce<Record<string, CountyMeta[]>>((acc, county) => {
      if (!county.served) return acc;
      for (const slug of county.repSlugs) {
        if (!acc[slug]) acc[slug] = [];
        acc[slug].push(county);
      }
      return acc;
    }, {});
  }, [countiesMeta]);

  const hasServedCoverage = useMemo(() => countiesMeta.some((county) => county.served), [countiesMeta]);
  const showEmptyCoverageNotice = geographies.length > 0 && !hasServedCoverage;

  const statesByRep = useMemo(() => {
    const result: Record<string, string[]> = {};
    for (const [slug, keys] of repCoverageMap) {
      const states = new Set<string>();
      for (const key of keys) states.add(key.split(":")[0]);
      result[slug] = Array.from(states).map((code) => STATE_NAMES[code] || code);
    }
    return result;
  }, [repCoverageMap]);

  const selectedCounty = useMemo(() => {
    if (!selectedCountyId) return null;
    return countiesMeta.find((county) => county.id === selectedCountyId) ?? null;
  }, [countiesMeta, selectedCountyId]);

  const hoveredCounty = useMemo(() => {
    if (!hoveredCountyId) return null;
    return countiesMeta.find((county) => county.id === hoveredCountyId) ?? null;
  }, [countiesMeta, hoveredCountyId]);

  const activeCounty = selectedCounty ?? hoveredCounty;
  const activeReps = useMemo(() => {
    const slugs = activeCounty?.repSlugs ?? [];
    return slugs.map((s) => repBySlug[s]).filter(Boolean);
  }, [activeCounty, repBySlug]);
  const selectedReps = useMemo(() => {
    const slugs = selectedCounty?.repSlugs ?? [];
    return slugs.map((s) => repBySlug[s]).filter(Boolean);
  }, [selectedCounty, repBySlug]);

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

  const filteredCountyListByRep = useMemo(() => {
    if (!selectedCounty) return {};

    const result: Record<string, CountyMeta[]> = {};
    for (const slug of selectedCounty.repSlugs) {
      let counties = countiesByRep[slug] ?? [];
      if (countyListFilter.trim()) {
        const query = countyListFilter.toLowerCase();
        counties = counties.filter((c) => c.county.toLowerCase().includes(query));
      }
      result[slug] = counties.sort((a, b) => a.county.localeCompare(b.county));
    }
    return result;
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

  const mapStyles = useCallback(
    (county: CountyFeature) => {
      if (!county.properties.served) {
        const isSelectedUnserved = county.properties.id === selectedCountyId;
        return {
          default: {
            fill: MAP_COLORS.notServedFill,
            fillOpacity: isSelectedUnserved ? 0.95 : 0.8,
            stroke: isSelectedUnserved ? MAP_COLORS.selectedStroke : MAP_COLORS.notServedStroke,
            strokeWidth: isSelectedUnserved ? 1.8 : 0.6,
            outline: "none",
            transition: "fill-opacity 150ms ease, stroke-width 150ms ease",
          },
          hover: {
            fill: MAP_COLORS.notServedHoverFill,
            fillOpacity: 0.85,
            stroke: MAP_COLORS.notServedHoverStroke,
            strokeWidth: 0.75,
            cursor: "default",
          },
          pressed: {
            fill: MAP_COLORS.notServedHoverFill,
            fillOpacity: 0.85,
            stroke: MAP_COLORS.notServedHoverStroke,
            strokeWidth: 0.75,
          },
        };
      }

      const primarySlug = county.properties.repSlugs[0];
      const repColor = primarySlug ? repColorMap.get(primarySlug) : undefined;
      const isMultiRep = county.properties.repSlugs.length > 1;
      const fillColor =
        colorMode === "rep"
          ? isMultiRep
            ? `url(#stripe-${[...county.properties.repSlugs].sort().join("-")})`
            : repColor || MAP_COLORS.fallbackServedFill
          : STATE_COLORS[county.properties.state] || MAP_COLORS.fallbackServedFill;
      const isSelected = county.properties.id === selectedCountyId;
      const isHovered = county.properties.id === hoveredCountyId;

      const opacity = isSelected ? 0.92 : isHovered ? 0.82 : 0.72;
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
      const repNames = county.properties.repSlugs
        .map((s) => repBySlug[s]?.name)
        .filter(Boolean);
      setTooltip({
        content: county.properties.served
          ? `${county.properties.county} County • ${county.properties.state} • ${
              repNames.join(" & ") || "Representative"
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

  const handleRepCardClick = useCallback(
    (repSlug: string) => {
      const repCounties = countiesByRep[repSlug];
      if (!repCounties?.length) return;

      const [totalLon, totalLat] = repCounties.reduce<[number, number]>(
        (acc, county) => {
          acc[0] += county.center[0];
          acc[1] += county.center[1];
          return acc;
        },
        [0, 0]
      );

      const center: [number, number] = [
        totalLon / repCounties.length,
        totalLat / repCounties.length,
      ];

      lastUserView.current = cloneViewState(viewState);
      setSelectedCountyId(null);
      setHoveredCountyId(null);
      setActiveStateCode(null);
      setViewState({ coordinates: center, zoom: 2.0 });
    },
    [countiesByRep, viewState]
  );

  const clearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  const stripePatterns = useMemo(() => {
    const seen = new Set<string>();
    const patterns: { id: string; colors: string[] }[] = [];
    for (const county of countiesMeta) {
      if (county.repSlugs.length < 2) continue;
      const key = [...county.repSlugs].sort().join("-");
      if (seen.has(key)) continue;
      seen.add(key);
      patterns.push({
        id: `stripe-${key}`,
        colors: county.repSlugs.map((s) => repColorMap.get(s) || MAP_COLORS.fallbackServedFill),
      });
    }
    return patterns;
  }, [countiesMeta, repColorMap]);

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
        {debouncedSearch && filteredSearchResults.length === 0 && (
          <p className="mt-3 text-center text-xs text-muted-foreground">
            No counties found for &ldquo;{debouncedSearch}&rdquo;
          </p>
        )}
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
            const isHighlighted = activeReps.some((r) => r.slug === rep.slug) || selectedReps.some((r) => r.slug === rep.slug);
            const totalCounties = countiesByRep[rep.slug]?.length ?? 0;
            const statesServed = (statesByRep[rep.slug] || []).join(" • ");

            return (
              <div
                key={rep.slug}
                role="button"
                tabIndex={0}
                onClick={() => handleRepCardClick(rep.slug)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleRepCardClick(rep.slug);
                  }
                }}
                className={clsx(
                  "flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors",
                  isHighlighted ? "border-brand bg-brand/5" : "border-brand/10 bg-background hover:border-brand/30"
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

      <AnimatePresence mode="wait">
        {selectedCounty && (
          <motion.div
            key={selectedCounty.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-4 rounded-xl border border-brand/20 bg-white p-4 shadow-sm"
          >
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

            {selectedCounty.served && selectedCounty.repSlugs.length > 0 && (
              <>
                {selectedCounty.repSlugs.length > 1 && (
                  <p className="text-xs text-muted-foreground">
                    Shared by {selectedCounty.repSlugs.length} representatives
                  </p>
                )}
                <Input
                  value={countyListFilter}
                  onChange={(event) => setCountyListFilter(event.target.value)}
                  placeholder="Filter counties"
                  aria-label="Filter counties for representative"
                  className="bg-white"
                />
                {selectedCounty.repSlugs.map((slug) => {
                  const rep = repBySlug[slug];
                  if (!rep) return null;
                  const counties = filteredCountyListByRep[slug] ?? countiesByRep[slug] ?? [];
                  return (
                    <details key={slug} className="rounded-lg border border-dashed border-brand/20 bg-brand/5 text-sm text-brand">
                      <summary className="flex cursor-pointer items-center justify-between px-3 py-2 font-medium">
                        {rep.name}
                        <span className="text-xs text-brand/80">{counties.length}</span>
                      </summary>
                      <div className="border-t border-brand/10">
                        <div className="max-h-44 space-y-1 overflow-y-auto p-3">
                          {counties.map((county) => (
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
                    </details>
                  );
                })}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <section ref={containerRef} className="relative py-8 lg:py-10">
      <div className="container mx-auto px-4 lg:px-6">

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
                <defs>
                  {stripePatterns.map(({ id, colors }) => (
                    <pattern
                      key={id}
                      id={id}
                      width={colors.length * 4}
                      height={colors.length * 4}
                      patternUnits="userSpaceOnUse"
                      patternTransform="rotate(45)"
                    >
                      {colors.map((color, i) => (
                        <rect
                          key={i}
                          x={i * 4}
                          y={0}
                          width={4}
                          height={colors.length * 4}
                          fill={color}
                        />
                      ))}
                    </pattern>
                  ))}
                </defs>
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
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <span
                        className="inline-block h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: MAP_COLORS.notServedFill }}
                      />
                      Unserved
                    </span>
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
