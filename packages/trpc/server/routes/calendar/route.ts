import { publicProcedure, router } from "../../trpc";

export const calendarRouter = router({
  getUpcoming: publicProcedure.query(() => {
    return [
      {
        id: "event_1",
        title: "Demo Calendar Event",
        startTime: new Date().toISOString(),
        endTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
        source: "Google Calendar",
      },
    ];
  }),
});