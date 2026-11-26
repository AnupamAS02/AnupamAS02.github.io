import Button from "./Button";
import Card from "./ui/Card";
import SectionWrapper from "./ui/SectionWrapper";

const Contact = () => {
  return (
    <SectionWrapper className="my-16 sm:my-24" id="contact" title="Contact" position={4}>
      <Card className="flex flex-col items-start gap-6 py-8 sm:py-12 px-6 sm:px-10">
        <h3 className="text-2xl sm:text-3xl font-bold">
          Let’s discuss your security needs.
        </h3>
        <p className="text-subtle max-w-[700px] leading-relaxed">
          For product-team enquiries, share a brief overview of your web
          application or API, your goals, and your preferred timeframe. We can
          discuss whether my experience is a fit and confirm availability.
          I’m also open to cybersecurity role enquiries.
        </p>
        <div className="border-l-4 border-accent pl-5 text-subtle max-w-[700px] leading-relaxed">
          <p>
            Testing begins only with written authorisation from the system owner
            and an agreed scope, including permitted systems, methods, and timing.
            Please don’t send credentials, sensitive data, or vulnerability details
            in your first email.
          </p>
        </div>
        <Button href="mailto:theanupamsingh01@gmail.com" className="w-fit text-base h-12 px-8 font-semibold">
          Email Anupam
        </Button>
        <p className="text-sm text-subtle break-all">theanupamsingh01@gmail.com</p>
        <p className="text-sm text-subtle">
          You can also view my{" "}
          <a href="https://www.linkedin.com/in/anupamas02/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
            LinkedIn profile
          </a>.
        </p>
      </Card>
    </SectionWrapper>
  );
};

export default Contact;
