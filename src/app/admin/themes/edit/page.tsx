"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/admin/PageHeader";
import { ThemeForm } from "@/components/admin/ThemeForm";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { getThemes } from "@/lib/admin/api";
import type { AdminTheme } from "@/types/admin";

export default function EditThemePage() {
  return (
    <Suspense fallback={null}>
      <EditThemeContent />
    </Suspense>
  );
}

function EditThemeContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [theme, setTheme] = useState<AdminTheme | null | undefined>(undefined);

  useEffect(() => {
    if (!id) return;
    getThemes().then((themes) => setTheme(themes.find((t) => t.id === id) ?? null));
  }, [id]);

  useEffect(() => {
    if (theme) document.title = `${theme.name} | Vylore Admin`;
  }, [theme]);

  if (theme === undefined) {
    if (!id) {
      return (
        <div className="space-y-6">
          <PageHeader title="Theme not found" />
          <AdminEmptyState title="This theme doesn't exist" description="It may have been deleted, or the link is invalid." />
        </div>
      );
    }
    return null;
  }

  if (theme === null) {
    return (
      <div className="space-y-6">
        <PageHeader title="Theme not found" />
        <AdminEmptyState title="This theme doesn't exist" description="It may have been deleted, or the link is invalid." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title={theme.name} description={`/${theme.slug}`} />
      <ThemeForm theme={theme} />
    </div>
  );
}
