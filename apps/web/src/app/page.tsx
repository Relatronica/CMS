import {
  getLatestPodcastEpisodes,
  getLatestVideoEpisodes,
  getPremiumNewsletterIssues,
  getLatestArticles,
  type Show,
} from "@/lib/api";
import MainLayout from "@/components/MainLayout";
import ContentCard, { formatDate, getKindAccent } from "@/components/ContentCard";
import Link from "next/link";

export default async function Home() {
  const [videoEpisodes, podcastDrops, premiumLetters, articles] = await Promise.all([
    getLatestVideoEpisodes(3),
    getLatestPodcastEpisodes(4),
    getPremiumNewsletterIssues(3),
    getLatestArticles(3),
  ]);

  // Filter out any undefined/null episodes
  const validVideoEpisodes = videoEpisodes.filter((ep) => ep != null);
  const validPodcastDrops = podcastDrops.filter((ep) => ep != null);
  const validPremiumLetters = premiumLetters.filter((ep) => ep != null);
  const validArticles = articles.filter((art) => art != null);

  return (
    <MainLayout>
      <header className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-900/80 via-zinc-900/20 to-indigo-900/20 p-8 shadow-[0_20px_120px_rgba(63,63,70,0.45)] lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-zinc-400">
                Capibara Media
              </p>
              <h2 className="mt-2 text-3xl font-semibold leading-tight text-white sm:text-4xl">
                Video, podcast, articoli e newsletter da una sola content room.
              </h2>
              <p className="mt-4 max-w-xl text-zinc-300">
                CMS headless con area riservata, workflow redazionale e distribuzione
                omnicanale. Questa demo Next.js mostra il layout pubblico che
                consumerà le API Strapi.
              </p>
            </div>
            <div className="flex flex-col gap-3 text-sm text-zinc-300">
              <Link
                href="/abbonamenti"
                className="rounded-full bg-white/90 px-6 py-3 font-semibold text-black text-center transition hover:bg-white"
              >
                Abbonati ora
              </Link>
              <button className="rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:border-white/70">
                Accedi
              </button>
            </div>
          </header>

          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                  Capibara Originals
                </p>
                <h3 className="text-2xl font-semibold text-white">
                  Storied Network
                </h3>
              </div>
              <Link
                href="/video"
                className="text-sm text-zinc-300 transition hover:text-white"
              >
                Vedi tutto
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {validVideoEpisodes.map((episode) => {
                const showData = episode.show?.data;
                const showKind = 
                  (showData?.attributes?.kind as Show["kind"]) ?? "video";
                const accent = getKindAccent(showKind);

                return (
                  <ContentCard
                    key={episode.slug}
                    entry={{
                      title: episode.title ?? "Untitled",
                      date: formatDate(episode.publishDate),
                      summary: episode.synopsis ?? episode.summary ?? "",
                      tag: "Video",
                      accent,
                      locked: episode.isPremium ?? false,
                      slug: episode.slug,
                      type: "video",
                    }}
                  />
                );
              })}
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="space-y-6 rounded-3xl border border-white/10 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                    Podcast
                  </p>
                  <h3 className="text-2xl font-semibold text-white">
                    VentiQuaranta
                  </h3>
                </div>
                <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs text-indigo-200">
                  Feed RSS
                </span>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
              {validPodcastDrops.map((podcast) => (
                <ContentCard
                  key={podcast.slug}
                  entry={{
                    title: podcast.title ?? "Untitled",
                    date: formatDate(podcast.publishDate),
                    summary: podcast.summary ?? podcast.synopsis ?? "",
                    tag: "Podcast",
                    accent: getKindAccent("podcast"),
                    locked: podcast.isPremium ?? false,
                    slug: podcast.slug,
                    type: "podcast",
                  }}
                />
              ))}
              </div>
            </div>
            <div className="space-y-6 rounded-3xl border border-white/10 p-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                  Newsletter
                </p>
                <h3 className="text-2xl font-semibold text-white">Area riservata</h3>
                <p className="mt-2 text-sm text-zinc-400">
                  Gli approfondimenti vengono sbloccati automaticamente dopo la
                  conferma del pagamento Stripe.
                </p>
              </div>
              <div className="space-y-4">
              {validPremiumLetters.map((letter) => (
                <ContentCard
                  key={letter.slug}
                  entry={{
                    title: letter.title ?? "Untitled",
                    date: formatDate(letter.publishDate),
                    summary: letter.excerpt ?? letter.summary ?? "",
                    tag: "Newsletter",
                    accent: getKindAccent("newsletter"),
                    locked: letter.isPremium ?? true,
                    slug: letter.slug,
                    type: "newsletter",
                  }}
                />
              ))}
              </div>
              <button className="w-full rounded-2xl border border-white/20 px-4 py-3 text-left text-sm text-zinc-300 transition hover:border-white/50 hover:text-white">
                Esplora i benefit per gli abbonati →
              </button>
            </div>
          </section>

          {validArticles.length > 0 && (
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
                    Editoriale
                  </p>
                  <h3 className="text-2xl font-semibold text-white">
                    Articoli e Approfondimenti
                  </h3>
                </div>
                <Link
                  href="/articoli"
                  className="text-sm text-zinc-300 transition hover:text-white"
                >
                  Vedi tutto
                </Link>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {validArticles.map((article) => (
                  <ContentCard
                    key={article.slug}
                    entry={{
                      title: article.title ?? "Untitled",
                      date: formatDate(article.publishDate),
                      summary: article.excerpt ?? "",
                      tag: "Articolo",
                      accent: "from-blue-500/30 via-indigo-500/20 to-purple-900/40",
                      locked: article.isPremium ?? false,
                      slug: article.slug,
                      type: "article",
                    }}
                  />
                ))}
              </div>
            </section>
          )}
    </MainLayout>
  );
}
