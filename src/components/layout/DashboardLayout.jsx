import { useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function DashboardLayout({ role }) {
  const { user, logout } = useApp();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== role) {
    return <Navigate to={user.role === "student" ? "/student" : "/faculty"} replace />;
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[260px_1fr]">
      <div className="hidden lg:block">
        <div className="sticky top-0 h-screen">
          <Sidebar role={role} onLogout={handleLogout} />
        </div>
      </div>
      {open ? (
        <div className="fixed inset-0 z-30 lg:hidden">
          <button className="absolute inset-0 bg-navy-950/40" onClick={() => setOpen(false)} aria-label="Close menu" />
          <div className="relative h-full w-72 max-w-[80vw]">
            <Sidebar role={role} onLogout={handleLogout} onNavigate={() => setOpen(false)} />
          </div>
        </div>
      ) : null}
      <div className="flex min-w-0 flex-col">
        <Header user={user} onMenu={() => setOpen(true)} />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
