import StartupList from "@/components/StartupList";
import SearchForm from "../../components/SearchForm";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
import { fetchEditorPicks } from "@/components/fetchEditorPicks"

export default async function Home({ searchParams }: { searchParams: { query?: string } }) {
  const query = searchParams?.query || "";
  const params = { search: query || null };
  const session = await auth();
  console.log(session?.id);

  // Fetch startup posts
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  // Fetch editor picks
  const editorPicks = await fetchEditorPicks();

  // Log editor picks to debug
  console.log("Editor Picks:", editorPicks);

  return (
    <>
      <section className="pink_container">
        <p className="tag">DevForge</p>
        <h1 className="heading">
          Where developers build,<br />showcase, and inspire.
        </h1>
        <p className="sub-heading">
          Share your latest projects, from MVPs to fully-fledged applications, and let the world see your work.
        </p>
        <SearchForm query={query} />
      </section>

      {/* Render the StartupList */}
      <StartupList posts={posts} query={query} />

      {/* Render the Editor Picks section */}
      {editorPicks?.length > 0 && (
        <section className="section_container">
          <div className="max-w-4xl mx-auto">
            <p className="text-30-semibold text-center">Featured</p>
            <ul className="mt-7 card_grid-sm">
              {editorPicks.map((post: StartupCardType, i: number) => (
                <StartupCard key={i} post={post} />
              ))}
            </ul>
          </div>
        </section>
      )}

      <SanityLive />
    </>
  );
}