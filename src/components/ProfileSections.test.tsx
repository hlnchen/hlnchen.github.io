import {
  Children,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  Briefcase,
  FileText,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import { describe, expect, it } from "vitest";

import { Card } from "@/components/ui/card";
import {
  contact,
  education,
  footerTagline,
  projects,
  workExperience,
} from "@/data/profile";

import About from "./About";
import Experience from "./Experience";
import Footer from "./Footer";
import Header from "./Header";

interface ElementProps {
  children?: ReactNode;
  href?: string;
  rel?: string;
  target?: string;
  className?: string;
  "aria-label"?: string;
}

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

const expectSafeExternalLink = (anchor: ReactElement<ElementProps>) => {
  expect(anchor.props.target).toBe("_blank");
  expect(anchor.props.rel).toBe("noopener noreferrer");
};

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

describe("Header", () => {
  const headerTree = Header();
  const anchors = collectElements(
    headerTree,
    (element) => element.type === "a",
  );
  const getAnchor = (href: string) => {
    const anchor = anchors.find((element) => element.props.href === href);

    expect(anchor, `header anchor for "${href}"`).toBeDefined();
    return anchor as ReactElement<ElementProps>;
  };

  it("preserves the navigation and current header treatment", () => {
    const html = renderToStaticMarkup(headerTree);

    expect(["#about", "#publications", "#experience"].map(getAnchor)).toHaveLength(
      3,
    );
    expect(html).toContain("sticky top-0 z-50");
    expect(html).toContain("flex h-16 items-center justify-between");
    expect(html).toContain("Haolin Chen");
  });

  it("renders the current email and every external profile safely", () => {
    expect(getAnchor(`mailto:${contact.email}`).props["aria-label"]).toBe(
      "Email",
    );

    [
      [contact.github, "GitHub"],
      [contact.linkedin, "LinkedIn"],
      [contact.scholar, "Google Scholar"],
    ].forEach(([href, label]) => {
      const anchor = getAnchor(href);

      expect(anchor.props["aria-label"]).toBe(label);
      expectSafeExternalLink(anchor);
    });
  });

  it("adds an accessible FileText CV link without changing the icon group", () => {
    const cvAnchor = getAnchor(contact.cv);
    const fileTextIcons = collectElements(
      cvAnchor.props.children,
      (element) => element.type === (FileText as LucideIcon),
    );

    expect(cvAnchor.props["aria-label"]).toBe("Download CV");
    expect(fileTextIcons).toHaveLength(1);
    expect(cvAnchor.props.className).toBe(
      "text-muted-foreground hover:text-foreground transition-colors",
    );
  });
});

describe("About", () => {
  const aboutHtml = renderToStaticMarkup(<About />);

  it("preserves the portrait, section, and research-card styling", () => {
    expect(aboutHtml).toContain(
      '<section id="about" class="container py-16 animate-fade-in">',
    );
    expect(aboutHtml).toContain('src="/thumbnail.jpg"');
    expect(aboutHtml).toContain('alt="Haolin Chen"');
    expect(aboutHtml).toContain(
      "w-32 h-32 rounded-full object-cover border-4 border-card shadow-lg",
    );
    expect(aboutHtml).toContain(
      "p-6 border border-border bg-card hover:bg-card-hover transition-colors",
    );
  });

  it("states the current role and links Cura and χ-Bench safely", () => {
    expect(aboutHtml).toContain("I am Head of Research at");
    expect(aboutHtml).toContain("actAVA AI");
    expect(aboutHtml).toContain("specialized language models");
    expect(aboutHtml).toContain("agentic healthcare systems");

    [projects.cura, projects.chiBench].forEach((project) => {
      expect(aboutHtml).toMatch(
        new RegExp(
          `<a href="${escapeRegExp(project.url)}" target="_blank" rel="noopener noreferrer"[^>]*>${escapeRegExp(project.name)}</a>`,
        ),
      );
    });
  });

  it("retains every prior linked research project and its exact URL", () => {
    [
      projects.latro,
      projects.webscaleRL,
      projects.coda,
      projects.xlam,
      projects.apigenMT,
    ].forEach((project) => {
      expect(aboutHtml).toMatch(
        new RegExp(
          `<a href="${escapeRegExp(project.url)}" target="_blank" rel="noopener noreferrer"[^>]*>${escapeRegExp(project.name)}</a>`,
        ),
      );
    });
  });

  it("retains the product and Ph.D. details", () => {
    [
      "sales pitching",
      "planning",
      "customer-service use cases",
      "integrated xLAM and APIGen-MT into Salesforce environments",
      "mathematical foundations of machine learning",
      "algorithms for tensor decomposition",
      "advised by Prof. Luis Rademacher",
    ].forEach((detail) => {
      expect(aboutHtml).toContain(detail);
    });
  });
});

describe("Experience", () => {
  const experienceTree = Experience();
  const cards = collectElements(
    experienceTree,
    (element) => element.type === Card,
  );

  it("renders the complete work chronology in stable semantic cards", () => {
    const expectedKeys = workExperience.map(
      ({ company, title }) => `${company}-${title}`,
    );

    expect(cards.slice(0, workExperience.length).map((card) => card.key)).toEqual(
      expectedKeys,
    );

    workExperience.forEach((experience) => {
      const card = cards.find(
        (candidate) =>
          candidate.key === `${experience.company}-${experience.title}`,
      );
      const html = renderToStaticMarkup(card as ReactElement<ElementProps>);

      expect(html).toContain(experience.title);
      expect(html).toContain(experience.company);
      expect(html).toContain(experience.period);
    });
  });

  it("renders all three education entries in stable semantic cards", () => {
    const expectedKeys = education.map(
      ({ institution, degree }) => `${institution}-${degree}`,
    );

    expect(cards.slice(workExperience.length).map((card) => card.key)).toEqual(
      expectedKeys,
    );

    education.forEach((item) => {
      const card = cards.find(
        (candidate) =>
          candidate.key === `${item.institution}-${item.degree}`,
      );
      const html = renderToStaticMarkup(card as ReactElement<ElementProps>);

      expect(html).toContain(item.degree);
      expect(html).toContain(item.institution);
      expect(html).toContain(item.year);
    });
  });

  it("preserves the card grid, animation, and section icons", () => {
    const html = renderToStaticMarkup(experienceTree);

    expect(cards).toHaveLength(workExperience.length + education.length);
    cards.forEach((card) => {
      expect(card.props.className).toBe(
        "hover:shadow-md transition-all duration-300 hover:border-accent animate-slide-in",
      );
    });
    expect(html).toContain("grid grid-cols-1 lg:grid-cols-2 gap-8");
    expect(
      collectElements(
        experienceTree,
        (element) => element.type === (Briefcase as LucideIcon),
      ),
    ).toHaveLength(1);
    expect(
      collectElements(
        experienceTree,
        (element) => element.type === (GraduationCap as LucideIcon),
      ),
    ).toHaveLength(1);
  });
});

describe("Footer", () => {
  it("renders the typed current tagline in the preserved footer structure", () => {
    const html = renderToStaticMarkup(<Footer />);

    expect(html).toContain(footerTagline);
    expect(html).toContain(
      '<footer class="border-t border-border bg-muted/30">',
    );
    expect(html).toContain(
      '<div class="text-center text-sm text-muted-foreground">',
    );
    expect(html).toContain("Haolin Chen. All rights reserved.");
  });
});
