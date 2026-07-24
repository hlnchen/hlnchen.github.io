# Personal Website Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Synchronize the existing personal website with the updated hybrid CV, add Cura 1T, χ-Bench, the pending U.S. patent application, and richer resource icons while preserving the current visual style.

**Architecture:** Keep the current React component hierarchy and Tailwind design tokens. Move factual profile collections into one typed local data module so publications, experience, contact links, and tests share exact values; keep prose and rendering in the existing components. Use Lucide icons already present in the project, and publish the compiled CV as a static PDF asset.

**Tech Stack:** React 18, TypeScript, Vite 5, Tailwind CSS, shadcn/ui, Lucide React, Vitest, React server rendering for component tests, npm.

---

## Prerequisite

Complete the CV plan at `/Users/haolin.chen/repos/cv/docs/superpowers/plans/2026-07-24-cv-refresh.md` first. The website plan compiles that verified source and publishes the result as `/Haolin_Chen_CV.pdf`.

## File Map

- Create: `src/data/profile.ts` — typed contact, project, publication, experience, education, and footer data.
- Create: `src/data/profile.test.ts` — regression tests for required and preserved profile content.
- Create: `src/components/Publications.test.tsx` — static-render regression test for publication links and labels.
- Create: `src/components/ProfileSections.test.tsx` — static-render regression test for the biography, header, roles, footer, and downloadable CV.
- Modify: `src/components/Header.tsx` — current email and CV icon link.
- Modify: `src/components/About.tsx` — current role and actAVA research.
- Modify: `src/components/Publications.tsx` — typed data, authors, multiple resource links, and semantic icons.
- Modify: `src/components/Experience.tsx` — synchronized current role chronology.
- Modify: `src/components/Footer.tsx` — current research-leadership descriptor.
- Modify: `package.json` — Vitest script and dependency.
- Modify: `package-lock.json` — npm-resolved test dependency.
- Create: `public/Haolin_Chen_CV.pdf` — compiled static CV asset.

### Task 1: Add Tested, Typed Profile Data

**Files:**
- Create: `src/data/profile.test.ts`
- Create: `src/data/profile.ts`
- Modify: `package.json:6-12`
- Modify: `package-lock.json`

- [ ] **Step 1: Install the existing dependency tree**

Run:

```bash
npm ci
```

Expected: exit code 0 and a populated `node_modules` directory.

- [ ] **Step 2: Add Vitest and the test script**

Run:

```bash
npm install --save-dev vitest@^2.1.9
```

Add this script to `package.json` after `lint`:

```json
"test": "vitest run",
```

Expected: `package.json` and `package-lock.json` include Vitest.

- [ ] **Step 3: Write the failing profile-data test**

Create `src/data/profile.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import {
  contact,
  education,
  publications,
  workExperience,
} from "./profile";

describe("profile data", () => {
  it("contains all new and previously selected publications", () => {
    const titles = publications.map((publication) => publication.title);

    expect(titles).toEqual(
      expect.arrayContaining([
        "Cura 1T: Specialized Model for Agentic Healthcare",
        "χ-Bench: Can AI Agents Automate End-to-End, Long-Horizon, Policy-Rich Healthcare Workflows?",
        "Systems and Methods for Generative Language Model Reasoning Process Optimization",
        "CoDA: Coding LM via Diffusion Adaptation",
        "Webscale-RL: Automated Data Pipeline for Scaling RL Data to Pretraining Levels",
        "Language Models are Hidden Reasoners: Unlocking Latent Reasoning Capabilities via Self-Rewarding",
        "xLAM: A Family of Large Action Models to Empower AI Agent Systems",
        "APIGen-MT: Agentic Pipeline for Multi-Turn Data Generation via Simulated Agent-Human Interplay",
        "Overcomplete order-3 tensor decomposition, blind deconvolution and Gaussian mixture models",
      ]),
    );
    expect(publications).toHaveLength(9);
  });

  it("labels the patent as a pending application", () => {
    const patent = publications.find(
      (publication) => publication.kind === "patent",
    );

    expect(patent).toMatchObject({
      year: "2026",
      type: "Pending Patent Application",
      venue: "U.S. Patent Application Publication No. US 2026/0093997 A1",
    });
    expect(patent?.links[0].url).toBe(
      "https://patents.google.com/patent/US20260093997A1/en",
    );
  });

  it("keeps the current role chronology and existing education", () => {
    expect(workExperience.map(({ title, period }) => ({ title, period }))).toEqual([
      { title: "Head of Research", period: "Mar 2026 - Present" },
      { title: "Senior Applied Scientist", period: "Aug 2025 - Feb 2026" },
      { title: "Applied Scientist", period: "Jan 2024 - Jul 2025" },
      { title: "Data Scientist", period: "Aug 2022 - Sep 2023" },
    ]);
    expect(education).toHaveLength(3);
  });

  it("uses the CV contact information", () => {
    expect(contact.email).toBe("cn.holiechen@gmail.com");
    expect(contact.scholar).toContain("user=l92piNoAAAAJ");
    expect(contact.cv).toBe("/Haolin_Chen_CV.pdf");
  });
});
```

- [ ] **Step 4: Run the test to verify it fails**

Run:

```bash
npm test -- src/data/profile.test.ts
```

Expected: FAIL because `./profile` does not exist.

- [ ] **Step 5: Create the typed profile data**

Create `src/data/profile.ts`:

```ts
export type PublicationKind = "paper" | "patent";
export type ResourceKind = "paper" | "code" | "dataset" | "patent";

export interface ResourceLink {
  label: string;
  url: string;
  kind: ResourceKind;
}

export type NonEmptyArray<T> = [T, ...T[]];

export interface Publication {
  title: string;
  authors: string;
  year: string;
  venue: string;
  type: string;
  kind: PublicationKind;
  links: NonEmptyArray<ResourceLink>;
}

export interface Project {
  name: string;
  url: string;
}

export const contact = {
  email: "cn.holiechen@gmail.com",
  github: "https://github.com/hlnchen",
  linkedin: "https://www.linkedin.com/in/hlnchen/",
  scholar: "https://scholar.google.com/citations?user=l92piNoAAAAJ",
  cv: "/Haolin_Chen_CV.pdf",
} as const;

export const projects = {
  cura: {
    name: "Cura 1T",
    url: "https://arxiv.org/abs/2607.15314",
  },
  chiBench: {
    name: "χ-Bench",
    url: "https://arxiv.org/abs/2605.16679",
  },
  latro: {
    name: "LaTRO",
    url: "https://github.com/SalesforceAIResearch/LaTRO",
  },
  webscaleRL: {
    name: "Webscale-RL",
    url: "https://huggingface.co/datasets/Salesforce/Webscale-RL",
  },
  coda: {
    name: "CoDA",
    url: "https://github.com/SalesforceAIResearch/CoDA",
  },
  xlam: {
    name: "xLAM",
    url: "https://github.com/SalesforceAIResearch/xLAM",
  },
  apigenMT: {
    name: "APIGen-MT",
    url: "https://arxiv.org/abs/2504.03601",
  },
} satisfies Record<string, Project>;

export const publications: Publication[] = [
  {
    title: "Cura 1T: Specialized Model for Agentic Healthcare",
    authors:
      "Haolin Chen, Leon Qi, Steve Brown, Deon Metelski, Tao Xia, Joonyul Lee, Qixuan Wang, Kevin Riley, Frank Wang, and Weiran Yao",
    year: "2026",
    venue: "arXiv preprint",
    type: "Technical Report",
    kind: "paper",
    links: [
      {
        label: "Paper",
        url: "https://arxiv.org/abs/2607.15314",
        kind: "paper",
      },
    ],
  },
  {
    title:
      "χ-Bench: Can AI Agents Automate End-to-End, Long-Horizon, Policy-Rich Healthcare Workflows?",
    authors: "Haolin Chen et al.",
    year: "2026",
    venue: "arXiv preprint",
    type: "Preprint",
    kind: "paper",
    links: [
      {
        label: "Paper",
        url: "https://arxiv.org/abs/2605.16679",
        kind: "paper",
      },
    ],
  },
  {
    title:
      "Systems and Methods for Generative Language Model Reasoning Process Optimization",
    authors:
      "Haolin Chen, Yihao Feng, Akshara Prabhakar, Zuxin Liu, Weiran Yao, Ricky Ho, Lik Mui, Silvio Savarese, Huan Wang, and Caiming Xiong",
    year: "2026",
    venue: "U.S. Patent Application Publication No. US 2026/0093997 A1",
    type: "Pending Patent Application",
    kind: "patent",
    links: [
      {
        label: "Patent",
        url: "https://patents.google.com/patent/US20260093997A1/en",
        kind: "patent",
      },
    ],
  },
  {
    title: "CoDA: Coding LM via Diffusion Adaptation",
    authors:
      "Haolin Chen, Shiyu Wang, Can Qin, Bo Pang, Zuxin Liu, Jielin Qiu, Jianguo Zhang, Yuyu Zhou, Zeyuan Chen, Ran Xu, Shelby Heinecke, Silvio Savarese, Caiming Xiong, Huan Wang, and Weiran Yao",
    year: "2025",
    venue: "arXiv preprint",
    type: "Technical Report",
    kind: "paper",
    links: [
      {
        label: "Paper",
        url: "https://arxiv.org/abs/2510.03270",
        kind: "paper",
      },
      {
        label: "Code",
        url: "https://github.com/SalesforceAIResearch/CoDA",
        kind: "code",
      },
    ],
  },
  {
    title:
      "Webscale-RL: Automated Data Pipeline for Scaling RL Data to Pretraining Levels",
    authors:
      "Zhepeng Cen, Haolin Chen, Shiyu Wang, Zuxin Liu, Zhiwei Liu, Ding Zhao, Caiming Xiong, Huan Wang, and Weiran Yao",
    year: "2026",
    venue: "ICLR 2026",
    type: "Conference Paper",
    kind: "paper",
    links: [
      {
        label: "Paper",
        url: "https://arxiv.org/abs/2510.06499",
        kind: "paper",
      },
      {
        label: "Code",
        url: "https://github.com/SalesforceAIResearch/PretrainRL-pipeline",
        kind: "code",
      },
      {
        label: "Dataset",
        url: "https://huggingface.co/datasets/Salesforce/Webscale-RL",
        kind: "dataset",
      },
    ],
  },
  {
    title:
      "Language Models are Hidden Reasoners: Unlocking Latent Reasoning Capabilities via Self-Rewarding",
    authors:
      "Haolin Chen, Yihao Feng, Zuxin Liu, Weiran Yao, Akshara Prabhakar, Shelby Heinecke, Ricky Ho, Phil Mui, Silvio Savarese, Caiming Xiong, and Huan Wang",
    year: "2024",
    venue: "arXiv preprint",
    type: "Preprint",
    kind: "paper",
    links: [
      {
        label: "Paper",
        url: "https://arxiv.org/abs/2411.04282",
        kind: "paper",
      },
      {
        label: "Code",
        url: "https://github.com/SalesforceAIResearch/LaTRO",
        kind: "code",
      },
    ],
  },
  {
    title: "xLAM: A Family of Large Action Models to Empower AI Agent Systems",
    authors:
      "Jianguo Zhang, Tian Lan, Ming Zhu, Zuxin Liu, Thai Hoang, Shirley Kokane, Weiran Yao, Juntao Tan, Akshara Prabhakar, Haolin Chen, Zhiwei Liu, Yihao Feng, Tulika Awalgaonkar, Rithesh Murthy, Eric Hu, Zeyuan Chen, Ran Xu, Juan Carlos Niebles, Shelby Heinecke, Huan Wang, Silvio Savarese, and Caiming Xiong",
    year: "2024",
    venue: "arXiv preprint",
    type: "Technical Report",
    kind: "paper",
    links: [
      {
        label: "Paper",
        url: "https://arxiv.org/abs/2409.03215",
        kind: "paper",
      },
      {
        label: "Code",
        url: "https://github.com/SalesforceAIResearch/xLAM",
        kind: "code",
      },
    ],
  },
  {
    title:
      "APIGen-MT: Agentic Pipeline for Multi-Turn Data Generation via Simulated Agent-Human Interplay",
    authors:
      "Akshara Prabhakar, Zuxin Liu, Ming Zhu, Jianguo Zhang, Tulika Awalgaonkar, Shiyu Wang, Zhiwei Liu, Haolin Chen, et al.",
    year: "2025",
    venue: "NeurIPS 2025 Datasets & Benchmarks Track",
    type: "Conference Paper",
    kind: "paper",
    links: [
      {
        label: "Paper",
        url: "https://arxiv.org/abs/2504.03601",
        kind: "paper",
      },
    ],
  },
  {
    title:
      "Overcomplete order-3 tensor decomposition, blind deconvolution and Gaussian mixture models",
    authors: "Haolin Chen and Luis Rademacher",
    year: "2022",
    venue: "SIAM Journal on Mathematics of Data Science",
    type: "Journal Article",
    kind: "paper",
    links: [
      {
        label: "Paper",
        url: "https://arxiv.org/abs/2007.08133",
        kind: "paper",
      },
    ],
  },
];

export const workExperience = [
  {
    title: "Head of Research",
    company: "actAVA AI",
    period: "Mar 2026 - Present",
  },
  {
    title: "Senior Applied Scientist",
    company: "Salesforce AI Research",
    period: "Aug 2025 - Feb 2026",
  },
  {
    title: "Applied Scientist",
    company: "Salesforce AI Research",
    period: "Jan 2024 - Jul 2025",
  },
  {
    title: "Data Scientist",
    company: "Outreach.io",
    period: "Aug 2022 - Sep 2023",
  },
] as const;

export const education = [
  {
    degree: "Ph.D. in Applied Mathematics",
    institution: "University of California, Davis",
    year: "2022",
  },
  {
    degree: "B.S. in Mathematics",
    institution: "Nankai University",
    year: "2017",
  },
  {
    degree: "B.S. in Physics",
    institution: "Nankai University",
    year: "2017",
  },
] as const;

export const footerTagline =
  "Research Leadership · Agentic AI · Large Language Models";
```

- [ ] **Step 6: Run the data test**

Run:

```bash
npm test -- src/data/profile.test.ts
```

Expected: four passing tests.

- [ ] **Step 7: Commit the tested data model**

```bash
git add package.json package-lock.json src/data/profile.ts src/data/profile.test.ts
git commit -m "test: add typed profile content"
```

### Task 2: Render Publications and Patent Resources with Icons

**Files:**
- Create: `src/components/Publications.test.tsx`
- Modify: `src/components/Publications.tsx:1-104`

- [ ] **Step 1: Write the failing publication-rendering test**

Create `src/components/Publications.test.tsx`:

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import Publications from "./Publications";

describe("Publications", () => {
  it("renders current research, preserved work, and labeled resource links", () => {
    const html = renderToStaticMarkup(<Publications />);

    expect(html).toContain("Cura 1T");
    expect(html).toContain("χ-Bench");
    expect(html).toContain("US 2026/0093997 A1");
    expect(html).toContain("Overcomplete order-3 tensor decomposition");
    expect(html).toContain(">Paper<");
    expect(html).toContain(">Code<");
    expect(html).toContain(">Dataset<");
    expect(html).toContain(">Patent<");
    expect(html).toContain('rel="noopener noreferrer"');
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npm test -- src/components/Publications.test.tsx
```

Expected: FAIL because the current component does not render Cura 1T.

- [ ] **Step 3: Replace the component with the typed, icon-enriched renderer**

Replace `src/components/Publications.tsx` with:

```tsx
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
```

- [ ] **Step 4: Run the publication test**

Run:

```bash
npm test -- src/components/Publications.test.tsx
```

Expected: one passing test.

- [ ] **Step 5: Commit the publication renderer**

```bash
git add src/components/Publications.tsx src/components/Publications.test.tsx
git commit -m "feat: update website publications"
```

### Task 3: Synchronize Header, Biography, Experience, and Footer

**Files:**
- Create: `src/components/ProfileSections.test.tsx`
- Modify: `src/components/Header.tsx:1-73`
- Modify: `src/components/About.tsx:1-77`
- Modify: `src/components/Experience.tsx:1-108`
- Modify: `src/components/Footer.tsx:1-14`

- [ ] **Step 1: Write the failing profile-section test**

Create `src/components/ProfileSections.test.tsx`:

```tsx
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import About from "./About";
import Experience from "./Experience";
import Footer from "./Footer";
import Header from "./Header";

describe("profile sections", () => {
  it("renders current contact links and downloadable CV", () => {
    const html = renderToStaticMarkup(<Header />);

    expect(html).toContain("mailto:cn.holiechen@gmail.com");
    expect(html).toContain('href="/Haolin_Chen_CV.pdf"');
    expect(html).toContain('aria-label="Download CV"');
  });

  it("renders the current role and research focus", () => {
    const html = renderToStaticMarkup(<About />);

    expect(html).toContain("Head of Research");
    expect(html).toContain("actAVA AI");
    expect(html).toContain("Cura 1T");
    expect(html).toContain("χ-Bench");
    expect(html).toContain("LaTRO");
    expect(html).toContain("APIGen-MT");
  });

  it("renders the full current role chronology", () => {
    const html = renderToStaticMarkup(<Experience />);

    expect(html).toContain("Mar 2026 - Present");
    expect(html).toContain("Aug 2025 - Feb 2026");
    expect(html).toContain("Jan 2024 - Jul 2025");
    expect(html).toContain("Ph.D. in Applied Mathematics");
  });

  it("renders the current footer descriptor", () => {
    const html = renderToStaticMarkup(<Footer />);

    expect(html).toContain(
      "Research Leadership · Agentic AI · Large Language Models",
    );
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
npm test -- src/components/ProfileSections.test.tsx
```

Expected: FAIL because the header still uses the Salesforce email and the About section still identifies the role as Senior Applied Scientist.

- [ ] **Step 3: Update the header without changing its layout**

Replace `src/components/Header.tsx` with:

```tsx
import { contact } from "@/data/profile";
import { BookOpen, FileText, Github, Linkedin, Mail } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Haolin Chen</h1>
        </div>

        <nav className="flex items-center gap-6">
          <a
            href="#about"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </a>
          <a
            href="#publications"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Publications
          </a>
          <a
            href="#experience"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Experience
          </a>

          <div className="flex items-center gap-3 ml-4 border-l border-border pl-4">
            <a
              href={`mailto:${contact.email}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={contact.scholar}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Google Scholar"
            >
              <BookOpen className="h-4 w-4" />
            </a>
            <a
              href={contact.cv}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Download CV"
            >
              <FileText className="h-4 w-4" />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
```

- [ ] **Step 4: Update About while preserving the portrait and card treatment**

Replace `src/components/About.tsx` with:

```tsx
import { Card } from "@/components/ui/card";
import { projects, type Project } from "@/data/profile";

function ProjectLink({ project }: { project: Project }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="font-bold text-accent hover:underline"
    >
      {project.name}
    </a>
  );
}

const About = () => {
  return (
    <section id="about" className="container py-16 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-shrink-0">
            <img
              src="/thumbnail.jpg"
              alt="Haolin Chen"
              className="w-32 h-32 rounded-full object-cover border-4 border-card shadow-lg"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">About Me</h2>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              I am Head of Research at{" "}
              <span className="font-medium text-foreground">actAVA AI</span>,
              where I lead research on specialized language models and agentic
              healthcare systems. Previously, I was a Senior Applied Scientist at
              Salesforce AI Research and a Data Scientist at Outreach.io. I
              received my Ph.D. in applied mathematics in 2022, advised by Prof.
              Luis Rademacher.
            </p>

            <Card className="p-6 border border-border bg-card hover:bg-card-hover transition-colors">
              <h3 className="text-xl font-semibold mb-3">Research Interests</h3>
              <p className="text-muted-foreground leading-relaxed">
                At actAVA AI, I lead <ProjectLink project={projects.cura} />, a
                healthcare-specialized language model, and{" "}
                <ProjectLink project={projects.chiBench} />, a benchmark for
                long-horizon, policy-rich healthcare workflows.
                <br />
                <br />
                At Salesforce AI Research, I led{" "}
                <ProjectLink project={projects.latro} />, a reinforcement
                learning method for reasoning in language models; supervised{" "}
                <ProjectLink project={projects.webscaleRL} />, a framework for
                synthesizing RL training data at pretraining scale; and led{" "}
                <ProjectLink project={projects.coda} />, a lightweight diffusion
                language model for coding. I also worked on the{" "}
                <ProjectLink project={projects.xlam} /> model family and{" "}
                <ProjectLink project={projects.apigenMT} />, a framework for
                synthesizing multi-turn agent trajectories.
                <br />
                <br />
                On the product side, I prototyped agents for sales pitching,
                planning, and customer-service use cases, and integrated xLAM and
                APIGen-MT into Salesforce environments. During my Ph.D., I studied
                the mathematical foundations of machine learning and developed
                algorithms for tensor decomposition.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
```

- [ ] **Step 5: Update Experience to render the synchronized data**

Replace `src/components/Experience.tsx` with:

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { education, workExperience } from "@/data/profile";
import { Briefcase, GraduationCap } from "lucide-react";

const Experience = () => {
  return (
    <section id="experience" className="container py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Experience & Education</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Briefcase className="h-5 w-5 text-accent" />
              <h3 className="text-xl font-semibold">Work Experience</h3>
            </div>
            <div className="space-y-4">
              {workExperience.map((experience, index) => (
                <Card
                  key={`${experience.company}-${experience.title}`}
                  className="hover:shadow-md transition-all duration-300 hover:border-accent animate-slide-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {experience.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground font-medium">
                      {experience.company}
                    </p>
                    <p className="text-sm text-text-subtle mt-1">
                      {experience.period}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="h-5 w-5 text-accent" />
              <h3 className="text-xl font-semibold">Education</h3>
            </div>
            <div className="space-y-4">
              {education.map((item, index) => (
                <Card
                  key={`${item.institution}-${item.degree}`}
                  className="hover:shadow-md transition-all duration-300 hover:border-accent animate-slide-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{item.degree}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground font-medium">
                      {item.institution}
                    </p>
                    <p className="text-sm text-text-subtle mt-1">
                      {item.year}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
```

- [ ] **Step 6: Update the footer descriptor**

Replace `src/components/Footer.tsx` with:

```tsx
import { footerTagline } from "@/data/profile";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-8">
        <div className="text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Haolin Chen. All rights reserved.</p>
          <p className="mt-2">{footerTagline}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
```

- [ ] **Step 7: Run the profile-section and data tests**

Run:

```bash
npm test -- src/components/ProfileSections.test.tsx src/data/profile.test.ts
```

Expected: eight passing tests.

- [ ] **Step 8: Commit the synchronized profile sections**

```bash
git add src/components/Header.tsx src/components/About.tsx src/components/Experience.tsx src/components/Footer.tsx src/components/ProfileSections.test.tsx
git commit -m "feat: synchronize website profile with CV"
```

### Task 4: Publish the Verified CV PDF

**Files:**
- Modify: `src/components/ProfileSections.test.tsx`
- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `public/Haolin_Chen_CV.pdf`
- Read: `/Users/haolin.chen/repos/cv/.worktrees/cv-refresh/main.tex`

**Published asset provenance:**

- Source worktree: `/Users/haolin.chen/repos/cv/.worktrees/cv-refresh`
- Source commit: `3afecef5267d320125a78ad6db5b4dcfaf25dfe6`
- Engine: `latexmk -lualatex`
- Output: a searchable, three-page Letter PDF copied to
  `public/Haolin_Chen_CV.pdf`
- xLAM citation: `2024 arXiv technical report, arXiv:2409.03215.`

- [ ] **Step 1: Add a failing parser-backed asset test**

Install `pdfjs-dist` as a development dependency and add a test that parses the
asset in Node without Poppler. Assert exactly three pages and extracted text for
Cura 1T, χ-Bench, `US 2026/0093997 A1`, `arXiv:2409.03215`, and the preserved
order-3 tensor publication. Include a corrupt, PDF-sized fixture that preserves
the `%PDF-` header and `%%EOF` marker so the old shallow checks pass while the
parser rejects it.

- [ ] **Step 2: Run the test to verify the shallow implementation fails**

Run:

```bash
npm test -- src/components/ProfileSections.test.tsx
```

Expected: FAIL because shallow header and size checks cannot report page count,
extract the required text, or reject the corrupt fixture.

- [ ] **Step 3: Compile the CV from the verified source**

Run:

```bash
website_cv_source_dir=/Users/haolin.chen/repos/cv/.worktrees/cv-refresh
website_cv_source_commit=3afecef5267d320125a78ad6db5b4dcfaf25dfe6
test "$(git -C "$website_cv_source_dir" rev-parse HEAD)" = \
  "$website_cv_source_commit"
mkdir -p tmp/pdfs
website_cv_build_dir=$(mktemp -d "$PWD/tmp/pdfs/website-cv-build.XXXXXX")
latexmk -lualatex -interaction=nonstopmode -halt-on-error \
  -output-directory="$website_cv_build_dir" \
  "$website_cv_source_dir/main.tex"
test -s "$website_cv_build_dir/main.pdf"
cp "$website_cv_build_dir/main.pdf" public/Haolin_Chen_CV.pdf
```

Expected: exit code 0 and a nonempty `public/Haolin_Chen_CV.pdf`.

- [ ] **Step 4: Run the asset and profile tests**

Run:

```bash
npm test -- src/components/ProfileSections.test.tsx
```

Expected: fourteen passing tests, including parser-backed page-count, text, and
corruption checks.

- [ ] **Step 5: Confirm the published PDF contains the new entries**

Run:

```bash
pdftotext public/Haolin_Chen_CV.pdf - | rg 'Cura 1T|Bench: Can AI Agents|US 2026/0093997 A1'
```

Expected: all three patterns appear.

- [ ] **Step 6: Commit the downloadable CV**

```bash
git add public/Haolin_Chen_CV.pdf src/components/ProfileSections.test.tsx \
  package.json package-lock.json \
  docs/superpowers/plans/2026-07-24-personal-website-refresh.md
git commit -m "feat: publish refreshed CV PDF"
```

### Task 5: Run Full Verification and Inspect Responsive Layouts

**Files:**
- Inspect: all modified source files.
- Inspect: production build output.
- Do not change design tokens or component layout unless verification reveals a regression introduced by this work.

- [ ] **Step 1: Run all automated tests**

Run:

```bash
npm test
```

Expected: all profile-data and static-render tests pass.

- [ ] **Step 2: Run the linter**

Run:

```bash
npm run lint
```

Expected: exit code 0. If the repository has pre-existing lint failures, record them separately and fix only failures introduced by this implementation.

- [ ] **Step 3: Run the production build**

Run:

```bash
npm run build
```

Expected: exit code 0 and a generated `dist` directory.

- [ ] **Step 4: Start the local preview**

Run:

```bash
npm run dev -- --host 127.0.0.1
```

Expected: Vite reports a local HTTP URL. Keep the process running for browser inspection.

- [ ] **Step 5: Inspect desktop layout**

Open the local URL at a 1440×1000 viewport and verify:

- The existing sticky header, purple accent, portrait, cards, spacing, and two-column publication grid remain.
- The new CV icon aligns with the existing social icons.
- Cura 1T, χ-Bench, and the patent appear first.
- Authors, venues, types, and resource links wrap without overlap.
- The patent is visibly labeled `Pending Patent Application`.
- All existing publication cards remain.

- [ ] **Step 6: Inspect mobile layout**

Open the local URL at a 390×844 viewport and verify:

- The page has no horizontal scrolling.
- Header links and icons remain usable.
- Publication metadata and resource links wrap within cards.
- Experience and education collapse to one column as before.
- The portrait and About text remain readable.

- [ ] **Step 7: Verify link behavior**

Check the email, GitHub, LinkedIn, Scholar, CV, paper, code, dataset, and patent links. Expected:

- Email uses `mailto:cn.holiechen@gmail.com`.
- External links open in a new tab and include `rel="noopener noreferrer"`.
- `/Haolin_Chen_CV.pdf` opens the updated PDF.
- The patent link opens publication `US20260093997A1`.

- [ ] **Step 8: Run the final verification suite**

Run:

```bash
npm test
npm run lint
npm run build
git status --short
```

Expected: tests, lint, and build succeed. Git status shows only intentional implementation changes, if any remain uncommitted.
