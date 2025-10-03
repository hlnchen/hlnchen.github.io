import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, GraduationCap } from "lucide-react";

const workExperience = [
  {
    title: "Applied Scientist",
    company: "Salesforce AI Research",
    period: "Jan 2024 - Present",
    type: "work"
  },
  {
    title: "Data Scientist",
    company: "Outreach.io",
    period: "Aug 2022 - Sep 2023",
    type: "work"
  },
  {
    title: "Data Scientist Intern",
    company: "Outreach.io",
    period: "Jul 2021 - Dec 2021",
    type: "work"
  }
];

const education = [
  {
    degree: "Ph.D in Applied Mathematics",
    institution: "University of California, Davis",
    year: "2022",
    type: "education"
  },
  {
    degree: "B.S. in Mathematics",
    institution: "Nankai University",
    year: "2017",
    type: "education"
  },
  {
    degree: "B.S. in Physics",
    institution: "Nankai University",
    year: "2017",
    type: "education"
  }
];

const Experience = () => {
  return (
    <section id="experience" className="container py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Experience & Education</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Work Experience */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Briefcase className="h-5 w-5 text-accent" />
              <h3 className="text-xl font-semibold">Work Experience</h3>
            </div>
            <div className="space-y-4">
              {workExperience.map((exp, index) => (
                <Card 
                  key={index} 
                  className="hover:shadow-md transition-all duration-300 hover:border-accent animate-slide-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{exp.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground font-medium">{exp.company}</p>
                    <p className="text-sm text-text-subtle mt-1">{exp.period}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Education */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <GraduationCap className="h-5 w-5 text-accent" />
              <h3 className="text-xl font-semibold">Education</h3>
            </div>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <Card 
                  key={index} 
                  className="hover:shadow-md transition-all duration-300 hover:border-accent animate-slide-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{edu.degree}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground font-medium">{edu.institution}</p>
                    <p className="text-sm text-text-subtle mt-1">{edu.year}</p>
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
