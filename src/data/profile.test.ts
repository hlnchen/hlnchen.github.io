import { describe, expect, it } from "vitest";

import { contact, education, publications, workExperience } from "./profile";

describe("profile data", () => {
  it("preserves the complete publication collection and patent metadata", () => {
    const expectedTitles = [
      "Cura 1T: Specialized Model for Agentic Healthcare",
      "χ-Bench: Can AI Agents Automate End-to-End, Long-Horizon, Policy-Rich Healthcare Workflows?",
      "Systems and Methods for Generative Language Model Reasoning Process Optimization",
      "CoDA: Coding LM via Diffusion Adaptation",
      "Webscale-RL: Automated Data Pipeline for Scaling RL Data to Pretraining Levels",
      "Language Models are Hidden Reasoners: Unlocking Latent Reasoning Capabilities via Self-Rewarding",
      "xLAM: A Family of Large Action Models to Empower AI Agent Systems",
      "APIGen-MT: Agentic Pipeline for Multi-Turn Data Generation via Simulated Agent-Human Interplay",
      "Overcomplete order-3 tensor decomposition, blind deconvolution and Gaussian mixture models",
    ];

    expect(publications).toHaveLength(9);
    expect(publications.map(({ title }) => title)).toEqual(expectedTitles);

    const patent = publications.find(({ kind }) => kind === "patent");

    expect(patent).toMatchObject({
      year: "2026",
      type: "Pending Patent Application",
      venue: "U.S. Patent Application Publication No. US 2026/0093997 A1",
    });
    expect(patent?.links[0]?.url).toBe(
      "https://patents.google.com/patent/US20260093997A1/en",
    );
  });

  it("preserves the exact work chronology", () => {
    expect(
      workExperience.map(({ title, company, period }) => ({
        title,
        company,
        period,
      })),
    ).toEqual([
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
      {
        title: "Data Scientist Intern",
        company: "Outreach.io",
        period: "Jul 2021 - Dec 2021",
      },
    ]);
  });

  it("preserves all education entries", () => {
    expect(education).toHaveLength(3);
  });

  it("exposes current contact links", () => {
    expect(contact.email).toBe("cn.holiechen@gmail.com");
    expect(contact.github).toBe("https://github.com/hlnchen");
    expect(contact.linkedin).toBe("https://www.linkedin.com/in/hlnchen/");
    expect(contact.scholar).toBe(
      "https://scholar.google.com/citations?user=l92piNoAAAAJ",
    );
    expect(contact.cv).toBe("/Haolin_Chen_CV.pdf");
  });
});
