import { ProductGridSkeleton } from "@/components/shop/ProductGridSkeleton";

export default function Loading() {
  return (
    <main className="-mt-16 flex flex-1 flex-col bg-moonlight pt-16 lg:-mt-20 lg:pt-20">
      <ProductGridSkeleton />
    </main>
  );
}
