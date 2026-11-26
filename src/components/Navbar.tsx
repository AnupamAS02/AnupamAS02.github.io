import { useState } from "react";

const navLinks = [
  { id: "about", title: "About" },
  { id: "experience", title: "Experience" },
  { id: "projects", title: "Projects" },
  { id: "certifications", title: "Certifications" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 z-10 left-0 w-full bg-background/95 border-b border-subtle/15 backdrop-blur-md">
      <nav aria-label="Main navigation" className="max-w-[1200px] mx-auto px-6 sm:px-10 py-4 flex flex-wrap items-center justify-between gap-4">
        <a href="#top" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 font-bold text-sm sm:text-base">
          <img src="/logo.svg" alt="" className="w-9 h-9" />
          AnupamAS02.github.io
        </a>
        <button
          type="button"
          className="lg:hidden border border-subtle/30 rounded-lg px-3 min-h-11 text-sm font-semibold"
          aria-expanded={menuOpen}
          aria-controls="navigation-links"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "Close menu" : "Menu"}
        </button>
        <div id="navigation-links" className={`${menuOpen ? "flex" : "hidden"} lg:flex w-full lg:w-auto flex-col lg:flex-row lg:items-center gap-2 lg:gap-6`}>
          {navLinks.map((link) => (
            <a key={link.id} href={`#${link.id}`} onClick={() => setMenuOpen(false)} className="font-semibold text-sm py-3 hover:underline underline-offset-4">
              {link.title}
            </a>
          ))}
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="text-sm py-3 hover:underline underline-offset-4">
            Résumé (PDF)
          </a>
          <a href="#contact" onClick={() => setMenuOpen(false)} className="bg-accent text-foreground rounded-lg px-5 py-3 font-semibold text-sm w-fit">
            Contact Anupam
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
