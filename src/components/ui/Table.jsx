export function Table({ columns, children, empty, loading }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-separate border-spacing-0 text-left text-sm">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                className="border-b border-slate-200 bg-navy-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-navy-800"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-10 text-center text-slate-500">
                Loading records…
              </td>
            </tr>
          ) : null}
          {!loading && empty ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-10 text-center text-slate-500">
                {empty}
              </td>
            </tr>
          ) : null}
          {!loading && !empty ? children : null}
        </tbody>
      </table>
    </div>
  );
}

export function Td({ children, className = "" }) {
  return <td className={`border-b border-slate-100 px-4 py-3 align-middle ${className}`}>{children}</td>;
}
