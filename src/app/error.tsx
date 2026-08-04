"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Swap for a real error reporter (Sentry, etc.) when we add one.
    console.error(error);
  }, [error]);

  return (
    <Container className="py-24 text-center">
      <h1 className="text-3xl font-bold tracking-tight">Something broke</h1>
      <p className="text-muted mt-3">
        An unexpected error occurred while rendering this page.
      </p>
      <Button variant="secondary" className="mt-8" onClick={reset}>
        Try again
      </Button>
    </Container>
  );
}
