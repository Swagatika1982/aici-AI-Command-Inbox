export function calculatePriority(email: {
  from?: string | null;
  subject?: string | null;
  snippet?: string | null;
}) {
  const text = `${email.from ?? ""} ${email.subject ?? ""} ${email.snippet ?? ""}`.toLowerCase();

  let score = 40;
  let reason = "Normal email";

  if (text.includes("urgent") || text.includes("asap") || text.includes("important")) {
    score += 40;
    reason = "Contains urgent or important wording";
  }

  if (text.includes("meeting") || text.includes("schedule") || text.includes("calendar")) {
    score += 25;
    reason = "Looks time-sensitive";
  }

  if (text.includes("invoice") || text.includes("payment") || text.includes("due")) {
    score += 25;
    reason = "May require payment or deadline action";
  }

  if (text.includes("newsletter") || text.includes("unsubscribe") || text.includes("promotion")) {
    score -= 35;
    reason = "Looks promotional";
  }

  score = Math.max(0, Math.min(100, score));

  return {
    score,
    priority: score >= 75 ? "high" : score >= 50 ? "medium" : "low",
    reason,
  };
}