import { z } from "zod";
import { publicProcedure, router } from "../../trpc";

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
  getInbox: publicProcedure.query(() => {
    return mockEmails;
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