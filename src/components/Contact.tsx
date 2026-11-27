import Button from "./Button";
import ScopingEmail from "./ScopingEmail";
import Card from "./ui/Card";
import SectionWrapper from "./ui/SectionWrapper";

const Contact = () => {
  return (
    <SectionWrapper className="my-16 sm:my-24" id="contact" title="Contact" position={5}>
      <Card className="flex flex-col items-start gap-6 py-8 sm:py-12 px-6 sm:px-10 border-accent">
        <p className="font-mono text-xs text-accent">anupam@portfolio:~$ contact</p>
        <h3 className="text-2xl sm:text-3xl font-bold">
          Let’s discuss your security needs.
        </h3>
        <p className="text-subtle max-w-[700px] leading-relaxed">
          Have a web application or API security question? A first conversation
          can help clarify whether my experience is a fit. Scope and availability
          still need to be discussed. I’m also open to cybersecurity role enquiries.
        </p>
        <section aria-labelledby="enquiry-readiness-title" className="w-full max-w-[700px] border-l-4 border-accent pl-5">
          <h3 id="enquiry-readiness-title" className="text-xl font-bold mb-5">Before you get in touch</h3>
          <div className="flex flex-col gap-5 text-subtle leading-relaxed">
            <div>
              <h4 className="font-semibold text-foreground">Bring a general outline</h4>
              <p>
                Describe the product type, what you want to understand, your
                preferred timeframe, and your connection to the system owner.
                It’s fine if some details are still undecided.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Agree boundaries before testing</h4>
              <p>
                Any testing requires written authorisation from the system owner
                and an agreed scope: permitted systems and environments, methods,
                exclusions, timing, and a contact if testing needs to stop.
                An enquiry is not permission to test.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Keep ordinary email non-sensitive</h4>
              <p>
                Don’t send passwords, API keys, customer data, private target URLs,
                vulnerability details, or authorisation documents. First discuss
                an appropriate secure way to share anything sensitive.
              </p>
            </div>
          </div>
        </section>
        <p className="text-subtle max-w-[700px] leading-relaxed">
          Email a short outline, or use the optional draft helper below to prepare
          and review it before sending.
        </p>
        <Button href="mailto:theanupamsingh01@gmail.com" className="w-fit text-base h-12 px-8 font-semibold">
          Email Anupam
        </Button>
        <p className="text-sm text-subtle break-all">theanupamsingh01@gmail.com</p>
        <p className="text-sm text-subtle">
          You can also view my{" "}
          <a href="https://www.linkedin.com/in/anupamas02/" className="underline underline-offset-4">
            LinkedIn profile
          </a>.
        </p>
        <ScopingEmail />
      </Card>
    </SectionWrapper>
  );
};

export default Contact;
