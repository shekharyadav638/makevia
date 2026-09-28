export type WaitlistEntry = { email: string; idea: string };
export type WaitlistErrors = Partial<Record<keyof WaitlistEntry, string>>;

export const IDEA_MAX = 200;
const EMAIL_RE = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)*\.[a-z]{2,}$/i;

export function validateWaitlist({ email, idea }: WaitlistEntry): WaitlistErrors {
  const errors: WaitlistErrors = {};
  if (!email) errors.email = "Please enter your email.";
  else if (email.length > 254 || !EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (idea.length > IDEA_MAX) errors.idea = `Please keep this under ${IDEA_MAX} characters.`;
  return errors;
}
