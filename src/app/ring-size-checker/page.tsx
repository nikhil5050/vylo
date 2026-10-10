import { Suspense } from "react";
import { RingSizeChecker } from "@/components/product/RingSizeChecker";
import { Container } from "@/components/ui/Container";

export default function RingSizeCheckerPage() {
  return (
    <main className="flex flex-1 flex-col py-10 lg:py-16">
      <Container>
        {/* useSearchParams (initial ?size=) needs a Suspense boundary to keep the page static. */}
        <Suspense>
          <RingSizeChecker />
        </Suspense>
      </Container>
    </main>
  );
}
