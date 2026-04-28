import { Link, useLocation, useNavigate } from "react-router-dom";
import { Moon, Sun, LogOut, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

const Logo = () => (
  <Link to="/" className="flex items-center gap-2 group">
    <img src={logo} alt="BunkSense logo" className="w-8 h-8 rounded-lg object-cover" />
    <span className="font-semibold tracking-tight text-[15px]">BunkSense</span>
  </Link>
);

export const Navbar = () => {
  const { theme, toggle } = useTheme();
  const { user, signOut } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const onApp = loc.pathname.startsWith("/app");

  const links = onApp
    ? [
        { to: "/app", label: "Dashboard", end: true },
        { to: "/app/subjects", label: "Subjects" },
        { to: "/app/simulator", label: "Simulator" },
        { to: "/app/planner", label: "Planner" },
        { to: "/app/analytics", label: "Analytics" },
      ]
    : [
        { to: "/features", label: "Features" },
        { to: "/how-it-works", label: "How it works" },
        { to: "/faq", label: "FAQ" },
      ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="container flex h-14 items-center justify-between gap-6">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => {
              const active = l.end ? loc.pathname === l.to : loc.pathname.startsWith(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={cn(
                    "px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors",
                    active && "text-foreground bg-secondary",
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          {user ? (
            <>
              {!onApp && (
                <Button size="sm" onClick={() => nav("/app")}>Open app</Button>
              )}
              <Button variant="ghost" size="icon" onClick={async () => { await signOut(); nav("/"); }} aria-label="Sign out">
                <LogOut className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => nav("/auth")}>Sign in</Button>
              <Button size="sm" onClick={() => nav("/auth?mode=signup")} className="gap-1.5">
                <Sparkles className="h-3.5 w-3.5" /> Get started
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
