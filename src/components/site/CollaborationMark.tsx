export function CollaborationMark({
  className = "",
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  if (compact) {
    return (
      <p
        className={`text-[10px] uppercase tracking-widest text-[#c9a84c] font-bold ${className}`}
      >
        Cervantes Realty × SoCal’s New Homes
      </p>
    );
  }

  return (
    <div className={className}>
      <p className="text-[10px] uppercase tracking-[0.2em] text-[#c9a84c] font-bold mb-1">
        An exclusive collaboration
      </p>
      <p className="font-serif text-sm md:text-base text-[#1a1a1a]/80 tracking-wide">
        CERVANTES REALTY × SOCAL’S NEW HOMES
      </p>
    </div>
  );
}
