const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-8">
        <div className="text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Haolin Chen. All rights reserved.</p>
          <p className="mt-2">Applied Scientist · AI Research · Machine Learning</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
