import StartupList from "@/components/StartupList"; // Import the client component
import SearchForm from "../../components/SearchForm";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({ searchParams }: { searchParams: { query?: string } }) {
  const query = searchParams?.query || "";
  const params = { search: query || null };
  const session = await auth();
  console.log(session?.id);
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  return (
    <>
      <section className="pink_container">
        {/* Content */}
        <div className="flex items-center gap-2">
          <p className="tag">DevForge</p>
          <img src="/fire.gif" alt="fire" className="w-6 h-6 sm:w-8 sm:h-8" />
        </div>

        <h1 className="heading">
          Where developers build,<br />showcase, and inspire.
        </h1>
        <p className="sub-heading">
        Share your latest projects, from MVPs to fully-fledged applications, and let the world see your work.
        </p>

        <SearchForm query={query} />
      </section>


      {/* Move pagination logic to the client component */}
      <StartupList posts={posts} query={query} />

      <SanityLive />
    </>
  );
}
