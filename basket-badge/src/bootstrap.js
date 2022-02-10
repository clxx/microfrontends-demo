import { eventStore } from "event-store";

export function mount(element) {
  // element.innerHTML = '<p>basket-badge</p>';
  eventStore.set("basket-badge", "payload");
  console.log(eventStore);
}
