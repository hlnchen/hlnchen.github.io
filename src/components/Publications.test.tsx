import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { publications } from "@/data/profile";

import Publications from "./Publications";

const renderPublications = () => renderToStaticMarkup(<Publications />);

describe("Publications", () => {
  it("renders every selected publication without dropping prior work", () => {
    const html = renderPublications();

    publications.forEach(({ title }) => {
      expect(html).toContain(title);
    });
    expect(html).toContain("Cura 1T");
    expect(html).toContain("χ-Bench");
    expect(html).toContain("US 2026/0093997 A1");
    expect(html).toContain("Overcomplete order-3 tensor decomposition");
  });

  it("renders authors, year, venue, and type metadata", () => {
    const html = renderPublications();

    expect(html).toContain(
      "Haolin Chen, Leon Qi, Steve Brown, Deon Metelski",
    );
    expect(html).toContain("Pending Patent Application");
    expect(html).toContain("U.S. Patent Application Publication No.");
    expect(html).toContain("arXiv preprint");
    expect(html).toContain("Technical Report");
    expect(html).toContain(">2024<");
  });

  it("renders visible, icon-labeled resource links", () => {
    const html = renderPublications();

    expect(html).toContain(">Paper<");
    expect(html).toContain(">Code<");
    expect(html).toContain(">Dataset<");
    expect(html).toContain(">Patent<");
    expect(html).toContain("lucide-file-text");
    expect(html).toContain("lucide-github");
    expect(html).toContain("lucide-database");
    expect(html).toContain("lucide-badge-check");
  });

  it("opens every publication link safely in a new tab", () => {
    const html = renderPublications();
    const anchors = html.match(/<a\b[^>]*>/g) ?? [];
    const expectedAnchorCount = publications.reduce(
      (count, publication) => count + publication.links.length + 1,
      0,
    );

    expect(anchors).toHaveLength(expectedAnchorCount);
    anchors.forEach((anchor) => {
      expect(anchor).toContain('target="_blank"');
      expect(anchor).toContain('rel="noopener noreferrer"');
    });
  });

  it("preserves the current publication card and grid styling", () => {
    const html = renderPublications();

    expect(html).toContain("bg-muted/30");
    expect(html).toContain("grid grid-cols-1 md:grid-cols-2 gap-6");
    expect(html).toContain("hover:border-accent");
    expect(html).toContain("animate-fade-in");
  });
});
