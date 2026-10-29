import { apiFetch } from "@/lib/api";
import type { Category } from "@/types/category";

interface BackendCategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  is_active: boolean;
}

interface BackendCategoryResponse {
  value: BackendCategory[];
  Count: number;
}

function mapCategory(category: BackendCategory): Category {
  return {
    id: String(category.id),
    slug: category.slug.trim(),
    name: category.name.trim(),
    description: category.description ?? "",
    imageUrl: category.image_url ?? undefined,
  };
}

// Small, mostly-static list — one request covers every category, shared by
// every call site rather than re-fetched each time. Expires after a minute
// (matching the pages' revalidate) so a category switched off or added in
// the admin shows up without a server restart.
const CATEGORIES_TTL_MS = 60_000;
let categoriesPromise: Promise<Category[]> | null = null;
let categoriesFetchedAt = 0;

export async function getCategories(): Promise<Category[]> {
  if (!categoriesPromise || Date.now() - categoriesFetchedAt > CATEGORIES_TTL_MS) {
    categoriesFetchedAt = Date.now();
    categoriesPromise = apiFetch<BackendCategory[] | BackendCategoryResponse>("/categories", { auth: false })
      .then((response) => (Array.isArray(response) ? response : response.value).map(mapCategory))
      .catch((error) => {
        // Don't let a transient failure (network blip, backend cold start) poison
        // every future request for the life of the server process — clear the
        // cache so the next caller retries instead of replaying the same rejection.
        categoriesPromise = null;
        throw error;
      });
  }
  return categoriesPromise;
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const categories = await getCategories();
  return categories.find((category) => category.slug === slug);
}

// Internal helper for product.service.ts, which needs category_id -> slug/name
// since the backend's Product doesn't embed its category.
export async function getCategoryById(id: number): Promise<Category | undefined> {
  const categories = await getCategories();
  return categories.find((category) => category.id === String(id));
}
