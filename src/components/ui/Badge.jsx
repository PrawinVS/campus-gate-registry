const tones = {
  Pending: "bg-amber-50 text-amber-800 ring-amber-200",
  Verified: "bg-emerald-50 text-emerald-800 ring-emerald-200",
  Rejected: "bg-red-50 text-red-700 ring-red-200",
  default: "bg-slate-100 text-slate-700 ring-slate-200",
};

export function Badge({ children, tone }) {
  const className = tones[tone] ?? tones.default;
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${className}`}>
      {children}
    </span>
  );
}
