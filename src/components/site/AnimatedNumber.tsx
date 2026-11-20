import { useEffect, useState } from "react";

export function AnimatedNumber({
  end,
  suffix = "",
}: {
  end: number;
  suffix?: string;
}) {
  const [value, setValue] = useState(1);
  const [node, setNode] = useState<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!node) return;
    let interval: ReturnType<typeof setInterval> | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let current = 1;
          const stepMs = Math.max(10, Math.floor(2000 / end));
          interval = setInterval(() => {
            current += 1;
            if (current >= end) {
              setValue(end);
              clearInterval(interval);
            } else {
              setValue(current);
            }
          }, stepMs);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      if (interval) clearInterval(interval);
    };
  }, [node, end]);

  return (
    <span ref={setNode}>
      {value}
      {suffix}
    </span>
  );
}
