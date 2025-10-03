import { Card } from "@/components/ui/card";

const projects = {
  latro: {
    name: "LaTRO",
    url: "https://github.com/SalesforceAIResearch/LaTRO"
  },
  webscaleRL: {
    name: "Webscale-RL",
    url: "#"
  },
  coda: {
    name: "CoDA",
    url: "https://github.com/SalesforceAIResearch/CoDA"
  },
  xlam: {
    name: "xLAM",
    url: "https://github.com/SalesforceAIResearch/xLAM"
  },
  apigenMT: {
    name: "APIGen-MT",
    url: "https://arxiv.org/abs/2504.03601"
  }
};

function ProjectLink({ project }: { project: typeof projects[keyof typeof projects] }) {
  return (
    <a href={project.url} className="font-bold text-accent hover:underline">
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
              I am a Senior Applied Scientist at <span className="font-medium text-foreground">Salesforce AI Research</span>.
              Prior to that, I was a Data Scientist at Outreach.io. I received my PhD degree in applied math in 2022,
              advised by Prof. Luis Rademacher.
            </p>

            <Card className="p-6 border border-border bg-card hover:bg-card-hover transition-colors">
              <h3 className="text-xl font-semibold mb-3">Research Interests</h3>
              <p className="text-muted-foreground leading-relaxed">
                At Salesforce AI Research, my focus includes RL & reasoning in LLMs, agentic AI, and diffusion language models.
                On the research side, I led the research of <ProjectLink project={projects.latro} />, an reinforcement learning based method for reasoning in LLMs. I also supervised the research of <ProjectLink project={projects.webscaleRL} />, a framework that synthesizes high quality RL training data at pretraining data scale.
                I lead the development of <ProjectLink project={projects.coda} />, a light-weight diffusion language model for coding.
                I've also worked on <ProjectLink project={projects.xlam} /> model series, a family of advanced LLMs for agentic use case, and <ProjectLink project={projects.apigenMT} />, a framework for systematically synthesize multi-turn agentic trajectories.
                <br />
                <br />
                On the product side, I prototyped various agents for use cases including <span className="italic">sales pitching and planning</span>. I also integrated <ProjectLink project={projects.xlam} /> & <ProjectLink project={projects.apigenMT} /> into Salesforce's environments.
                <br />
                <br />
                During my PhD, I studied the mathematical foundation of machine learning and data sciences and developed algorithms for tensor decomposition.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
