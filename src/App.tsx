import About from "@components/About";
import Certifications from "@components/Certifications";
import Contact from "@components/Contact";
import Experience from "@components/Experience";
import Hero from "@components/Hero";
import Navbar from "@components/Navbar";
import Projects from "@components/Projects";

const App = () => {
  return (
    <div className="relative min-h-screen w-full">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-background focus:text-accent focus:p-3">Skip to content</a>
      <Navbar />
      <main tabIndex={-1} id="main" className="max-w-[1200px] w-full mx-auto px-6 sm:px-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
      </main>
      <footer className="border-t border-secondary">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10 py-8 font-mono text-xs text-subtle flex flex-wrap justify-between gap-4">
          <span>AnupamAS02.github.io</span>
          <a href="#top" className="text-accent hover:underline">↑ back_to_top</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
