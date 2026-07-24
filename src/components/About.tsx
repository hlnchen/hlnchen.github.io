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
              I am the founding research scientist at{" "}
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
                My interests lie across language modeling, agentic AI and reinforcement learning.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
