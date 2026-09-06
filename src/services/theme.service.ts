import { apiFetch } from "@/lib/api";
import type { Theme } from "@/types/theme";

interface BackendTheme {
  id: number;
  name: string;
  slug: string;
  is_active: boolean;
}

function mapTheme(theme: BackendTheme): Theme {
  return {
    id: String(theme.id),
    slug: theme.slug,
    name: theme.name,
  };
}

// Small, mostly-static list — same caching approach as category.service.ts.
let themesPromise: Promise<Theme[]> | null = null;

export async function getThemes(): Promise<Theme[]> {
  if (!themesPromise) {
    themesPromise = apiFetch<BackendTheme[]>("/themes", { auth: false })
      .then((rows) => rows.map(mapTheme))
      .catch((error) => {
        themesPromise = null;
        throw error;
      });
  }
  return themesPromise;
}

// Internal helper for product.service.ts, which needs theme_id -> slug/name
// since the backend's Product doesn't embed its theme.
export async function getThemeById(id: number): Promise<Theme | undefined> {
  const themes = await getThemes();
  return themes.find((theme) => theme.id === String(id));
}
