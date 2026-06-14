import { z } from "zod";
import { publicProcedure, router } from "../../trpc";
import { corsair } from "../../../../../apps/api/corsair";
import { calculatePriority } from "../../../../../apps/api/lib/priority";
import { getSuggestedCommand } from "../../../../../apps/api/lib/suggestions";

const mockEmails = [
  {
    id: "email_1",
    from: "demo@corsair.dev",
    subject: "Welcome to AICI",
    snippet: "This is your first real Gmail integration route.",
    priority: "High",
    summary: "Corsair Gmail connection route is ready.",
    suggestedCommand: "Review integration setup",
    receivedAt: new Date().toISOString(),
  },
];

export const gmailRouter = router({

  getInbox: publicProcedure.query(async () => {
    const tenant = corsair.withTenant("dev");

    const listResult = await tenant.gmail.api.messages.list();

    const messages = listResult.messages ?? [];
    if (messages.length === 0) {
      return [];
    }
    const summary =
      messages.snippet && messages.snippet.length > 120
        ? `${messages.snippet.slice(0, 120)}...`
        : messages.snippet || "No summary available";

    const detailedEmails = await Promise.all(
      messages.slice(0, 10).map(async (message: any) => {
        const detail = await tenant.gmail.api.messages.get({
          id: message.id,
        });

        const from =
          detail.payload?.headers?.find((h: any) => h.name === "From")?.value ??
          "Unknown sender";

        const subject =
          detail.payload?.headers?.find((h: any) => h.name === "Subject")?.value ??
          "No subject";

        const priorityData = calculatePriority({
          from,
          subject,
          snippet: summary,
        });

        return {
          id: message.id,
          from,
          subject,
          snippet: summary,

          priority: priorityData.priority,
          priorityScore: priorityData.score,
          priorityReason: priorityData.reason,

          summary: detail.snippet ?? "No summary available",
          suggestedCommand: getSuggestedCommand(subject, summary, from),
          receivedAt: detail.internalDate
            ? new Date(Number(detail.internalDate)).toISOString()
            : new Date().toISOString(),
        };
      }),
    );

    return detailedEmails;
  }),

  getEmailById: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(({ input }) => {
      return mockEmails.find((email) => email.id === input.id) ?? null;
    }),
});