import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/** Light fade on route change — keeps motion budget calm. */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(false);
    const id = requestAnimationFrame(() => setShow(true));
    return () => cancelAnimationFrame(id);
  }, [location.pathname]);

  return (
    <div
      key={location.pathname}
      className={`transition-opacity duration-500 ease-out ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
}
