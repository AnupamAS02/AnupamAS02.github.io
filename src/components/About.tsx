import Card from "./ui/Card";
import SectionWrapper from "./ui/SectionWrapper";

const skillsData = [
  {
    category: "Penetration Testing Skills",
    items: [
      "WebApps & API Testing",
      "Vulnerability Assessment & Reporting",
      "Proof-of-Concept & Exploit Development",
      "Black Box & Gray Box Testing",
      "Business Logic Exploitation",
      "XSS",
      "IDOR",
      "Information Disclosure",
      "Lateral Movement",
      "Data Exfiltration Simulations",
    ],
  },
  {
    category: "Tools & Technologies",
    items: [
      "Burp Suite Pro",
      "OWASP ZAP",
      "Nessus",
      "Kali Linux",
      "Bash Scripting",
      "Postman",
      "SQLMap",
      "API Testing",
    ],
  },
];

const About = () => {
  return (
    <SectionWrapper id="about" title="About Me" position={1}>
      <div className="grid lg:grid-cols-[1fr_260px] gap-8 lg:gap-12 items-start">
        <div className="flex flex-col gap-6 text-subtle flex-1 min-w-0 text-sm lg:text-base leading-relaxed">
          <p>
            I’m Anupam Singh, a penetration tester and security researcher.
            My experience includes web application and API security testing,
            vulnerability assessment, and business logic testing using manual
            and automated methods. Testing requires written authorisation and
            an agreed scope.
          </p>

          <p>
            I hold a{" "}
            <span className="text-primary">Certified Ethical Hacker (CEH)</span>{" "}
            credential from EC-Council (valid through 2027) and have hands-on
            experience with tools such as
            <span className="text-primary"> Burp Suite Pro</span>, OWASP ZAP,
            Nessus, Kali Linux, SQLMap, and Postman. My areas of focus include
            cross-site scripting (XSS), insecure direct object references (IDOR),
            information disclosure, and business logic flaws.
          </p>

          <p>
            Outside of professional engagements, I actively sharpen my skills on
            platforms like Hack The Box and TryHackMe, focusing on red teaming,
            exploit development, and lateral movement simulations in lab environments.
          </p>
        </div>

        <figure className="terminal-panel max-w-[320px] w-full mx-auto">
          <div className="terminal-bar"><span className="text-accent">ABOUT THE RESEARCHER</span></div>
          <img src="/profile.png" alt="Anupam Singh" width="320" height="320" loading="lazy" className="w-full h-72 object-cover object-top" />
          <figcaption className="px-5 py-4 text-sm font-semibold">Anupam Singh</figcaption>
        </figure>

      </div>
      <hr className="border-t border-secondary my-8" />
      <div className="grid md:grid-cols-2 gap-8">
        {skillsData.map(({ category, items }) => (
          <div key={category}>
            <h3 className="text-xl font-bold text-foreground mb-6">
              {category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <Card
                  key={item}
                  className="px-3 py-1 cursor-default font-mono text-xs sm:text-sm text-subtle rounded-md duration-300 font-medium w-fit hover:border-primary hover:text-primary transition-colors"
                >
                  {item}
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default About;
