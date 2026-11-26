import { useRef, useState } from "react";
import Button from "./Button";

const recipient = "theanupamsingh01@gmail.com";
const subject = "Web / API security scoping enquiry";
const fieldClass = "w-full rounded-md border border-secondary bg-background p-3 text-foreground text-base";

const ScopingEmail = () => {
  const [product, setProduct] = useState("");
  const [goal, setGoal] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [permission, setPermission] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const draftRef = useRef<HTMLTextAreaElement>(null);
  const body = [
    "Hi Anupam,",
    "",
    "I'd like to discuss whether an authorised security assessment is a fit for our product team.",
    "",
    `Product type: ${product || "To discuss"}`,
    `Assessment goal: ${goal.trim() || "To discuss"}`,
    `Preferred timeframe: ${timeframe.trim() || "To discuss"}`,
    `Authorisation context: ${permission || "To discuss"}`,
    "",
    "I understand that testing requires written authorisation from the system owner and an agreed scope. This enquiry does not authorise testing.",
    "",
    "Could we discuss fit, scope, and availability?",
  ].join("\n");
  const emailText = `To: ${recipient}\nSubject: ${subject}\n\n${body}`;
  const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const copyDraft = async () => {
    try {
      await navigator.clipboard.writeText(emailText);
      setCopyStatus("Draft copied. Paste it into your email app, review it, and send it when ready.");
    } catch {
      draftRef.current?.focus();
      draftRef.current?.select();
      setCopyStatus("Copy is unavailable. The draft text is selected; use your device’s Copy command, then paste it into your email app.");
    }
  };

  return (
    <details className="w-full border-t border-secondary pt-6">
      <summary className="cursor-pointer font-semibold rounded-md py-2">Prepare a scoping email (optional)</summary>
      <div className="mt-5 flex flex-col gap-5 max-w-[700px]" onChange={() => setCopyStatus("")}>
        <p className="text-subtle leading-relaxed" id="scoping-guidance">
          All fields are optional. Use general, non-sensitive context only: no target URLs, credentials, confidential details, vulnerability reports, or authorisation documents.
          Your answers stay in this page’s memory; this site does not store or transmit them. Opening your email app or copying the draft transfers it only at your request.
        </p>
        <fieldset className="flex flex-col gap-5" aria-describedby="scoping-guidance">
          <legend className="sr-only">Optional scoping context</legend>
          <label className="flex flex-col gap-2" htmlFor="scoping-product">
            Product type
            <select id="scoping-product" className={fieldClass} value={product} onChange={(event) => setProduct(event.target.value)}>
              <option value="">To discuss</option>
              <option>Web application</option>
              <option>API</option>
              <option>Web application and API</option>
              <option>Other / not sure</option>
            </select>
          </label>
          <div className="flex flex-col gap-2">
            <label htmlFor="scoping-goal">What would you like to understand?</label>
            <textarea id="scoping-goal" className={`${fieldClass} resize-y`} rows={3} maxLength={400} autoComplete="off" placeholder="For example: review access controls before a release (up to 400 characters)." value={goal} onChange={(event) => setGoal(event.target.value)} />
          </div>
          <label className="flex flex-col gap-2" htmlFor="scoping-timeframe">
            Preferred timeframe
            <input id="scoping-timeframe" className={fieldClass} maxLength={80} autoComplete="off" placeholder="For example: next quarter, or flexible" value={timeframe} onChange={(event) => setTimeframe(event.target.value)} />
          </label>
          <label className="flex flex-col gap-2" htmlFor="scoping-permission">
            Your connection to the system owner
            <select id="scoping-permission" className={fieldClass} value={permission} onChange={(event) => setPermission(event.target.value)}>
              <option value="">To discuss</option>
              <option>I represent the system owner</option>
              <option>I’m helping the owner arrange a conversation</option>
              <option>I need to clarify who can authorise testing</option>
            </select>
          </label>
        </fieldset>
        <div className="flex flex-col gap-2">
          <label className="font-semibold" htmlFor="scoping-draft">Review your draft</label>
          <textarea ref={draftRef} id="scoping-draft" className={`${fieldClass} resize-y leading-relaxed`} rows={12} readOnly value={emailText} aria-describedby="scoping-next-step" />
        </div>
        <p id="scoping-next-step" className="text-sm text-subtle">
          Nothing has been sent. Review the draft, then send it yourself from your email app. If the email link does not open a complete draft, use Copy draft or select and copy the text above. A conversation does not confirm availability or authorise testing.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button href={mailto} className="h-auto min-h-12 py-3">Open draft in email app</Button>
          <Button type="button" onClick={copyDraft} className="h-auto min-h-12 py-3 bg-transparent border border-secondary text-foreground">Copy draft</Button>
        </div>
        <p role="status" className="text-sm text-subtle">{copyStatus}</p>
      </div>
    </details>
  );
};

export default ScopingEmail;
