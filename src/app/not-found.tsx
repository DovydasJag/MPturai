import Link from "next/link";

import { buttonClasses } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <h1 className="text-3xl font-bold tracking-tight">Page not found</h1>
      <p className="text-muted mt-3">
        That URL doesn&apos;t exist — or not yet.
      </p>
      <Link
        href="/"
        className={buttonClasses({ variant: "secondary", className: "mt-8" })}
      >
        Back home
      </Link>
    </Container>
  );
}
