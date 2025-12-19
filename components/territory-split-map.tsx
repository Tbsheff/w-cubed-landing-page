"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent, KeyboardEvent, MouseEvent as ReactMouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { geoCentroid } from "d3-geo";
import clsx from "clsx";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Mail, Minus, Phone, Plus, RefreshCcw, Search, X } from "lucide-react";
import type { Feature, FeatureCollection, Geometry } from "geojson";

type ColorMode = "rep" | "state";

type CountyFeatureProperties = {
  id: string;
  county: string;
  state: string;
  stateName: string;
  repId: RepId;
  fips: string;
  served: boolean;
};

type CountyFeature = Feature<Geometry | null, CountyFeatureProperties>;

type RepId = "brad" | "austin";

interface CountyMeta {
  id: string;
  county: string;
  state: string;
  stateName: string;
  repId: RepId;
  center: [number, number];
  fips: string;
  served: boolean;
}

interface MapViewState {
  coordinates: [number, number];
  zoom: number;
}

const STATE_CODES = {
  "16": { code: "ID", name: "Idaho", repId: "austin" as const },
  "32": { code: "NV", name: "Nevada", repId: "brad" as const },
  "49": { code: "UT", name: "Utah", repId: "brad" as const },
  "56": { code: "WY", name: "Wyoming", repId: "austin" as const },
};

const SERVED_COUNTIES: Record<string, Set<string>> = {
  NV: new Set(["elko", "lander", "eureka", "white pine", "lincoln"]),
  ID: new Set([
    "ada",
    "adams",
    "bannock",
    "bear lake",
    "bingham",
    "blaine",
    "boise",
    "bonneville",
    "butte",
    "camas",
    "canyon",
    "caribou",
    "cassia",
    "clark",
    "custer",
    "elmore",
    "franklin",
    "fremont",
    "gem",
    "gooding",
    "idaho",
    "jefferson",
    "jerome",
    "lemhi",
    "lincoln",
    "madison",
    "minidoka",
    "oneida",
    "owyhee",
    "payette",
    "power",
    "teton",
    "twin falls",
    "valley",
    "washington",
  ]),
  WY: new Set([
    "park",
    "hot springs",
    "fremont",
    "sweetwater",
    "teton",
    "lincoln",
    "sublette",
    "uinta",
  ]),
};

const REP_INFO: Record<
  RepId,
  { id: RepId; name: string; email: string; phone: string; photo?: string }
> = {
  brad: {
    id: "brad",
    name: "Brad Gwinnup",
    email: "Bradg@wcubedinc.com",
    phone: "801-232-8241",
    photo: "/placeholder.svg?height=160&width=160&text=Brad+Gwinnup",
  },
  austin: {
    id: "austin",
    name: "Austin Gwinnup",
    email: "Austing@wcubedinc.com",
    phone: "801-803-8558",
    photo: "/placeholder.svg?height=160&width=160&text=Austin+Gwinnup",
  },
};

const isCountyServed = (stateCode: string, countyName: string) => {
  if (stateCode === "UT") {
    return true;
  }

  const servedSet = SERVED_COUNTIES[stateCode];
  if (!servedSet) {
    return false;
  }

  return servedSet.has(countyName.trim().toLowerCase());
};

const REP_COLORS: Record<RepId, string> = {
  brad: "#1C4E80",
  austin: "#4986C8",
};

const STATE_COLORS: Record<string, string> = {
  UT: "#1C4E80",
  NV: "#2F5C9C",
  ID: "#4986C8",
  WY: "#5E7FC4",
};

const STATE_CHIPS = [
  { code: "UT", name: "Utah" },
  { code: "NV", name: "Nevada" },
  { code: "ID", name: "Idaho" },
  { code: "WY", name: "Wyoming" },
];

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

export function TerritorySplitMap() {
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

      const filtered = countyCollection.features
        .map((featureItem) => {
          if (!featureItem.geometry) {
            return null;
          }

          const idValue = String(featureItem.id ?? "");
          const normalized = idValue.padStart(5, "0");
          const stateCode = normalized.slice(0, 2);
          if (!(stateCode in STATE_CODES)) {
            return null;
          }

          const countyName = String(featureItem.properties?.name ?? "");
          if (!countyName) {
            return null;
          }

          const stateEntry = STATE_CODES[stateCode as keyof typeof STATE_CODES];
          const id = `${stateEntry.code}:${countyName}`;
          const served = isCountyServed(stateEntry.code, countyName);

          const nextFeature: CountyFeature = {
            type: "Feature",
            geometry: featureItem.geometry,
            properties: {
              id,
              county: countyName,
              state: stateEntry.code,
              stateName: stateEntry.name,
              repId: stateEntry.repId,
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
  }, [geographies.length, isInView]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchQuery.trim());
    }, 200);

    return () => clearTimeout(timeout);
  }, [searchQuery]);

  const countiesMeta = useMemo<CountyMeta[]>(() => {
    if (!geographies.length) {
      return [];
    }

    return geographies.map((featureItem) => {
      const center = geoCentroid(featureItem) as [number, number];

      return {
        id: featureItem.properties.id,
        county: featureItem.properties.county,
        state: featureItem.properties.state,
        stateName: featureItem.properties.stateName,
        repId: featureItem.properties.repId,
        center,
        fips: featureItem.properties.fips,
        served: featureItem.properties.served,
      };
    });
  }, [geographies]);

  const countiesByRep = useMemo(() => {
    return countiesMeta.reduce<Record<RepId, CountyMeta[]>>(
      (acc, county) => {
        if (!county.served) {
          return acc;
        }
        acc[county.repId] = [...(acc[county.repId] ?? []), county];
        return acc;
      },
      { brad: [], austin: [] }
    );
  }, [countiesMeta]);

  const statesByRep = useMemo(() => {
    const result: Record<RepId, string[]> = { brad: [], austin: [] };
    Object.values(STATE_CODES).forEach(({ repId, name }) => {
      if (!result[repId].includes(name)) {
        result[repId].push(name);
      }
    });
    return result;
  }, []);

  const selectedCounty = useMemo(() => {
    if (!selectedCountyId) return null;
    return countiesMeta.find((county) => county.id === selectedCountyId) ?? null;
  }, [countiesMeta, selectedCountyId]);

  const hoveredCounty = useMemo(() => {
    if (!hoveredCountyId) return null;
    return countiesMeta.find((county) => county.id === hoveredCountyId) ?? null;
  }, [countiesMeta, hoveredCountyId]);

  const activeCounty = selectedCounty ?? hoveredCounty;
  const activeRep = activeCounty
    ? REP_INFO[activeCounty.repId]
    : selectedCounty
      ? REP_INFO[selectedCounty.repId]
      : null;
  const selectedRep = selectedCounty ? REP_INFO[selectedCounty.repId] : null;

  const filteredSearchResults = useMemo(() => {
    if (!debouncedSearch) {
      return [];
    }

    const query = debouncedSearch.toLowerCase();

    return countiesMeta
      .filter((county) => county.served)
      .filter((county) => `${county.county}, ${county.state}`.toLowerCase().includes(query))
      .sort((a, b) => a.county.localeCompare(b.county))
      .slice(0, 12);
  }, [countiesMeta, debouncedSearch]);

  const filteredCountyList = useMemo(() => {
    if (!selectedCounty) {
      return [];
    }

    const repCounties = countiesByRep[selectedCounty.repId] ?? [];

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

      if (!county.served) {
        setSelectedCountyId(null);
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
      setViewState({ coordinates: center, zoom: 2.2 });
    },
    [countiesMeta, viewState]
  );

  const resetSelection = useCallback(() => {
    setSelectedCountyId(null);
    setHoveredCountyId(null);
    setCountyListFilter("");
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
            fill: "#E5E7EB",
            fillOpacity: 0.8,
            stroke: "#D1D5DB",
            strokeWidth: 0.6,
            outline: "none",
            transition: "fill-opacity 150ms ease, stroke-width 150ms ease",
          },
          hover: {
            fill: "#E2E8F0",
            fillOpacity: 0.85,
            stroke: "#CBD5F5",
            strokeWidth: 0.75,
            cursor: "not-allowed",
          },
          pressed: {
            fill: "#E2E8F0",
            fillOpacity: 0.85,
            stroke: "#CBD5F5",
            strokeWidth: 0.75,
          },
        };
      }

      const fillColor =
        colorMode === "rep"
          ? REP_COLORS[county.properties.repId]
          : STATE_COLORS[county.properties.state];
      const isSelected = county.properties.id === selectedCountyId;
      const isHovered = county.properties.id === hoveredCountyId;

      const opacity = isSelected ? 0.9 : isHovered ? 0.78 : 0.6;
      const strokeWidth = isSelected ? 1.8 : isHovered ? 1.4 : 0.75;
      const strokeColor = isSelected ? "#0B1C3F" : isHovered ? "#2F5C9C" : "#BFD3F2";

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
          stroke: "#0B1C3F",
          strokeWidth: 1.6,
          cursor: "pointer",
        },
        pressed: {
          fill: fillColor,
          fillOpacity: 0.88,
          stroke: "#0B1C3F",
          strokeWidth: 1.8,
        },
      };
    },
    [colorMode, hoveredCountyId, selectedCountyId]
  );

  const handleMapMouseMove = useCallback(
    (event: ReactMouseEvent<SVGPathElement, globalThis.MouseEvent>, county: CountyFeature) => {
      setTooltip({
        content: county.properties.served
          ? `${county.properties.county} County • ${county.properties.state} • ${
              REP_INFO[county.properties.repId].name
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
    [handleHoverCounty]
  );

  const handleMapMouseLeave = useCallback(() => {
    if (!selectedCountyId) {
      handleHoverCounty(null);
    } else {
      setHoveredCountyId(null);
    }
    setTooltip(null);
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

  const repOrder: RepId[] = ["brad", "austin"];

  const drawerContent = (
    <div className="space-y-6">
      <div className="rounded-xl border border-[#1C4E80]/15 bg-[#1C4E80]/5 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm font-semibold text-[#1C4E80]">Color by</span>
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
                  "rounded-full border-[#1C4E80]/30 px-3",
                  colorMode === item.value
                    ? "bg-[#1C4E80] text-white hover:bg-[#1C4E80]/90"
                    : "bg-white/70 text-[#1C4E80] hover:bg-[#1C4E80]/10"
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
              variant="outline"
              size="sm"
              onClick={() => handleStateChipClick(state.code)}
              aria-label={`Zoom to ${state.name}`}
              className="border-[#1C4E80]/20 bg-white/70 text-[#1C4E80] hover:bg-[#1C4E80]/10"
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
          <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1C4E80]" />
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search"
              className="absolute inset-y-0 right-8 flex items-center text-[#4986C8]"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </form>
        {debouncedSearch && filteredSearchResults.length > 0 && (
          <div className="mt-3 rounded-lg border border-[#1C4E80]/10 bg-white shadow-sm">
            <ul
              role="listbox"
              aria-label="County search results"
              className="max-h-64 overflow-y-auto"
            >
              {filteredSearchResults.map((county) => (
                <li key={county.id}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-3 py-2 text-left hover:bg-[#1C4E80]/5 focus:bg-[#1C4E80]/10 focus:outline-none"
                    onClick={() => {
                      handleSelectCounty(county.id);
                      setSearchQuery("");
                    }}
                    onMouseEnter={() => handleHoverCounty(county.id)}
                    onMouseLeave={() => handleHoverCounty(null)}
                    onFocus={() => handleHoverCounty(county.id)}
                    onBlur={() => handleHoverCounty(null)}
                  >
                    <span className="text-sm font-medium text-[#1C4E80]">
                      {county.county} County
                    </span>
                    <Badge variant="outline" className="border-[#1C4E80]/20 text-xs text-[#1C4E80]">
                      {county.state}
                    </Badge>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-[#1C4E80]">
            Representative coverage
          </h3>
          <p className="text-xs text-muted-foreground">
            Select a county or tap a card to explore territory details.
          </p>
        </div>
        <div className="space-y-3">
          {repOrder.map((repId) => {
            const rep = REP_INFO[repId];
            const isHighlighted = activeRep?.id === rep.id || selectedRep?.id === rep.id;
            const totalCounties = countiesByRep[repId]?.length ?? 0;
            const statesServed = statesByRep[repId].join(" • ");

            return (
              <div
                key={rep.id}
                className={clsx(
                  "flex items-start gap-3 rounded-xl border p-4 transition-colors",
                  isHighlighted
                    ? "border-[#1C4E80] bg-[#1C4E80]/5"
                    : "border-[#1C4E80]/10 bg-background"
                )}
              >
                {rep.photo ? (
                  <Image
                    src={rep.photo}
                    alt={rep.name}
                    width={56}
                    height={56}
                    className="h-14 w-14 flex-shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[#1C4E80]/10 text-base font-semibold text-[#1C4E80]">
                    {rep.name.slice(0, 1)}
                  </div>
                )}
                <div className="flex-1 space-y-2">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-[#1C4E80]">{rep.name}</p>
                      <Badge
                        variant="outline"
                        className="border-[#1C4E80]/20 text-xs text-[#1C4E80]"
                      >
                        {totalCounties ? `${totalCounties} counties` : "Loading counties"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Serving {statesServed}</p>
                  </div>
                  <div className="flex flex-col gap-1 text-xs text-[#1C4E80]">
                    <a
                      href={`mailto:${rep.email}`}
                      className="inline-flex items-center gap-1 hover:underline"
                    >
                      <Mail className="h-3.5 w-3.5" /> {rep.email}
                    </a>
                    <a
                      href={`tel:${rep.phone}`}
                      className="inline-flex items-center gap-1 hover:underline"
                    >
                      <Phone className="h-3.5 w-3.5" /> {rep.phone}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedCounty && (
        <div className="space-y-4 rounded-xl border border-[#1C4E80]/20 bg-white p-4 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-[#1C4E80]">
                  {selectedCounty.county} County
                </h3>
                <Badge variant="outline" className="border-[#1C4E80]/20 text-xs text-[#1C4E80]">
                  {selectedCounty.state}
                </Badge>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{selectedCounty.stateName}</p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-[#1C4E80] hover:bg-[#1C4E80]/10"
              onClick={resetSelection}
            >
              <RefreshCcw className="mr-2 h-4 w-4" /> Reset
            </Button>
          </div>

          <details className="rounded-lg border border-dashed border-[#1C4E80]/20 bg-[#1C4E80]/5 text-sm text-[#1C4E80]">
            <summary className="flex cursor-pointer items-center justify-between px-3 py-2 font-medium">
              Counties served by this representative
              <span className="text-xs text-[#1C4E80]/80">
                {(countiesByRep[selectedCounty.repId] ?? []).length}
              </span>
            </summary>
            <div className="border-t border-[#1C4E80]/10">
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
                    : (countiesByRep[selectedCounty.repId] ?? [])
                  ).map((county) => (
                    <button
                      key={county.id}
                      type="button"
                      className={clsx(
                        "flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-sm text-slate-700 hover:bg-[#1C4E80]/10 focus:bg-[#1C4E80]/10 focus:outline-none",
                        county.id === selectedCountyId ? "bg-[#1C4E80]/15" : ""
                      )}
                      onClick={() => handleSelectCounty(county.id, { animate: false })}
                      onMouseEnter={() => handleHoverCounty(county.id)}
                      onMouseLeave={() => handleHoverCounty(null)}
                      onFocus={() => handleHoverCounty(county.id)}
                      onBlur={() => handleHoverCounty(null)}
                    >
                      <span>{county.county} County</span>
                      <Badge
                        variant="outline"
                        className="border-[#1C4E80]/20 text-xs text-[#1C4E80]"
                      >
                        {county.state}
                      </Badge>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </details>
        </div>
      )}
    </div>
  );

  return (
    <section ref={containerRef} className="relative py-16">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="mb-10 max-w-2xl">
          <Badge variant="outline" className="border-[#1C4E80]/30 text-[#1C4E80]">
            Interactive Coverage
          </Badge>
          <h2 className="mt-3 text-3xl font-bold text-[#1C4E80] md:text-4xl">
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
                  zoomSensitivity={0.6}
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
                </ZoomableGroup>
              </ComposableMap>

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
              </div>

              {tooltip && (
                <div
                  className="pointer-events-none fixed z-50 rounded-md border border-[#1C4E80]/40 bg-[#1C4E80] px-3 py-1 text-xs font-medium text-white shadow-lg"
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
