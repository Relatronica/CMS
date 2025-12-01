import Link from "next/link";
import type { Show } from "@/lib/api";

type ContentTile = {
  title: string;
  date: string;
  summary: string;
  tag: string;
  accent: string;
  locked?: boolean;
  slug?: string;
  type?: "video" | "podcast" | "newsletter" | "article";
};

const kindAccent: Record<Show["kind"], string> = {
  video: "from-purple-500/30 via-fuchsia-500/20 to-amber-400/30",
  podcast: "from-teal-500/30 via-sky-500/20 to-blue-900/40",
  newsletter: "from-yellow-500/20 via-orange-600/20 to-red-700/30",
};

export const formatDate = (iso?: string | null) => {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("it-IT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export const getKindAccent = (kind: Show["kind"]) => kindAccent[kind];

export default function ContentCard({ entry }: { entry: ContentTile }) {
  const getHref = () => {
    if (!entry.slug || !entry.type) return "#";
    if (entry.type === "article") return `/articoli/${entry.slug}`;
    return `/${entry.type}/${entry.slug}`;
  };
  
  const href = getHref();
  
  const CardContent = (
    <article className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-gradient-to-br p-6 shadow-[0_25px_80px_rgba(0,0,0,0.35)] transition hover:-translate-y-1 hover:border-white/25 cursor-pointer">
      <div className={`h-40 rounded-2xl bg-gradient-to-r ${entry.accent}`} />
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm uppercase tracking-wide text-zinc-400">
          <span>{entry.tag}</span>
          {entry.locked && (
            <span className="rounded-full bg-amber-400/10 px-3 py-0.5 text-xs text-amber-200">
              Abbonati
            </span>
          )}
        </div>
        <h3 className="text-xl font-semibold text-white">{entry.title}</h3>
        <p className="text-sm text-zinc-400 line-clamp-2">{entry.summary}</p>
      </div>
      <div className="mt-auto text-xs uppercase tracking-wide text-zinc-500">
        {entry.date}
      </div>
    </article>
  );

  if (entry.slug && entry.type) {
    return (
      <Link href={href} className="block">
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}

