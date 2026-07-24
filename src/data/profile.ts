export type PublicationKind = "paper" | "patent";
export type ResourceKind = "paper" | "code" | "dataset" | "patent";

export interface ResourceLink {
  label: string;
  url: string;
  kind: ResourceKind;
}

export interface Publication {
  title: string;
  authors: string;
  year: number;
  venue: string;
  type: string;
  kind: PublicationKind;
  links: ResourceLink[];
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
    year: 2026,
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
    year: 2026,
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
    year: 2026,
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
    year: 2025,
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
    year: 2026,
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
    year: 2024,
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
      "Jianguo Zhang, Tian Lan, Ming Zhu, Zuxin Liu, Thai Hoang, Sachin Kokane, Weiran Yao, Juntao Tan, Akshara Prabhakar, Haolin Chen, et al.",
    year: 2025,
    venue: "NAACL 2025",
    type: "Conference Paper",
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
    year: 2025,
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
    year: 2022,
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
  {
    title: "Data Scientist Intern",
    company: "Outreach.io",
    period: "Jul 2021 - Dec 2021",
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
