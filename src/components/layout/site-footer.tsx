import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/config";

export function SiteFooter() {
  return (
    <footer className="border-border border-t">
      <Container className="text-muted flex h-16 items-center justify-between text-sm">
        <span>
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </span>
        <span>Built with Next.js</span>
      </Container>
    </footer>
  );
}
