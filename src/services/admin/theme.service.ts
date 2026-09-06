import { apiFetch } from "@/lib/api";
import type { AdminTheme } from "@/types/admin";

interface BackendTheme {
  id: number;
  name: string;
  slug: string;
  is_active: boolean;
}

function mapTheme(theme: BackendTheme): AdminTheme {
  return {
    id: String(theme.id),
    name: theme.name,
    slug: theme.slug,
    active: theme.is_active,
  };
}

export async function getAdminThemes(): Promise<AdminTheme[]> {
  const rows = await apiFetch<BackendTheme[]>("/admin/themes");
  return rows.map(mapTheme);
}

export interface ThemeInput {
  name: string;
  slug?: string;
  active?: boolean;
}

function toBackendPayload(input: Partial<ThemeInput>) {
  const payload: Record<string, unknown> = {};
  if (input.name !== undefined) payload.name = input.name;
  if (input.slug !== undefined) payload.slug = input.slug || null;
  if (input.active !== undefined) payload.is_active = input.active;
  return payload;
}

export async function createAdminTheme(input: ThemeInput): Promise<AdminTheme> {
  const theme = await apiFetch<BackendTheme>("/admin/themes", {
    method: "POST",
    body: toBackendPayload(input),
  });
  return mapTheme(theme);
}

export async function updateAdminTheme(id: string, input: Partial<ThemeInput>): Promise<AdminTheme> {
  const theme = await apiFetch<BackendTheme>(`/admin/themes/${id}`, {
    method: "PATCH",
    body: toBackendPayload(input),
  });
  return mapTheme(theme);
}

export async function deleteAdminTheme(id: string): Promise<void> {
  await apiFetch(`/admin/themes/${id}`, { method: "DELETE" });
}
