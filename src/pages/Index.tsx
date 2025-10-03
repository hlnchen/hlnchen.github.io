import Header from "@/components/Header";
import About from "@/components/About";
import Publications from "@/components/Publications";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <About />
        <Publications />
        <Experience />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
