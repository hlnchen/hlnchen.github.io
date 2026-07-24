import { contact } from "@/data/profile";
import { BookOpen, FileText, Github, Linkedin, Mail } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Haolin Chen</h1>
        </div>

        <nav className="flex items-center gap-2 sm:gap-6">
          <a
            href="#about"
            className="hidden text-sm font-medium text-muted-foreground hover:text-foreground transition-colors sm:inline"
          >
            About
          </a>
          <a
            href="#publications"
            className="hidden text-sm font-medium text-muted-foreground hover:text-foreground transition-colors sm:inline"
          >
            Publications
          </a>
          <a
            href="#experience"
            className="hidden text-sm font-medium text-muted-foreground hover:text-foreground transition-colors sm:inline"
          >
            Experience
          </a>

          <div className="flex items-center gap-2 sm:ml-4 sm:gap-3 sm:border-l sm:border-border sm:pl-4">
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
