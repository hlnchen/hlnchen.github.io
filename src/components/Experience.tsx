import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { education, workExperience } from "@/data/profile";
import { Briefcase, GraduationCap } from "lucide-react";

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
                  key={`${exp.company}-${exp.title}`}
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
                  key={`${edu.institution}-${edu.degree}`}
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
