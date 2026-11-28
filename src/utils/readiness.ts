export const readinessTopics = [
  {
    id: "permission",
    title: "Ownership and authorisation",
    question: "Do you know who owns the systems and who can authorise testing?",
    clarify: "Identify the system owner and the person who can give written authorisation. Check any third-party permission requirements before agreeing testing.",
    understood: "Confirm the authorising contact and arrange written authorisation covering the agreed scope before any testing.",
  },
  {
    id: "scope",
    title: "Intended scope",
    question: "Are the assessment goal, broad product areas and exclusions understood?",
    clarify: "Outline the assessment goal, broad web/API areas and exclusions internally. Identify third-party dependencies that may be outside your control; keep actual targets out of the initial email.",
    understood: "Prepare a general summary of the goal, web/API areas and exclusions. Agree precise permitted systems and methods through an appropriate secure channel before testing.",
  },
  {
    id: "environment",
    title: "Environment",
    question: "Is the intended environment and its operational impact understood?",
    clarify: "Discuss which environment could be assessed, whether it contains live customer data and who manages operational risk. Do not assume staging is isolated or production testing is acceptable.",
    understood: "Confirm environment boundaries, data handling, recovery arrangements and stop conditions with the owner. Do not assume the environment is approved for testing.",
  },
  {
    id: "access",
    title: "Access",
    question: "Are the relevant user roles and arrangements for test access understood?",
    clarify: "Identify the user roles and test-account arrangements that may be needed. Plan a secure way to provision access after scope is agreed; do not send credentials in the initial enquiry.",
    understood: "Confirm dedicated test accounts, relevant roles and a secure access-sharing process after scope is agreed. Keep passwords, API keys and customer data out of ordinary email.",
  },
  {
    id: "timing",
    title: "Timing and coordination",
    question: "Are the preferred window, release constraints and coordination contacts understood?",
    clarify: "Discuss a preferred window, release or freeze dates and who can coordinate or stop testing. Bring a general timeframe to the conversation; availability still needs to be discussed.",
    understood: "Bring your preferred window and constraints to the conversation. Confirm availability, coordination and emergency-stop contacts before agreeing a schedule.",
  },
] as const;

export type TopicId = typeof readinessTopics[number]["id"];
export type Answer = "understood" | "clarify" | "unsure";
export type Answers = Partial<Record<TopicId, Answer>>;

export const preparationBoundary = "Preparation only: this is not a security score, legal advice or permission to test. Any testing requires written authorisation from the system owner and an agreed scope. Fit and availability still need to be discussed.";

export function prepareSteps(answers: Answers) {
  return readinessTopics.map((topic) => {
    const answer = answers[topic.id];
    const status = answer === "understood" ? "Confirm before testing" : answer === "clarify" ? "Clarify with your team" : answer === "unsure" ? "Find the right contact" : "Not answered — start here";
    return {
      title: topic.title,
      status,
      action: answer === "understood" ? topic.understood : topic.clarify,
    };
  });
}

export function preparationText(answers: Answers) {
  return [
    "Web / API assessment — preparation steps",
    "",
    ...prepareSteps(answers).map((step, index) => `${index + 1}. ${step.title} — ${step.status}\n${step.action}\n`),
    preparationBoundary,
    "",
    "For an initial enquiry, share only general product context, your goal, owner connection and preferred timeframe. Do not include actual targets, credentials, customer data, findings or authorisation documents. Agree a secure channel first for sensitive details.",
  ].join("\n");
}
