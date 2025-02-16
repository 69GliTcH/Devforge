// utils/fetchEditorPicks.ts
import { sanityFetch } from "@/sanity/lib/live";
import { PLAYLIST_BY_SLUG_QUERY } from "@/sanity/lib/queries";

export async function fetchEditorPicks() {
    const { data: editorPicksData } = await sanityFetch({
        query: PLAYLIST_BY_SLUG_QUERY,
        params: { slug: "editor-picks-new" },
    });
    return editorPicksData?.select || [];
}