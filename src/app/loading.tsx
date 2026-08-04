import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <Container className="py-12">
      <div className="bg-surface-hover h-8 w-48 animate-pulse rounded-md" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="border-border bg-surface h-28 animate-pulse rounded-lg border"
          />
        ))}
      </div>
    </Container>
  );
}
