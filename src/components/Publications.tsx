import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const publications = [
  {
    title: "CoDA: Coding LM via Diffusion Adaptation",
    year: "2025",
    link: "https://www.arxiv.org/abs/2510.03270",
    venue: "Salesforce AI Research",
    type: "Technical Report"
  },
  {
    title: "Webscale-RL: Automated Data Pipeline for Scaling RL Data to Pretraining Levels",
    year: "2025",
    link: "https://huggingface.co/papers/2510.06499",
    venue: "arXiv preprint",
    type: "Preprint"
  },
    {
    title: "Language Models are Hidden Reasoners: Unlocking Latent Reasoning Capabilities via Self-Rewarding",
    year: "2024",
    link: "https://arxiv.org/abs/2411.04282",
    venue: "arXiv preprint",
    type: "Preprint"
  },
  {
    title: "xLAM: A Family of Large Action Models to Empower AI Agent Systems",
    year: "2024",
    link: "https://arxiv.org/abs/2409.03215",
    venue: "arXiv preprint",
    type: "Preprint"
  },
  {
    title: "APIGen-MT: Agentic Pipeline for Multi-Turn Data Generation via Simulated Agent-Human Interplay",
    year: "2025",
    link: "https://arxiv.org/abs/2504.03601",
    venue: "arXiv preprint",
    type: "Preprint"
  },
  {
    title: "Overcomplete order-3 tensor decomposition, blind deconvolution and Gaussian mixture models",
    year: "2020",
    link: "https://arxiv.org/abs/2007.08133",
    venue: "SIAM Journal on Mathematics of Data Science",
    type: "Journal Article"
  },
];

const Publications = () => {
  return (
    <section id="publications" className="container py-16 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Selected Publications</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {publications.map((pub, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-lg transition-all duration-300 hover:border-accent animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg leading-tight group-hover:text-accent transition-colors">
                    {pub.title}
                  </CardTitle>
                  {pub.link && (
                    <a 
                      href={pub.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-accent transition-colors flex-shrink-0"
                      aria-label="View publication"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
                <CardDescription className="text-sm">
                  {pub.authors}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 text-sm">
                  <span className="px-2 py-1 rounded-md bg-secondary text-secondary-foreground font-medium">
                    {pub.year}
                  </span>
                  {pub.venue && (
                    <span className="text-muted-foreground">{pub.venue}</span>
                  )}
                  {pub.type && (
                    <span className="text-xs text-text-subtle">{pub.type}</span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Publications;
