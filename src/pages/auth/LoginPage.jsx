import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { useApp } from "../../context/AppContext";
import { ROLES } from "../../data/constants";

export function LoginPage() {
  const { user, login } = useApp();
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(ROLES.FACULTY);

  if (user) {
    return <Navigate to={user.role === ROLES.STUDENT ? "/student" : "/faculty"} replace />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextRole = login(role, identifier);
    navigate(nextRole === ROLES.STUDENT ? "/student" : "/faculty");
  };

  return (
    <div className="min-h-screen bg-navy-950 px-4 py-10">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-navy-900 shadow-2xl lg:grid-cols-[1.1fr_0.9fr]">
        <div className="hidden flex-col justify-between bg-[linear-gradient(160deg,#0f2744,#163a5f_55%,#0b1c31)] p-10 text-white lg:flex">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold-500">College ERP</p>
            <h1 className="mt-4 font-serif text-4xl leading-tight">Campus Gate Academic Management</h1>
            <p className="mt-4 max-w-sm text-sm text-slate-300">
              Faculty mark entry, assessment records, and NPTEL certificate workflows in one academic office dashboard.
            </p>
          </div>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>Regular assessment mark entry</li>
            <li>NPTEL certificate verification</li>
            <li>Student academic snapshot</li>
          </ul>
        </div>
        <div className="bg-white p-6 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-600">Sign in</p>
          <h2 className="mt-2 font-serif text-2xl text-navy-900">Academic portal</h2>
          <p className="mt-2 text-sm text-slate-500">Prototype login. No authentication server is used yet.</p>
          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <Input
              label="Email / Username"
              name="identifier"
              autoComplete="username"
              placeholder="faculty@college.edu"
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
            />
            <Input
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <div>
              <span className="mb-1.5 block text-sm font-medium text-slate-700">Continue as</span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: ROLES.FACULTY, label: "Faculty" },
                  { value: ROLES.STUDENT, label: "Student" },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setRole(option.value)}
                    className={`h-11 rounded-lg border text-sm font-medium ${
                      role === option.value
                        ? "border-navy-900 bg-navy-900 text-white"
                        : "border-slate-200 bg-white text-slate-600"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
            <Button type="submit" className="w-full" size="lg">
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
