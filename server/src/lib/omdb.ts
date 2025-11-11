import axios from "axios";

export async function fetchPosterUrl(title: string, year?: number) {
  const apiKey = process.env.OMDB_API_KEY;
  if (!apiKey) return null;

  // Preferimos búsqueda por título exacto; si falla, probamos search.
  const byTitle = await axios.get("http://www.omdbapi.com/", {
    params: { apikey: apiKey, t: title, y: year }
  });
  if (byTitle.data?.Response === "True" && byTitle.data.Poster && byTitle.data.Poster !== "N/A") {
    return byTitle.data.Poster as string;
  }

  const bySearch = await axios.get("http://www.omdbapi.com/", {
    params: { apikey: apiKey, s: title, y: year }
  });
  const first = bySearch.data?.Search?.[0];
  return first?.Poster && first.Poster !== "N/A" ? (first.Poster as string) : null;
}
