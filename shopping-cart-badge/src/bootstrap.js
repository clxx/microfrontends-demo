import { all, subscribe } from "event-store";

export function mount(elementId) {
  const knownEvents = new Set();

  let quantitySum = 0;

  function updateQuantity(eventId, eventData) {
    if (eventData.type !== "UPDATE_SHOPPING_CART" || knownEvents.has(eventId)) {
      return;
    }
    knownEvents.add(eventId);
    quantitySum += eventData.payload.quantity;
  }

  function updateDocument() {
    document.getElementById(
      elementId
    ).innerHTML = `<p>Shopping Cart Badge: ${quantitySum}</p>`;
  }

  subscribe((eventId, eventData) => {
    updateQuantity(eventId, eventData);
    updateDocument();
  });

  for (const [eventId, eventData] of all()) {
    updateQuantity(eventId, eventData);
  }
  updateDocument();
}
