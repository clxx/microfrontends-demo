import { eventStore } from "event-store";

export function mount(element) {
  // element.innerHTML = '<p>basket-card</p>';
  eventStore.set("basket-card", "payload");
  console.log(eventStore);
}
