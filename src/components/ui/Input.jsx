export function Input({ label, error, hint, className = "", id, ...props }) {
  const inputId = id ?? props.name;

  return (
    <label className="block" htmlFor={inputId}>
      {label ? (
        <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
      ) : null}
      <input
        id={inputId}
        className={`h-11 w-full rounded-lg border bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-navy-700 focus:ring-2 focus:ring-navy-700/15 ${
          error ? "border-red-400 focus:border-red-500 focus:ring-red-500/15" : "border-slate-200"
        } ${className}`}
        {...props}
      />
      {error ? <span className="mt-1 block text-xs text-red-600">{error}</span> : null}
      {!error && hint ? <span className="mt-1 block text-xs text-slate-500">{hint}</span> : null}
    </label>
  );
}

export function FileInput({ label, fileName, onChange }) {
  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
      <label className="flex cursor-pointer flex-col items-start gap-2 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-4 text-sm hover:border-navy-700 hover:bg-navy-50">
        <span className="font-medium text-navy-800">Choose certificate file</span>
        <span className="text-slate-500">
          {fileName || "No file selected. PDF or image, frontend-only preview."}
        </span>
        <input type="file" className="sr-only" accept=".pdf,image/*" onChange={onChange} />
      </label>
    </div>
  );
}
