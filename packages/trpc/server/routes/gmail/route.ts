import { z } from "zod";
import { publicProcedure, router } from "../../trpc";
import { corsair } from "../../../../../apps/api/corsair";

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

    const detailedEmails = await Promise.all(
      messages.slice(0, 10).map(async (message: any) => {
        const detail = await tenant.gmail.api.messages.get({
          id: message.id,
        });
        return {
          id: message.id,
          from:
            detail.payload?.headers?.find((h: any) => h.name === "From")?.value ??
            "Unknown sender",
          subject:
            detail.payload?.headers?.find((h: any) => h.name === "Subject")?.value ??
            "No subject",
          snippet: detail.snippet ?? "",
          priority: "Medium",
          summary: detail.snippet ?? "No summary available",
          suggestedCommand: "Review this email",
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