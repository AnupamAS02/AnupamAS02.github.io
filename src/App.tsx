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
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:p-3">Skip to content</a>
      <Navbar />
      <main tabIndex={-1} id="main" className="max-w-[1080px] w-full mx-auto px-6 sm:px-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
      </main>
    </div>
  );
};

export default App;
