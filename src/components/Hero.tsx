import { ArrowDown, ArrowUpRight } from "lucide-react";
import Button from "./Button";

const Hero = () => (
  <header tabIndex={-1} id="top" className="reference-hero pt-36 pb-16 sm:pt-44 sm:pb-20 text-center">
    <div className="relative flex flex-col items-center gap-7 sm:gap-8">
      <p className="research-badge"><span aria-hidden="true" />Cybersecurity Analyst · Penetration Tester</p>
      <h1 className="hero-heading">I’m Anupam Singh.<br /><span className="text-accent">Web &amp; API security.<span aria-hidden="true" className="terminal-cursor">_</span></span></h1>
      <p className="text-subtle text-base sm:text-xl leading-relaxed max-w-[740px]">
        I assess vulnerabilities and business logic flaws, document findings,
        and work with developers to validate fixes. Explore my experience and
        skills, or get in touch about your product team’s security needs.
      </p>
      <div className="flex flex-wrap justify-center gap-4 mt-2">
        <Button href="#contact" className="h-14 px-8 gap-3 font-semibold">Contact Anupam <ArrowUpRight size={18} aria-hidden="true" /></Button>
        <a href="#projects" className="inline-flex justify-center items-center gap-3 min-h-14 px-8 border border-accent/35 rounded-md text-accent text-sm font-semibold hover:bg-accent/10">Explore my work <ArrowDown size={16} aria-hidden="true" /></a>
      </div>
      <p className="text-subtle text-xs sm:text-sm leading-relaxed max-w-[660px]">
        Testing requires written authorisation from the system owner and an agreed scope.
        Let’s discuss fit, scope, and availability first.
      </p>
    </div>
    <div className="relative grid sm:grid-cols-3 gap-4 mt-14 sm:mt-20 text-left">
      {[
        ["01 / ASSESS", "Web & API security", "Vulnerability assessment and business logic testing."],
        ["02 / DOCUMENT", "Evidence-led findings", "Clear documentation and practical remediation guidance."],
        ["03 / VALIDATE", "Work with developers", "Collaborative fix validation within an agreed scope."],
      ].map(([label, title, text]) => (
        <div key={label} className="focus-card p-6 sm:p-7">
          <p className="font-mono text-xs tracking-wider text-accent mb-4">{label}</p>
          <h2 className="font-bold text-lg mb-3">{title}</h2>
          <p className="text-sm text-subtle leading-relaxed">{text}</p>
        </div>
      ))}
    </div>
  </header>
);

export default Hero;
