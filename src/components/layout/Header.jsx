import { IconMenu } from "./icons";

export function Header({ user, onMenu }) {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="rounded-lg p-2 text-navy-800 hover:bg-navy-50 lg:hidden"
          onClick={onMenu}
          aria-label="Open navigation"
        >
          <IconMenu />
        </button>
        <div>
          <p className="text-sm font-semibold text-navy-900">{user?.name}</p>
          <p className="text-xs text-slate-500">
            {user?.title}
            {user?.department ? ` · ${user.department}` : ""}
          </p>
        </div>
      </div>
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-900 text-sm font-semibold text-gold-500">
        {user?.name
          ?.split(" ")
          .slice(0, 2)
          .map((part) => part[0])
          .join("")}
      </div>
    </header>
  );
}
