import {
  Children,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  BadgeCheck,
  Database,
  ExternalLink,
  FileText,
  Github,
  type LucideIcon,
} from "lucide-react";
import { describe, expect, it } from "vitest";

import { Card } from "@/components/ui/card";
import {
  publications,
  type ResourceKind,
  type ResourceLink,
} from "@/data/profile";

import Publications from "./Publications";

interface ElementProps {
  children?: ReactNode;
  href?: string;
  rel?: string;
  target?: string;
}

const resourceIcons: Record<ResourceKind, LucideIcon> = {
  paper: FileText,
  code: Github,
  dataset: Database,
  patent: BadgeCheck,
};

const collectElements = (
  node: ReactNode,
  predicate: (element: ReactElement<ElementProps>) => boolean,
): ReactElement<ElementProps>[] => {
  const matches: ReactElement<ElementProps>[] = [];

  Children.forEach(node, (child) => {
    if (!isValidElement<ElementProps>(child)) {
      return;
    }

    if (predicate(child)) {
      matches.push(child);
    }
    matches.push(...collectElements(child.props.children, predicate));
  });

  return matches;
};

const publicationTree = Publications();
const publicationCards = collectElements(
  publicationTree,
  (element) => element.type === Card,
);

const getPublicationCard = (title: string) => {
  const card = publicationCards.find((element) => element.key === title);

  expect(card, `publication card for "${title}"`).toBeDefined();
  return card as ReactElement<ElementProps>;
};

const getAnchors = (card: ReactElement<ElementProps>) =>
  collectElements(card.props.children, (element) => element.type === "a");

const expectSafeExternalLink = (anchor: ReactElement<ElementProps>) => {
  expect(anchor.props.target).toBe("_blank");
  expect(anchor.props.rel).toBe("noopener noreferrer");
};

const expectResourceLink = (
  anchor: ReactElement<ElementProps>,
  resource: ResourceLink,
) => {
  const children = Children.toArray(anchor.props.children);
  const icons = collectElements(
    anchor.props.children,
    (element) => element.type === resourceIcons[resource.kind],
  );

  expect(anchor.props.href).toBe(resource.url);
  expect(children).toContain(resource.label);
  expect(icons).toHaveLength(1);
  expectSafeExternalLink(anchor);
};

describe("Publications", () => {
  it("renders one current-style card for every selected publication", () => {
    const html = renderToStaticMarkup(publicationTree);

    expect(publicationCards).toHaveLength(publications.length);
    expect(publicationCards.map((card) => card.key)).toEqual(
      publications.map((publication) => publication.title),
    );
    expect(html).toContain("bg-muted/30");
    expect(html).toContain("grid grid-cols-1 md:grid-cols-2 gap-6");
    expect(html).toContain("hover:border-accent");
    expect(html).toContain("animate-fade-in");
  });

  it("includes the new work, patent, and preserved earliest publication", () => {
    const cardTitles = publicationCards.map((card) => card.key);

    expect(cardTitles).toEqual(
      expect.arrayContaining([
        "Cura 1T: Specialized Model for Agentic Healthcare",
        "χ-Bench: Can AI Agents Automate End-to-End, Long-Horizon, Policy-Rich Healthcare Workflows?",
        "Systems and Methods for Generative Language Model Reasoning Process Optimization",
        "Overcomplete order-3 tensor decomposition, blind deconvolution and Gaussian mixture models",
      ]),
    );
  });

  describe.each(publications)("$title", (publication) => {
    it("renders its exact title, authors, year, venue, and type", () => {
      const cardMarkup = renderToStaticMarkup(
        getPublicationCard(publication.title),
      );

      [
        publication.title,
        publication.authors,
        publication.year,
        publication.venue,
        publication.type,
      ].forEach((value) => {
        expect(cardMarkup).toContain(renderToStaticMarkup(<>{value}</>));
      });
    });

    it("renders its exact primary and icon-labeled resource links", () => {
      const anchors = getAnchors(getPublicationCard(publication.title));
      const [primaryAnchor, ...resourceAnchors] = anchors;

      expect(primaryAnchor.props.href).toBe(publication.links[0].url);
      expect(
        collectElements(
          primaryAnchor.props.children,
          (element) => element.type === ExternalLink,
        ),
      ).toHaveLength(1);
      expectSafeExternalLink(primaryAnchor);

      expect(resourceAnchors).toHaveLength(publication.links.length);
      publication.links.forEach((resource, index) => {
        expectResourceLink(resourceAnchors[index], resource);
      });
    });
  });
});
