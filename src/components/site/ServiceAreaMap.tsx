import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import maplibregl, { type Map, type MapGeoJSONFeature } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  countyShort,
  loadServiceAreas,
  plainCity,
  type ServiceAreaCollection,
  type ServiceAreaFeature,
} from "@/lib/serviceAreas";

const STYLE_URL = "https://tiles.openfreemap.org/styles/positron";

/** Apple Maps light cartography — deeper, punchier water + greens. */
const LAND = "#F6F1E6";
const WATER = "#5BA3D0";
const PARK = "#A8C98A";
const WOOD = "#9BBF7C";
const ROAD = "#FFFFFF";
const ROAD_EDGE = "#D5CFC0";
const HIGHWAY = "#FFD966";
const HIGHWAY_EDGE = "#E8C14A";
const BUILDING = "#EFE9DD";
const INK = "#1a1a1a";
const MUTE = "#594F3F";
const WATER_LABEL = "#2F6F96";

type Mode = "home" | "page";

function restyle(
  style: maplibregl.StyleSpecification,
  names: string[],
): maplibregl.StyleSpecification {
  // Match jessetek restyle: paint key must match layer type or MapLibre aborts
  // with "unknown property line-color" and never fires `load`.
  const keep: maplibregl.LayerSpecification[] = [];
  for (const layer of style.layers || []) {
    const id = layer.id;
    if (
      /^(boundary_|railway|aeroway|highway-shield|road_shield|highway-name-path|highway-name-minor|waterway_line_label|label_other|label_village|tunnel_)/.test(
        id,
      )
    ) {
      continue;
    }
    const paint = { ...(layer.paint || {}) } as Record<string, unknown>;
    const next = { ...layer, paint } as maplibregl.LayerSpecification;
    const colorKey =
      layer.type === "fill"
        ? "fill-color"
        : layer.type === "line"
          ? "line-color"
          : null;

    if (layer.type === "background") {
      paint["background-color"] = LAND;
    } else if (id === "water" && colorKey) {
      paint[colorKey] = WATER;
    } else if (id === "waterway" && colorKey) {
      paint[colorKey] = WATER;
    } else if (id === "park" && layer.type === "fill") {
      paint["fill-color"] = PARK;
      paint["fill-opacity"] = 1;
    } else if (
      layer.type === "fill" &&
      /^(landcover_wood|landcover_grass|landuse_cemetery|landuse_pitch)/.test(id)
    ) {
      paint["fill-color"] = WOOD;
      paint["fill-opacity"] = 1;
    } else if (
      layer.type === "fill" &&
      /^(building|landuse_residential|landuse_commercial|landuse_industrial)/.test(
        id,
      )
    ) {
      paint["fill-color"] = BUILDING;
      paint["fill-opacity"] = id.startsWith("building") ? 0.9 : 0.55;
      if (id.startsWith("building") && "fill-outline-color" in (layer.paint || {})) {
        paint["fill-outline-color"] = ROAD_EDGE;
      }
    } else if (colorKey && /^highway_motorway.*casing$/.test(id)) {
      paint[colorKey] = HIGHWAY_EDGE;
    } else if (colorKey && /^highway_motorway/.test(id)) {
      paint[colorKey] = HIGHWAY;
    } else if (
      colorKey &&
      /^highway_(trunk|primary).*casing$/.test(id)
    ) {
      paint[colorKey] = ROAD_EDGE;
    } else if (colorKey && /^highway_(trunk|primary)/.test(id)) {
      paint[colorKey] = "#FBF1C4";
    } else if (colorKey && /^highway_major_casing$/.test(id)) {
      paint[colorKey] = ROAD_EDGE;
    } else if (
      colorKey &&
      (/^highway_(major|minor|path)/.test(id) || /^road_/.test(id))
    ) {
      paint[colorKey] = ROAD;
    } else if (layer.type === "symbol") {
      const waterish = /water/.test(id);
      paint["text-color"] = waterish ? WATER_LABEL : MUTE;
      paint["text-halo-color"] = waterish ? WATER : LAND;
      paint["text-halo-width"] = 1.4;
      if (/^label_(city|town)/.test(id)) {
        const hideOurs: maplibregl.FilterSpecification = [
          "!",
          ["in", ["get", "name"], ["literal", names]],
        ];
        const existing = (layer as { filter?: maplibregl.FilterSpecification })
          .filter;
        (next as { filter?: maplibregl.FilterSpecification }).filter = existing
          ? (["all", existing, hideOurs] as maplibregl.FilterSpecification)
          : hideOurs;
      }
    }
    keep.push(next);
  }
  return { ...style, layers: keep };
}

export function ServiceAreaMap({
  mode = "home",
  className = "",
}: {
  mode?: Mode;
  className?: string;
}) {
  const navigate = useNavigate();
  const mapHost = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  const dataRef = useRef<ServiceAreaCollection | null>(null);
  const bySlugRef = useRef<Record<string, ServiceAreaFeature>>({});
  const activeRef = useRef<ServiceAreaFeature | null>(null);
  const touchRef = useRef(false);

  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [active, setActiveState] = useState<ServiceAreaFeature | null>(null);
  const [query, setQuery] = useState("");
  const [credit, setCredit] = useState("");

  const sorted = useMemo(() => {
    const feats = dataRef.current?.features || [];
    return [...feats].sort((a, b) =>
      a.properties.name.localeCompare(b.properties.name),
    );
  }, [ready]);

  const filtered = useMemo(() => {
    const q = plainCity(query);
    if (!q) return sorted;
    return sorted.filter((f) => plainCity(f.properties.name).includes(q));
  }, [sorted, query]);

  useEffect(() => {
    touchRef.current = !!(
      window.matchMedia && window.matchMedia("(hover: none)").matches
    );
  }, []);

  useEffect(() => {
    let cancelled = false;
    let map: Map | null = null;

    async function boot() {
      if (!mapHost.current) return;
      try {
        const [data, style] = await Promise.all([
          loadServiceAreas(),
          fetch(STYLE_URL).then((r) => r.json()),
        ]);
        if (cancelled || !mapHost.current) return;

        dataRef.current = data;
        const bySlug: Record<string, ServiceAreaFeature> = {};
        data.features.forEach((f) => {
          bySlug[f.properties.slug] = f;
        });
        bySlugRef.current = bySlug;
        setCredit(data.credit || "");

        const names = data.features.map((f) => f.properties.name);
        const FR = data.frame;
        const bounds = new maplibregl.LngLatBounds(
          [FR[0], FR[1]],
          [FR[2], FR[3]],
        );
        const limit: [[number, number], [number, number]] = [
          [FR[0] - 0.012, FR[1] - 0.01],
          [FR[2] + 0.012, FR[3] + 0.01],
        ];

        map = new maplibregl.Map({
          container: mapHost.current,
          style: restyle(style, names),
          bounds,
          fitBoundsOptions: { padding: 0 },
          minZoom: 7.2,
          maxZoom: 14.5,
          maxBounds: limit,
          dragRotate: false,
          pitchWithRotate: false,
          touchPitch: false,
          attributionControl: false,
          cooperativeGestures: true,
          fadeDuration: 150,
        });
        map.touchZoomRotate.disableRotation();
        map.keyboard.disableRotation();
        mapRef.current = map;

        map.on("error", (e) => {
          console.error("service-area map error", e?.error || e);
          if (!cancelled) setFailed(true);
        });

        const setActive = (f: ServiceAreaFeature | null) => {
          const m = mapRef.current;
          if (!m) return;
          if (activeRef.current && (!f || f.id !== activeRef.current.id)) {
            m.setFeatureState(
              { source: "cities", id: activeRef.current.id },
              { on: false },
            );
          }
          activeRef.current = f;
          setActiveState(f);
          if (f) {
            m.setFeatureState({ source: "cities", id: f.id }, { on: true });
            m.getCanvas().style.cursor = "pointer";
          } else if (m.getCanvas()) {
            m.getCanvas().style.cursor = "";
          }
        };

        const cityBounds = (f: ServiceAreaFeature) => {
          const b = f.properties.bbox;
          return [
            [b[0], b[1]],
            [b[2], b[3]],
          ] as [[number, number], [number, number]];
        };

        const goTo = (f: ServiceAreaFeature) => {
          const m = mapRef.current;
          if (!m) return;
          const w = mapHost.current?.clientWidth || 600;
          const side = Math.round(w * 0.16);
          m.fitBounds(cityBounds(f), {
            padding: {
              top: 70,
              bottom: 120,
              left: Math.max(40, side),
              right: Math.max(40, side),
            },
            maxZoom: 12.6,
            duration: 900,
          });
          setActive(f);
        };

        // Expose helpers for sidebar
        (mapHost.current as HTMLElement & { _goTo?: typeof goTo })._goTo = goTo;
        (
          mapHost.current as HTMLElement & { _fitAll?: () => void }
        )._fitAll = () => {
          setActive(null);
          map?.fitBounds(bounds, { padding: 0, duration: 700 });
        };
        (
          mapHost.current as HTMLElement & {
            _setActive?: typeof setActive;
          }
        )._setActive = setActive;

        map.on("load", () => {
          if (!map) return;
          map.addSource("cities", {
            type: "geojson",
            data: data as unknown as GeoJSON.FeatureCollection,
          });

          const first = map.getLayer("water") ? "water" : undefined;
          const firstLabel = map
            .getStyle()
            .layers?.find((l) => l.type === "symbol")?.id;

          map.addLayer(
            {
              id: "city-fill",
              type: "fill",
              source: "cities",
              paint: {
                "fill-color": [
                  "case",
                  ["boolean", ["feature-state", "on"], false],
                  ["get", "color"],
                  "#FFFFFF",
                ],
                "fill-opacity": [
                  "case",
                  ["boolean", ["feature-state", "on"], false],
                  0.88,
                  0.55,
                ],
              },
            },
            first,
          );

          const linePaint = {
            "line-color": INK,
            "line-opacity": [
              "case",
              ["boolean", ["feature-state", "on"], false],
              0.9,
              0.16,
            ],
            "line-width": [
              "case",
              ["boolean", ["feature-state", "on"], false],
              2.2,
              1,
            ],
          } as maplibregl.LineLayerSpecification["paint"];

          map.addLayer(
            {
              id: "city-line-coast",
              type: "line",
              source: "cities",
              filter: ["==", ["get", "coastal"], true],
              layout: { "line-join": "round" },
              paint: linePaint,
            },
            first,
          );
          map.addLayer(
            {
              id: "city-line",
              type: "line",
              source: "cities",
              filter: ["!=", ["get", "coastal"], true],
              layout: { "line-join": "round" },
              paint: linePaint,
            },
            firstLabel,
          );

          map.addSource("city-labels", {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: data.features.map((f) => ({
                type: "Feature" as const,
                id: f.id,
                properties: {
                  slug: f.properties.slug,
                  name: f.properties.name,
                  rank: -(f.properties.pop || 0),
                  anchor: f.properties.anchor || "center",
                },
                geometry: {
                  type: "Point" as const,
                  coordinates: f.properties.center,
                },
              })),
            },
          });

          map.addLayer({
            id: "city-name",
            type: "symbol",
            source: "city-labels",
            layout: {
              "text-field": ["get", "name"],
              "text-font": ["Noto Sans Bold"],
              "text-size": [
                "interpolate",
                ["linear"],
                ["zoom"],
                8,
                10.5,
                11,
                13.5,
                13,
                17,
              ],
              "symbol-sort-key": ["get", "rank"],
              "text-padding": 6,
              "text-max-width": 7,
              "text-letter-spacing": 0.01,
              "text-anchor": ["get", "anchor"],
              "text-justify": "auto",
            },
            paint: {
              "text-color": INK,
              "text-halo-color": "rgba(255,255,255,.92)",
              "text-halo-width": 1.6,
            },
          });

          map.on("mousemove", "city-fill", (e) => {
            if (touchRef.current || !e.features?.length) return;
            const slug = e.features[0].properties?.slug as string;
            setActive(bySlugRef.current[slug] || null);
          });
          map.on("mouseleave", "city-fill", () => {
            if (!touchRef.current) setActive(null);
          });

          const pick = (pt: maplibregl.Point) => {
            const hit = map!.queryRenderedFeatures(pt, {
              layers: ["city-fill"],
            })[0] as MapGeoJSONFeature | undefined;
            if (hit?.properties?.slug) {
              return bySlugRef.current[hit.properties.slug as string];
            }
            const lab = map!.queryRenderedFeatures(pt, {
              layers: ["city-name"],
            })[0];
            if (lab?.properties?.slug) {
              return bySlugRef.current[lab.properties.slug as string];
            }
            if (!touchRef.current) return null;
            const near = map!.queryRenderedFeatures(
              [
                [pt.x - 22, pt.y - 22],
                [pt.x + 22, pt.y + 22],
              ] as [[number, number], [number, number]],
              { layers: ["city-fill"] },
            );
            return near[0]?.properties?.slug
              ? bySlugRef.current[near[0].properties.slug as string]
              : null;
          };

          map.on("click", (e) => {
            const f = pick(e.point);
            if (!f) {
              setActive(null);
              return;
            }
            if (
              !touchRef.current ||
              (activeRef.current && activeRef.current.id === f.id)
            ) {
              navigate(f.properties.url);
              return;
            }
            if (touchRef.current && map!.getZoom() < 10.2) goTo(f);
            else setActive(f);
          });

          map.resize();
          setReady(true);
        });
      } catch (err) {
        console.error("service-area map boot failed", err);
        if (!cancelled) setFailed(true);
      }
    }

    void boot();
    return () => {
      cancelled = true;
      map?.remove();
      mapRef.current = null;
    };
  }, [navigate]);

  // Sidebar search → fly to city
  useEffect(() => {
    if (!ready || !mapHost.current) return;
    const host = mapHost.current as HTMLElement & {
      _goTo?: (f: ServiceAreaFeature) => void;
      _fitAll?: () => void;
    };
    const q = plainCity(query);
    const t = window.setTimeout(() => {
      if (!q) {
        host._fitAll?.();
        return;
      }
      const exact = filtered.filter(
        (f) => plainCity(f.properties.name) === q,
      );
      const starts = filtered.filter((f) =>
        plainCity(f.properties.name).startsWith(q),
      );
      const hit = exact[0] || (starts.length === 1 ? starts[0] : null);
      if (hit) host._goTo?.(hit);
    }, 280);
    return () => clearTimeout(t);
  }, [query, filtered, ready]);

  const openGuide = (f: ServiceAreaFeature) => navigate(f.properties.url);

  const onRowEnter = (f: ServiceAreaFeature) => {
    if (touchRef.current) return;
    (
      mapHost.current as HTMLElement & {
        _setActive?: (f: ServiceAreaFeature | null) => void;
      }
    )?._setActive?.(f);
  };

  const zoom = (dir: "in" | "out") => {
    const m = mapRef.current;
    if (!m) return;
    if (dir === "in") m.zoomIn({ duration: 320 });
    else m.zoomOut({ duration: 320 });
  };

  const fitAll = () => {
    (
      mapHost.current as HTMLElement & { _fitAll?: () => void }
    )?._fitAll?.();
  };

  return (
    <div
      className={`svc-wrap ${mode === "page" ? "svc-wrap-page" : ""} ${className}`}
    >
      <div
        className={`svc-map ${mode === "home" ? "svc-map-main" : "svc-map-page"} ${
          ready ? "ready" : ""
        } ${failed ? "failed" : ""}`}
        aria-label="Interactive map of Southern California service areas"
      >
        <div ref={mapHost} className="svc-canvas" />
        <div className="svc-ctrl" role="group" aria-label="Map zoom">
          <button
            type="button"
            className="svc-btn"
            aria-label="Zoom in"
            onClick={() => zoom("in")}
          >
            +
          </button>
          <button
            type="button"
            className="svc-btn"
            aria-label="Zoom out"
            onClick={() => zoom("out")}
          >
            −
          </button>
        </div>
        <button
          type="button"
          className="svc-btn svc-home"
          aria-label="Show the whole service area"
          title="Whole service area"
          onClick={fitAll}
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            aria-hidden="true"
          >
            <path
              d="M20.5 3.5 3.8 10.3c-.6.25-.55 1.1.07 1.28l6.3 1.85 1.85 6.3c.18.62 1.03.67 1.28.07L20.5 3.5Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {active ? (
          <Link
            to={active.properties.url}
            className="svc-card"
            aria-label={`Open the ${active.properties.name} guide`}
          >
            <span
              className="svc-card-swatch"
              style={{ background: active.properties.color }}
            />
            <span className="svc-card-body">
              <span className="svc-card-name">{active.properties.name}</span>
              <span className="svc-card-meta">
                {[
                  active.properties.kind === "cdp"
                    ? `Unincorporated ${active.properties.county}`
                    : active.properties.county,
                  active.properties.value,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </span>
            </span>
            <span className="svc-card-go">
              Open guide <i aria-hidden="true">→</i>
            </span>
          </Link>
        ) : (
          <div className="svc-hint">
            {touchRef.current ? "Tap a city" : "Pick a city"}
          </div>
        )}

        {credit && (
          <div className="svc-credit">
            {credit} · Map: OpenFreeMap © OpenMapTiles, OpenStreetMap
          </div>
        )}
      </div>

      <aside className="svc-side" aria-label="Cities on the map">
        <div className="svc-side-head">
          <div className="svc-side-title">
            <span>{sorted.length || "—"}</span> cities on the map
          </div>
          <input
            type="search"
            className="svc-side-search"
            placeholder="Find a city"
            autoComplete="off"
            aria-label="Find a city on the map"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key !== "Enter" || !filtered[0]) return;
              openGuide(filtered[0]);
            }}
          />
        </div>
        <div className="svc-side-list" role="list">
          {filtered.map((f) => (
            <button
              key={f.properties.slug}
              type="button"
              role="listitem"
              className={`svc-side-row ${
                active?.properties.slug === f.properties.slug ? "on" : ""
              }`}
              onMouseEnter={() => onRowEnter(f)}
              onFocus={() => onRowEnter(f)}
              onClick={() => openGuide(f)}
            >
              <i style={{ background: f.properties.color }} />
              <span>{f.properties.name}</span>
              <em>{countyShort(f.properties.county)}</em>
            </button>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="svc-side-empty">No city by that name on the map.</div>
        )}
      </aside>
    </div>
  );
}
