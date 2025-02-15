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
        <h1 className="heading">Pitch Your Startup, <br /> Connect With Entrepreneurs</h1>
        <p className="sub-heading !max-w-3xl">
          Submit ideas, Vote on Pitches, and Get Noticed in Virtual Competitions.
        </p>
        <SearchForm query={query} />
      </section>

      {/* Move pagination logic to the client component */}
      <StartupList posts={posts} query={query} />

      <SanityLive />
    </>
  );
}
