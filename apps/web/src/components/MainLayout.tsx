"use client";

import {
  Archive,
  BadgeEuro,
  Headphones,
  Home as HomeIcon,
  List,
  Lock,
  Mail,
  MessageCircle,
  PlayCircle,
  Search,
  Star,
  Timer,
  Users,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

type NavLink = {
  label: string;
  icon: LucideIcon;
  href: string;
  notify?: boolean;
  locked?: boolean;
  children?: string[];
};

const primaryNav: NavLink[] = [
  { label: "Home", icon: HomeIcon, href: "/" },
  { label: "Feed", icon: List, href: "/feed" },
  { label: "Video", icon: PlayCircle, href: "/video" },
  { label: "Podcast", icon: Headphones, href: "/podcast", notify: true },
  { label: "Articoli", icon: Timer, href: "/articoli" },
  {
    label: "Newsletter",
    icon: Mail,
    href: "/newsletter",
    locked: true,
    children: ["Capibara Insider", "Deep Dive"],
  },
  { label: "Contenuti Extra", icon: Star, href: "/", locked: true },
  { label: "Archivio", icon: Archive, href: "/archivio" },
];

const utilityNav: NavLink[] = [
  { label: "Partner", icon: Users, href: "/partner" },
  { label: "Abbonamenti", icon: BadgeEuro, href: "/abbonamenti" },
  { label: "Messaggi", icon: MessageCircle, href: "/", notify: true },
];

const NavGroup = ({
  title,
  links,
  currentPath,
}: {
  title?: string;
  links: NavLink[];
  currentPath: string;
}) => (
  <div className="space-y-1">
    {title && (
      <p className="px-3 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
        {title}
      </p>
    )}
    {links.map((item) => {
      const isActive = currentPath === item.href;
      return (
        <Link
          key={item.label}
          href={item.href}
          className={`flex flex-col rounded-2xl px-3 py-2 text-sm transition ${
            isActive
              ? "bg-white/10 text-white"
              : "text-zinc-300 hover:bg-white/5"
          }`}
        >
          <div className="flex items-center gap-3">
            <item.icon
              className={`h-4 w-4 ${isActive ? "text-white" : "text-zinc-500"}`}
            />
            <span className="flex-1">{item.label}</span>
            {item.locked && (
              <span className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-white/70">
                <Lock className="h-3 w-3" />
                Solo membri
              </span>
            )}
            {item.notify && (
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            )}
          </div>
          {item.children && (
            <div className="mt-2 space-y-1 border-l border-white/10 pl-5 text-xs text-zinc-500">
              {item.children.map((child) => (
                <div key={child}>{child}</div>
              ))}
            </div>
          )}
        </Link>
      );
    })}
  </div>
);

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className="flex min-h-screen bg-[#050505] text-white">
      <aside className="sticky top-0 hidden h-screen w-72 flex-shrink-0 flex-col border-r border-white/5 bg-black/40 px-4 py-6 lg:flex">
        <Link href="/" className="flex items-center justify-between px-3">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
              Capibara
            </p>
            <p className="text-2xl font-semibold">Media β</p>
          </div>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-zinc-300">
            Auto
          </span>
        </Link>
        <div className="mt-8 flex-1 space-y-8 overflow-y-auto">
          <NavGroup links={primaryNav} currentPath={pathname} />
          <NavGroup title="Community" links={utilityNav} currentPath={pathname} />
        </div>
        <div className="mt-4 space-y-3 border-t border-white/5 pt-4 text-xs text-zinc-500">
          <p>Chi siamo • Contattaci • Diventa partner</p>
          <p>Privacy • Termini</p>
        </div>
      </aside>

      <div className="flex-1">
        <div className="flex flex-col gap-6 border-b border-white/5 bg-black/30 px-4 py-6 sm:px-6 lg:px-12">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">
                Ricorda di attivare le notifiche push
              </p>
              <h1 className="text-3xl font-semibold">Capibara Media</h1>
            </div>
            <div className="flex gap-3 text-sm">
              {session ? (
                <>
                  <span className="hidden text-zinc-300 sm:inline">
                    Ciao, {session.user?.name ?? "utente"}
                  </span>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="rounded-full border border-white/10 px-4 py-2 text-zinc-300 transition hover:border-white/40 hover:text-white"
                  >
                    Esci
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="rounded-full bg-white/90 px-4 py-2 font-semibold text-black"
                >
                  Accedi
                </Link>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <form
              action="/archivio"
              method="get"
              className="flex flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
            >
              <Search className="h-4 w-4 text-zinc-500" />
              <input
                name="q"
                type="search"
                className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none"
                placeholder="Cerca episodi, podcast o newsletter"
              />
            </form>
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-zinc-500">
              <span>Breaking News</span>
              <div className="h-px w-10 bg-white/20" />
              <span>Live 24/7</span>
            </div>
          </div>
        </div>

        <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}

