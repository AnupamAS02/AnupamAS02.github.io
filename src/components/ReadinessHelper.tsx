import { useEffect, useRef, useState } from "react";
import { preparationText, prepareSteps, readinessTopics } from "../utils/readiness";
import type { Answer, Answers } from "../utils/readiness";

export default function ReadinessHelper() {
  const [answers, setAnswers] = useState<Answers>({});
  const [reviewed, setReviewed] = useState<Answers | null>(null);
  const [copyStatus, setCopyStatus] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const draftRef = useRef<HTMLTextAreaElement>(null);
  const copyVersion = useRef(0);

  const clear = () => {
    copyVersion.current += 1;
    setAnswers({});
    setReviewed(null);
    setCopyStatus("");
  };

  useEffect(() => {
    const fallback = document.getElementById("readiness-fallback");
    if (fallback) fallback.hidden = true;
    // Browsers may restore a page from their back/forward cache. Clear that too.
    window.addEventListener("pagehide", clear);
    window.addEventListener("pageshow", clear);
    return () => {
      if (fallback) fallback.hidden = false;
      window.removeEventListener("pagehide", clear);
      window.removeEventListener("pageshow", clear);
    };
  }, []);

  useEffect(() => {
    if (reviewed) headingRef.current?.focus();
  }, [reviewed]);

  const copyPlan = async () => {
    if (!reviewed) return;
    const version = ++copyVersion.current;
    try {
      await navigator.clipboard.writeText(preparationText(reviewed));
      if (version === copyVersion.current) setCopyStatus("Preparation steps copied. Keep the plan in your own notes; nothing has been sent.");
    } catch {
      if (version !== copyVersion.current) return;
      draftRef.current?.focus();
      draftRef.current?.select();
      setCopyStatus("Copy is unavailable. The plan is selected below; use your device’s Copy command.");
    }
  };

  return (
    <>
      <section className="panel" aria-labelledby="choices-title">
        <h2 id="choices-title">What is already understood?</h2>
        <p id="choices-help">Choose one answer for each area, or leave it unanswered. You do not need to have everything settled to start a conversation.</p>
        <form autoComplete="off" aria-describedby="choices-help" onSubmit={(event) => {
          event.preventDefault();
          setCopyStatus("");
          setReviewed({ ...answers });
        }} onReset={clear}>
          {readinessTopics.map((topic, index) => (
            <fieldset key={topic.id} aria-describedby={`${topic.id}-question`}>
              <legend>{index + 1}. {topic.title}</legend>
              <p id={`${topic.id}-question`}>{topic.question}</p>
              <div className="choices">
                {([
                  ["understood", "Understood"],
                  ["clarify", "Needs clarification"],
                  ["unsure", "Not sure"],
                ] as const).map(([value, label]) => (
                  <label className="choice" key={value}>
                    <input type="radio" name={topic.id} value={value} checked={answers[topic.id] === value} onChange={() => {
                      copyVersion.current += 1;
                      setAnswers({ ...answers, [topic.id]: value as Answer });
                      setReviewed(null);
                      setCopyStatus("");
                    }} />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
          <div className="actions">
            <button type="submit">Review preparation steps</button>
            <button className="secondary" type="reset">Clear answers</button>
          </div>
        </form>
      </section>
      {reviewed && (
        <section className="panel" id="preparation-results" aria-labelledby="results-title">
          <p className="eyebrow">For your team’s own notes</p>
          <h2 id="results-title" ref={headingRef} tabIndex={-1}>Your preparation steps</h2>
          <p>These are discussion prompts, not a readiness rating. Even where an area is understood, confirm the arrangements before any testing.</p>
          <ol>
            {prepareSteps(reviewed).map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p className="status">{step.status}</p>
                <p>{step.action}</p>
              </li>
            ))}
          </ol>
          <label htmlFor="preparation-plan"><strong>Plain-text preparation plan</strong></label>
          <textarea id="preparation-plan" ref={draftRef} readOnly rows={8} value={preparationText(reviewed)} aria-describedby="copy-help" />
          <p id="copy-help">Review and copy these non-sensitive steps for your team. Your choices are not added to an email or shared with Anupam.</p>
          <button type="button" onClick={copyPlan}>Copy preparation steps</button>
          <p className="copy-status" role="status">{copyStatus}</p>
        </section>
      )}
    </>
  );
}

