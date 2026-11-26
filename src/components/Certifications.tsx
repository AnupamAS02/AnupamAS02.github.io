import Card from "./ui/Card";
import SectionWrapper from "./ui/SectionWrapper";

const certifications = [
  {
    title: "Certified Ethical Hacker ( CEH ), EC-Council",
    date: "July 2024-July 2027 ",
    description:
      "Trained in ethical hacking, penetration testing, and vulnerability assessment using industry-standard tools.",
  },
];

const Certifications = () => {
  return (
    <SectionWrapper
      id="certifications"
      className="mt-16 sm:mt-24"
      position={4}
      title="Trainings & Certificates"
    >
      <div className="flex flex-col gap-6">
        {certifications.map((certificate, index) => {
          return (
            <Card key={index} className="flex flex-col px-4 sm:px-8 py-8">
              <h4 className="text-lg sm:text-xl font-bold">
                {certificate.title}
              </h4>
              <p className="font-medium">{certificate.date}</p>
              <div className="mt-6 flex flex-col gap-4 text-subtle text-sm sm:text-base">
                <p className="">{certificate.description}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </SectionWrapper>
  );
};

export default Certifications;
