import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getProductBySlug } from "@/services/product.service";
import { buildMetadata } from "@/utils/metadata";

export async function generateMetadata({
  params,
}: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  // A backend outage here (getProductBySlug rethrows anything but a genuine
  // 404) shouldn't crash metadata generation — falling back to default
  // metadata is fine; a 500 taking the page down is not.
  const product = await getProductBySlug(slug).catch(() => undefined);
  if (!product) return {};

  return buildMetadata({
    title: product.name,
    description:
      product.description || `Shop the ${product.name} from Vylore's ${product.category.toLowerCase()} collection.`,
    path: `/product/${product.slug}`,
    image: product.images[0]?.url,
  });
}

export default function ProductLayout({ children }: { children: ReactNode }) {
  return children;
}
