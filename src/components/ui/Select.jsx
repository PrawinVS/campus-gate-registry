export function Select({ label, options, value, onChange, placeholder = "Select", id, name }) {
  const selectId = id ?? name;

  return (
    <label className="block" htmlFor={selectId}>
      {label ? (
        <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
      ) : null}
      <select
        id={selectId}
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-navy-700 focus:ring-2 focus:ring-navy-700/15"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
