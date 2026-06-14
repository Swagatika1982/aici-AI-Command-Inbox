export function getSuggestedCommand(subject: string, snippet?: string, from?: string) {
  const text = `${from ?? ""} ${subject} ${snippet ?? ""}`.toLowerCase();

  if (
    text.includes("calendar") ||
    text.includes("event") ||
    text.includes("meeting") ||
    text.includes("interview") ||
    text.includes("schedule") ||
    text.includes("appointment") ||
    text.includes("birthday") ||
    text.includes("concert")
  ) {
    return "Create Event";
  }

  if (
    text.includes("invoice") ||
    text.includes("payment") ||
    text.includes("bill") ||
    text.includes("receipt") ||
    text.includes("due")
  ) {
    return "Track Payment";
  }

  if (
    text.includes("reply") ||
    text.includes("confirm") ||
    text.includes("request") ||
    text.includes("proposal") ||
    text.includes("follow up")
  ) {
    return "Reply";
  }

  if (
    text.includes("newsletter") ||
    text.includes("trending") ||
    text.includes("unsubscribe") ||
    text.includes("posts") ||
    text.includes("zillow")
  ) {
    return "Archive";
  }

  return "Review";
}