import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

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

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getAnchorMarkup = (html: string, href: string) => {
  const anchor = html.match(
    new RegExp(
      `<a(?=[^>]*\\bhref="${escapeRegExp(href)}")[^>]*>[\\s\\S]*?<\\/a>`,
    ),
  )?.[0];

  expect(anchor, `rendered anchor for "${href}"`).toBeDefined();
  return anchor as string;
};

const getClassTokens = (markup: string) => {
  const classes = markup.match(/\bclass="([^"]*)"/)?.[1];

  expect(classes, `class attribute in "${markup}"`).toBeDefined();
  return (classes as string).split(/\s+/);
};

const expectClassTokens = (markup: string, expected: string[]) => {
  expect(getClassTokens(markup)).toEqual(expect.arrayContaining(expected));
};

const getOpeningTag = (html: string, tagName: string) => {
  const tag = html.match(new RegExp(`<${tagName}\\b[^>]*>`))?.[0];

  expect(tag, `rendered <${tagName}>`).toBeDefined();
  return tag as string;
};

const getOpeningTagWithClass = (html: string, classToken: string) => {
  const tag = html.match(
    new RegExp(
      `<[a-z][^>]*\\bclass="[^"]*(?:^|\\s)${escapeRegExp(classToken)}(?:\\s|$)[^"]*"[^>]*>`,
    ),
  )?.[0];

  expect(tag, `element with class "${classToken}"`).toBeDefined();
  return tag as string;
};

const getNearestOpeningTagBefore = (
  html: string,
  marker: string,
  tagName: string,
) => {
  const markerIndex = html.indexOf(marker);

  expect(markerIndex, `marker "${marker}"`).toBeGreaterThanOrEqual(0);
  const prefix = html.slice(0, markerIndex);
  const tagStart = prefix.lastIndexOf(`<${tagName}`);

  expect(tagStart, `<${tagName}> before "${marker}"`).toBeGreaterThanOrEqual(0);
  return prefix.slice(tagStart, prefix.indexOf(">", tagStart) + 1);
};

const expectSafeExternalLink = (anchorMarkup: string) => {
  expect(anchorMarkup).toContain('target="_blank"');
  expect(anchorMarkup).toContain('rel="noopener noreferrer"');
};

const expectTextInOrder = (html: string, values: readonly string[]) => {
  let searchFrom = 0;

  values.forEach((value) => {
    const valueIndex = html.indexOf(value, searchFrom);

    expect(valueIndex, `"${value}" after index ${searchFrom}`).toBeGreaterThanOrEqual(
      0,
    );
    searchFrom = valueIndex + value.length;
  });
};

describe("Header", () => {
  const headerHtml = renderToStaticMarkup(<Header />);

  it("keeps every navigation and contact destination in the rendered header", () => {
    [
      "#about",
      "#publications",
      "#experience",
      `mailto:${contact.email}`,
      contact.github,
      contact.linkedin,
      contact.scholar,
      contact.cv,
    ].forEach((href) => {
      expect(getAnchorMarkup(headerHtml, href)).toBeDefined();
    });
    expect(headerHtml).toContain("Haolin Chen");
  });

  it("collapses only text navigation on mobile and restores desktop spacing at sm", () => {
    const navTag = getOpeningTag(headerHtml, "nav");
    const emailAnchor = getAnchorMarkup(headerHtml, `mailto:${contact.email}`);
    const iconGroupTag = getNearestOpeningTagBefore(
      headerHtml,
      emailAnchor,
      "div",
    );

    expectClassTokens(navTag, ["gap-2", "sm:gap-6"]);
    ["#about", "#publications", "#experience"].forEach((href) => {
      expectClassTokens(getAnchorMarkup(headerHtml, href), [
        "hidden",
        "sm:inline",
      ]);
    });
    expectClassTokens(iconGroupTag, [
      "gap-2",
      "sm:gap-3",
      "sm:ml-4",
      "sm:border-l",
      "sm:border-border",
      "sm:pl-4",
    ]);
    expect(getClassTokens(iconGroupTag)).not.toEqual(
      expect.arrayContaining(["ml-4", "border-l", "border-border", "pl-4"]),
    );
  });

  it("labels all five icons and renders external profiles safely", () => {
    [
      [`mailto:${contact.email}`, "Email"],
      [contact.github, "GitHub"],
      [contact.linkedin, "LinkedIn"],
      [contact.scholar, "Google Scholar"],
      [contact.cv, "Download CV"],
    ].forEach(([href, label]) => {
      const anchor = getAnchorMarkup(headerHtml, href);

      expect(anchor).toContain(`aria-label="${label}"`);
      expect(getClassTokens(anchor)).not.toContain("hidden");
    });

    [contact.github, contact.linkedin, contact.scholar].forEach((href) => {
      expectSafeExternalLink(getAnchorMarkup(headerHtml, href));
    });
  });

  it("uses the FileText icon for the CV destination", () => {
    const cvAnchor = getAnchorMarkup(headerHtml, contact.cv);

    expect(cvAnchor).toContain("lucide-file-text");
    expect(cvAnchor).toContain('aria-label="Download CV"');
  });
});

describe("About", () => {
  const aboutHtml = renderToStaticMarkup(<About />);

  it("preserves the portrait, section, and research-card treatment", () => {
    const sectionTag = getOpeningTag(aboutHtml, "section");
    const imageTag = getOpeningTag(aboutHtml, "img");
    const researchCardTag = getNearestOpeningTagBefore(
      aboutHtml,
      "Research Interests",
      "div",
    );

    expectClassTokens(sectionTag, ["container", "py-16", "animate-fade-in"]);
    expect(imageTag).toContain('src="/thumbnail.jpg"');
    expect(imageTag).toContain('alt="Haolin Chen"');
    expectClassTokens(imageTag, [
      "w-32",
      "h-32",
      "rounded-full",
      "border-card",
      "shadow-lg",
    ]);
    expectClassTokens(researchCardTag, [
      "p-6",
      "border-border",
      "bg-card",
      "hover:bg-card-hover",
    ]);
  });

  it("states the current role and links Cura and χ-Bench safely", () => {
    [
      "I am Head of Research at",
      "actAVA AI",
      "specialized language models",
      "agentic healthcare systems",
    ].forEach((text) => {
      expect(aboutHtml).toContain(text);
    });

    [projects.cura, projects.chiBench].forEach((project) => {
      const anchor = getAnchorMarkup(aboutHtml, project.url);

      expect(anchor).toContain(project.name);
      expectSafeExternalLink(anchor);
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
      const anchor = getAnchorMarkup(aboutHtml, project.url);

      expect(anchor).toContain(project.name);
      expectSafeExternalLink(anchor);
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
  const experienceHtml = renderToStaticMarkup(<Experience />);

  it("renders the complete work chronology in order", () => {
    expectTextInOrder(
      experienceHtml,
      workExperience.flatMap(({ title, company, period }) => [
        title,
        company,
        period,
      ]),
    );
  });

  it("renders all three education entries in order", () => {
    expectTextInOrder(
      experienceHtml,
      education.flatMap(({ degree, institution, year }) => [
        degree,
        institution,
        year,
      ]),
    );
  });

  it("preserves the card grid, animation, and section icons", () => {
    const gridTag = getOpeningTagWithClass(experienceHtml, "lg:grid-cols-2");

    expectClassTokens(gridTag, [
      "grid",
      "grid-cols-1",
      "lg:grid-cols-2",
      "gap-8",
    ]);
    expect(experienceHtml.match(/\banimate-slide-in\b/g)).toHaveLength(
      workExperience.length + education.length,
    );
    expect(experienceHtml).toContain("lucide-briefcase");
    expect(experienceHtml).toContain("lucide-graduation-cap");
  });
});

describe("Footer", () => {
  it("renders the typed current tagline in the preserved footer structure", () => {
    const footerHtml = renderToStaticMarkup(<Footer />);
    const footerTag = getOpeningTag(footerHtml, "footer");

    expect(footerHtml).toContain(footerTagline);
    expectClassTokens(footerTag, [
      "border-t",
      "border-border",
      "bg-muted/30",
    ]);
    expect(footerHtml).toContain("Haolin Chen. All rights reserved.");
  });
});
