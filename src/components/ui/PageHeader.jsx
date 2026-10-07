export function PageHeader({ eyebrow, title, description }) {
  return (
    <div className="mb-6">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold-600">{eyebrow}</p>
      ) : null}
      <h1 className="mt-1 font-serif text-2xl text-navy-900 sm:text-3xl">{title}</h1>
      {description ? <p className="mt-2 max-w-2xl text-sm text-slate-500">{description}</p> : null}
    </div>
  );
}
