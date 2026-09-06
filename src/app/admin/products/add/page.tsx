"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { ProductForm } from "@/components/admin/ProductForm";
import { getCategories, getThemes } from "@/lib/admin/api";
import type { AdminCategory, AdminTheme } from "@/types/admin";

export default function AddProductPage() {
  const [categories, setCategories] = useState<AdminCategory[] | null>(null);
  const [themes, setThemes] = useState<AdminTheme[] | null>(null);

  useEffect(() => {
    getCategories().then(setCategories);
    getThemes().then(setThemes);
  }, []);

  if (!categories || !themes) return null;

  return (
    <div className="space-y-6">
      <PageHeader title="Add Product" description="Create a new product listing." />
      <ProductForm categories={categories} themes={themes} />
    </div>
  );
}
