import { Card } from "@/components/ui/card";

const About = () => {
  return (
    <section id="about" className="container py-16 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-shrink-0">
            <img 
              src="https://avatars.githubusercontent.com/u/YOUR_GITHUB_ID" 
              alt="Haolin Chen"
              className="w-32 h-32 rounded-full object-cover border-4 border-card shadow-lg"
            />
          </div>
          
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">About Me</h2>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              I am an Applied Scientist at <span className="font-medium text-foreground">Salesforce AI Research</span>. 
              Prior to that, I was a Data Scientist at Outreach.io. I received my PhD degree in applied math in 2022, 
              advised by Prof. Luis Rademacher.
            </p>
            
            <Card className="p-6 border border-border bg-card hover:bg-card-hover transition-colors">
              <h3 className="text-xl font-semibold mb-3">Research Interests</h3>
              <p className="text-muted-foreground leading-relaxed">
                During my PhD, I studied the mathematical foundation of machine learning and data sciences. 
                Currently, my focus is on building <span className="font-medium text-foreground">autonomous AI agents</span>. 
                I am interested in different areas of AI/ML, including learning the representation of data, 
                high dimension statistics, natural language processing and large language models.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
