import Button from "./Button";

const Hero = () => {
  return (
    <header tabIndex={-1} id="top" className="min-h-[85svh] flex w-full items-center pt-40 pb-20 sm:pt-36">
      <div className="flex flex-col gap-6 max-w-[850px]">
        <p className="text-sm font-semibold tracking-wide text-subtle">
          Cybersecurity Analyst · Penetration Tester
        </p>
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-tanker">
          I’m Anupam Singh.
        </h1>
        <h2 className="text-2xl sm:text-3xl font-bold leading-tight">
          My focus is web application and API security.
        </h2>
        <p className="text-subtle text-base sm:text-lg leading-relaxed max-w-[700px]">
          I assess vulnerabilities and business logic flaws, document findings,
          and work with developers to validate fixes. Explore my experience and
          skills below, or email me to discuss your product team’s security needs.
        </p>
        <p className="text-subtle text-sm leading-relaxed max-w-[700px]">
          Any testing requires written authorisation from the system owner and
          an agreed scope. We can discuss fit, scope, and availability before
          planning an assessment.
        </p>
        <Button href="#contact" className="w-fit text-base h-12 px-8 font-semibold">
          Contact Anupam
        </Button>
      </div>
    </header>
  );
};

export default Hero;
