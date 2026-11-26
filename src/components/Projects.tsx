import Card from "./ui/Card";
import SectionWrapper from "./ui/SectionWrapper";

const Projects = () => {
  return (
    <SectionWrapper id="projects" title="Projects & Practice" position={3} className="mt-16 sm:mt-24">
      <p className="text-subtle leading-relaxed max-w-[750px] mb-8">
        Explore my portfolio source and academic work below. These are separate
        from the professional role described in Experience; they are not client
        security assessments.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 sm:p-8 flex flex-col items-start gap-5">
          <p className="text-xs font-mono text-accent">Personal project · Web development</p>
          <h3 className="text-2xl font-bold">Cybersecurity portfolio</h3>
          <p className="text-subtle leading-relaxed">
            This site brings together my security focus, experience, and contact
            details. The public repository contains the React and TypeScript
            components, Tailwind CSS styles, and Vite build configuration.
          </p>
          <dl className="text-sm leading-relaxed space-y-4 bg-secondary/20 p-5 rounded w-full">
            <div><dt className="font-semibold">Technical context</dt><dd className="text-subtle">A static, single-page site with section navigation and a responsive layout.</dd></div>
            <div><dt className="font-semibold">What to review</dt><dd className="text-subtle">Component structure, page content, and build setup in the source code.</dd></div>
          </dl>
          <a href="https://github.com/AnupamAS02/AnupamAS02.github.io" className="mt-auto pt-4 border-t border-secondary w-full text-accent inline-flex items-center min-h-11 font-semibold underline underline-offset-4">
            Review portfolio source on GitHub
          </a>
        </Card>
        <Card className="p-6 sm:p-8 flex flex-col items-start gap-5">
          <p className="text-xs font-mono text-accent">Academic research project · Team of two</p>
          <h3 className="text-2xl font-bold">Handwritten digit recognition</h3>
          <p className="text-subtle leading-relaxed">
            A project to recognise legible handwritten numerical digits using
            Otsu’s method and a Multi-Layer Perceptron. My contribution was the
            application’s graphical user interface, developed with J2SE (Java).
          </p>
          <dl className="text-sm leading-relaxed space-y-4 bg-secondary/20 p-5 rounded w-full">
            <div><dt className="font-semibold">Technical context</dt><dd className="text-subtle">Image thresholding, neural-network classification, and a Java desktop interface.</dd></div>
            <div><dt className="font-semibold">Project record</dt><dd className="text-subtle">Listed under Cyberx Technologies, Kanpur, August 2022–August 2023, in my résumé. The available record is a summary, not a code repository or demo.</dd></div>
          </dl>
          <a href="/resume.pdf" className="mt-auto pt-4 border-t border-secondary w-full text-accent inline-flex items-center min-h-11 font-semibold underline underline-offset-4">
            Read the project summary in my résumé (PDF)
          </a>
        </Card>
      </div>
      <div className="mt-8 border-l-4 border-accent pl-5 space-y-3">
        <h3 className="text-xl font-bold">Lab practice</h3>
        <p className="text-subtle leading-relaxed max-w-[750px]">
          I use Hack The Box and TryHackMe to practise red teaming, exploit
          development, and lateral movement in lab environments. This is learning
          work, not client work; practice stays within each lab’s permitted scope.
        </p>
        <p className="text-subtle leading-relaxed">
          For professional background, view my{" "}
          <a href="https://www.linkedin.com/in/anupamas02/" className="underline underline-offset-4 font-semibold">LinkedIn profile</a>
          {" "}or the <a href="#experience" className="underline underline-offset-4 font-semibold">Experience section</a>.
        </p>
      </div>
    </SectionWrapper>
  );
};

export default Projects;
