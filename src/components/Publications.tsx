import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const publications = [
  {
    title: "Overcomplete order-3 tensor decomposition, blind deconvolution and Gaussian mixture models",
    authors: "Haolin Chen, Luis Rademacher",
    year: "2020",
    link: "https://arxiv.org/abs/2007.08133",
    type: "Preprint"
  },
  {
    title: "Trends in worldwide research in inflammatory bowel disease over the period 2012–2021: A bibliometric study",
    authors: "Li, K., Feng, C., Chen, H., Feng, Y., & Li, J.",
    year: "2022",
    venue: "Frontiers in Medicine",
    type: "Journal Article"
  },
  {
    title: "Exploring the research landscape of the past, present, and future of thyroid nodules",
    authors: "Chen, P., Feng, C., Huang, L., Chen, H., Feng, Y., & Chang, S.",
    year: "2022",
    venue: "Frontiers in Medicine",
    type: "Journal Article"
  },
  {
    title: "A Bibliometric Analysis of the Landscape of Parathyroid Carcinoma Research Based on the PubMed (2000–2021)",
    authors: "Feng, C., Tian, C., Huang, L., Chen, H., Feng, Y., & Chang, S.",
    year: "2022",
    venue: "Frontiers in Oncology",
    type: "Journal Article"
  },
  {
    title: "The Research Landscape of Multiple Endocrine Neoplasia Type 1 (2000–2021): A Bibliometric Analysis",
    authors: "Feng, C., Chen, H., Huang, L., Feng, Y., & Chang, S.",
    year: "2022",
    venue: "Frontiers in Medicine",
    type: "Journal Article"
  },
  {
    title: "Unidirectional Excitation of Radiative-Loss-Free Surface Plasmon Polaritons in PT-Symmetric Systems",
    authors: "Wei Wang, Luqi Wang, Ruidong Xue, Haolin Chen, Ruipeng Guo, Yongmin Liu, and Jing Chen",
    year: "2017",
    venue: "Physical Review Letters",
    type: "Journal Article"
  },
  {
    title: "Localization and oscillation of optical beams in Moiré lattices",
    authors: "Ruidong Xue, Wei Wang, Luqi Wang, Haolin Chen, Ruipeng Guo, and Jing Chen",
    year: "2017",
    venue: "Optics Express",
    type: "Journal Article"
  }
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
