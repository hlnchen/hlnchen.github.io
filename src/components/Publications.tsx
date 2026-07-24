import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { publications, type ResourceKind } from "@/data/profile";
import {
  BadgeCheck,
  Database,
  ExternalLink,
  FileText,
  Github,
  type LucideIcon,
} from "lucide-react";

const resourceIcons: Record<ResourceKind, LucideIcon> = {
  paper: FileText,
  code: Github,
  dataset: Database,
  patent: BadgeCheck,
};

const Publications = () => {
  return (
    <section id="publications" className="container py-16 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Selected Publications</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {publications.map((publication, index) => {
            const primaryLink = publication.links[0];

            return (
              <Card
                key={publication.title}
                className="group hover:shadow-lg transition-all duration-300 hover:border-accent animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg leading-tight group-hover:text-accent transition-colors">
                      {publication.title}
                    </CardTitle>
                    <a
                      href={primaryLink.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-accent transition-colors flex-shrink-0"
                      aria-label={`View ${publication.title}`}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                  <CardDescription className="text-sm">
                    {publication.authors}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <span className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground font-medium">
                      {publication.year}
                    </span>
                    <span className="text-muted-foreground">
                      {publication.venue}
                    </span>
                    <span className="text-xs text-text-subtle">
                      {publication.type}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-3">
                    {publication.links.map((link) => {
                      const Icon = resourceIcons[link.kind];

                      return (
                        <a
                          key={`${publication.title}-${link.label}`}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                        >
                          <Icon className="h-4 w-4" aria-hidden="true" />
                          {link.label}
                        </a>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Publications;
