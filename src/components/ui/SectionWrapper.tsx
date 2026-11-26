import { cn } from "@utils/index";

type SectionWrapperProps = {
  children: React.ReactNode;
  id: string;
  className?: string;
  title: string;
  position: number;
};

const SectionWrapper: React.FC<SectionWrapperProps> = ({ children, id, className, title, position }) => (
  <section tabIndex={-1} id={id} aria-labelledby={`${id}-title`} className={cn("w-full border-t border-secondary pt-10 sm:pt-12", className)}>
    <div className="flex items-center gap-4 mb-8">
      <span aria-hidden="true" className="font-mono text-accent text-sm">[0{position}]</span>
      <h2 id={`${id}-title`} className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h2>
      <span aria-hidden="true" className="hidden sm:block h-px bg-secondary flex-1 ml-4" />
    </div>
    {children}
  </section>
);

export default SectionWrapper;
