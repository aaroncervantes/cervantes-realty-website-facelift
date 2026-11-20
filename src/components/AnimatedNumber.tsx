import { useEffect, useRef, useState } from "react";

export function AnimatedNumber({
  value,
  suffix = "",
}: {
  value: number;
  suffix?: string;
}) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      const start = performance.now();
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / 900);
        setN(Math.round(value * p));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      io.disconnect();
    });
    io.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [value]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}
