import { all, subscribe } from "event-store";

export function mount() {
  const knownEvents = new Set();

  function trackEvent(eventId, eventData) {
    if (!knownEvents.has(eventId)) {
      knownEvents.add(eventId);
      console.log("tracking", eventData);
    }
  }

  subscribe(trackEvent);

  for (const [eventId] of all()) {
    // Track only new events, not preloaded ones...
    knownEvents.add(eventId);
  }
}
