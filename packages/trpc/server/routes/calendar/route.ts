import { publicProcedure, router } from "../../trpc";
import { corsair } from "../../../../../apps/api/corsair";

export const calendarRouter = router({
  getUpcoming: publicProcedure.query(async () => {
    const tenant = corsair.withTenant("dev");

    const result = await tenant.googlecalendar.api.events.getMany();

    const events = result.items ?? result.events ?? [];

    return events.slice(0, 5).map((event: any) => ({
      id: event.id,
      title: event.summary ?? "Untitled event",
      startTime:
        event.start?.dateTime ??
        event.start?.date ??
        new Date().toISOString(),
      endTime:
        event.end?.dateTime ??
        event.end?.date ??
        new Date().toISOString(),
      source: "Google Calendar",
    }));
  }),
});