"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Plus, Search, Sparkles, SquarePen, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { Button } from "@/components/admin/ui/button";
import { Card } from "@/components/admin/ui/card";
import { Input } from "@/components/admin/ui/input";
import { getThemes, deleteTheme } from "@/lib/admin/api";
import type { AdminTheme } from "@/types/admin";

export default function ThemesPage() {
  const [themes, setThemes] = useState<AdminTheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getThemes()
      .then(setThemes)
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () => themes.filter((t) => t.name.toLowerCase().includes(search.toLowerCase())),
    [themes, search],
  );

  async function handleDelete(theme: AdminTheme) {
    try {
      await deleteTheme(theme.id);
      setThemes((prev) => prev.filter((t) => t.id !== theme.id));
      toast.success(`${theme.name} deleted.`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Couldn't delete theme.");
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Themes"
        description="Merchandising themes like Bridal or Statement — separate from category, assignable to any product."
        actions={
          <Button nativeButton={false} render={<Link href="/admin/themes/add" />}>
            <Plus className="h-4 w-4" /> Add Theme
          </Button>
        }
      />

      <div className="relative max-w-xs">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search themes…" className="pl-8" />
      </div>

      {!loading && filtered.length === 0 ? (
        <AdminEmptyState
          icon={Sparkles}
          title="No themes yet"
          description="Create your first theme (e.g. Bridal, Minimalist) to start tagging products."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((theme) => (
            <Card key={theme.id} className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-foreground">{theme.name}</p>
                  <p className="text-xs text-muted-foreground">/{theme.slug}</p>
                </div>
                <StatusBadge status={theme.active ? "active" : "inactive"} tone={theme.active ? "success" : "neutral"} />
              </div>
              <div className="mt-3 flex items-center justify-end gap-1">
                <Link
                  href={`/admin/themes/edit?id=${theme.id}`}
                  className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                  aria-label="Edit theme"
                >
                  <SquarePen className="h-3.5 w-3.5" />
                </Link>
                <ConfirmDialog
                  trigger={
                    <button
                      type="button"
                      className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                      aria-label="Delete theme"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  }
                  title="Delete this theme?"
                  description={`"${theme.name}" will be deactivated. Products already tagged with it keep the tag.`}
                  confirmLabel="Delete"
                  onConfirm={() => handleDelete(theme)}
                />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
