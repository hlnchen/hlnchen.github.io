import { Github, Linkedin, Mail, BookOpen } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-semibold">Haolin Chen</h1>
        </div>
        
        <nav className="flex items-center gap-6">
          <a 
            href="#about" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            About
          </a>
          <a 
            href="#publications" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Publications
          </a>
          <a 
            href="#experience" 
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Experience
          </a>
          
          <div className="flex items-center gap-3 ml-4 border-l border-border pl-4">
            <a 
              href="mailto:haolin.chen@salesforce.com" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a 
              href="https://github.com/hlnchen" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a 
              href="https://www.linkedin.com/in/haolin-chen/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a 
              href="https://scholar.google.com/citations?user=YOUR_ID" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Google Scholar"
            >
              <BookOpen className="h-4 w-4" />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
