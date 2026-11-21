import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Mount children only once the placeholder nears the viewport.
 * Mirrors jessetek.net’s IntersectionObserver (rootMargin ~500px) so heavy
 * MapLibre work doesn’t compete with the first paint.
 */
export function WhenVisible({
  children,
  rootMargin = "500px 0px",
  className = "",
  minHeight,
  fallback = null,
}: {
  children: ReactNode;
  rootMargin?: string;
  className?: string;
  minHeight?: number | string;
  fallback?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || show) return;
    if (!("IntersectionObserver" in window)) {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, show]);

  return (
    <div
      ref={ref}
      className={className}
      style={minHeight != null ? { minHeight } : undefined}
    >
      {show ? children : fallback}
    </div>
  );
}
