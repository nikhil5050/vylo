"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/admin/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { Switch } from "@/components/admin/ui/switch";
import { createTheme, updateTheme } from "@/lib/admin/api";
import type { AdminTheme } from "@/types/admin";

const themeSchema = z.object({
  name: z.string().min(1, "Theme name is required."),
  slug: z.string().optional(),
  active: z.boolean(),
});

type ThemeFormValues = z.infer<typeof themeSchema>;

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function ThemeForm({ theme }: { theme?: AdminTheme }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [slugTouched, setSlugTouched] = useState(!!theme);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<ThemeFormValues>({
    resolver: zodResolver(themeSchema),
    defaultValues: {
      name: theme?.name ?? "",
      slug: theme?.slug ?? "",
      active: theme?.active ?? true,
    },
  });

  async function onSubmit(data: ThemeFormValues) {
    setSubmitting(true);
    try {
      if (theme) {
        await updateTheme(theme.id, { name: data.name, slug: data.slug, active: data.active });
        toast.success("Theme updated successfully.");
      } else {
        await createTheme({ name: data.name, slug: data.slug, active: data.active });
        toast.success("Theme created successfully.");
      }
      router.push("/admin/themes");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Couldn't save the theme.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-base">Theme Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 pt-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              placeholder="e.g. Bridal"
              {...register("name", {
                onChange: (e) => {
                  if (!slugTouched) setValue("slug", slugify(e.target.value));
                },
              })}
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" {...register("slug", { onChange: () => setSlugTouched(true) })} placeholder="auto-generated from name" />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2 sm:col-span-2">
            <div>
              <p className="text-sm font-medium text-foreground">Active</p>
              <p className="text-xs text-muted-foreground">Selectable from the product create/edit flow.</p>
            </div>
            <Controller control={control} name="active" render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />} />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={submitting}>
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {theme ? "Save Changes" : "Create Theme"}
        </Button>
      </div>
    </form>
  );
}
