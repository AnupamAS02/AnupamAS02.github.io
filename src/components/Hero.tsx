import { ArrowDown, ArrowUpRight, Terminal } from "lucide-react";
import Button from "./Button";

const Hero = () => (
  <header tabIndex={-1} id="top" className="pt-36 pb-16 sm:pt-44 sm:pb-20">
    <div className="font-mono text-xs sm:text-sm text-accent mb-8 flex items-center gap-3">
      <Terminal size={17} aria-hidden="true" />
      <span>anupam@portfolio:~$ whoami</span>
    </div>
    <div className="grid lg:grid-cols-[1fr_340px] items-center gap-12 lg:gap-14">
      <div className="flex flex-col items-start gap-6">
        <p className="font-mono text-xs sm:text-sm text-subtle">Cybersecurity Analyst / Penetration Tester</p>
        <h1 className="text-5xl sm:text-7xl xl:text-8xl font-tanker leading-none">I’m Anupam Singh<span className="text-accent">.</span></h1>
        <h2 className="text-2xl sm:text-3xl font-bold leading-snug">My focus is web application and API security.</h2>
        <p className="text-subtle leading-relaxed max-w-[600px]">
          I assess vulnerabilities and business logic flaws, document findings,
          and work with developers to validate fixes. Explore my experience and
          skills, or email me to discuss your product team’s security needs.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-3 items-center">
          <Button href="#contact" className="h-12 px-6 gap-3 font-semibold">Contact Anupam <ArrowUpRight size={18} aria-hidden="true" /></Button>
          <a href="#projects" className="inline-flex items-center gap-2 min-h-11 text-sm font-mono hover:text-accent">Explore my work <ArrowDown size={16} aria-hidden="true" /></a>
        </div>
        <p className="text-subtle text-sm leading-relaxed border-l-2 border-accent pl-4 max-w-[600px]">
          Any testing requires written authorisation from the system owner and an
          agreed scope. We can discuss fit, scope, and availability before planning an assessment.
        </p>
      </div>
      <figure className="terminal-panel w-full max-w-[400px] mx-auto">
        <div className="terminal-bar"><span aria-hidden="true" className="text-accent">[ ~/profile ]</span><span>anupam.jpg</span></div>
        <img src="/profile.png" alt="Anupam Singh" width="400" height="400" className="h-[320px] sm:h-[360px] w-full object-cover object-top" fetchPriority="high" />
        <figcaption className="p-5 font-mono text-xs leading-relaxed border-t border-secondary">
          <p className="text-accent">// Security research &amp; responsible testing</p>
          <p className="text-subtle mt-2">Web applications · APIs · Business logic</p>
        </figcaption>
      </figure>
    </div>
    <div className="mt-14 pt-6 border-t border-secondary font-mono text-xs sm:text-sm flex flex-wrap gap-x-8 gap-y-3 text-subtle">
      <span className="text-accent">focus_areas:</span><span>Web applications</span><span>API security</span><span>Remediation validation</span>
    </div>
  </header>
);

export default Hero;
