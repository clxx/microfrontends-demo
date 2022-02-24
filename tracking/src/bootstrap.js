import { all, subscribe } from "event-store";

export function mount() {
  const knownEvents = new Set();

  subscribe((eventId, eventData) => {
    if (!knownEvents.has(eventId)) {
      knownEvents.add(eventId);
      console.log("tracking", eventData);
    }
  });

  for (const [eventId] of all()) {
    // Track only new events, not preloaded ones...
    knownEvents.add(eventId);
  }
}
