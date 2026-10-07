import { NavLink } from "react-router-dom";
import { ROLES } from "../../data/constants";
import { IconCertificate, IconDashboard, IconLogout, IconMarks } from "./icons";

const facultyLinks = [
  { to: "/faculty", label: "Dashboard", icon: IconDashboard, end: true },
  { to: "/faculty/marks", label: "Mark Entry", icon: IconMarks },
  { to: "/faculty/nptel", label: "NPTEL Verification", icon: IconCertificate },
];

const studentLinks = [
  { to: "/student", label: "Dashboard", icon: IconDashboard, end: true },
  { to: "/student/marks", label: "My Assessment Marks", icon: IconMarks },
  { to: "/student/nptel", label: "NPTEL Certification", icon: IconCertificate },
];

export function Sidebar({ role, onLogout, onNavigate }) {
  const links = role === ROLES.STUDENT ? studentLinks : facultyLinks;

  return (
    <aside className="flex h-full flex-col bg-navy-900 text-navy-100">
      <div className="border-b border-white/10 px-5 py-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">Campus Gate</p>
        <p className="mt-1 font-serif text-lg text-white">Academic Office</p>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon />
              {link.label}
            </NavLink>
          );
        })}
      </nav>
      <div className="p-3">
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white"
        >
          <IconLogout />
          Sign out
        </button>
      </div>
    </aside>
  );
}
