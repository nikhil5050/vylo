import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { ThemeForm } from "@/components/admin/ThemeForm";

export const metadata: Metadata = { title: "Add Theme" };

export default function AddThemePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Add Theme" description="Create a new merchandising theme." />
      <ThemeForm />
    </div>
  );
}
