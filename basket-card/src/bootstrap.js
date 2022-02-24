import { all, subscribe } from "event-store";

export function mount(elementId) {
  const knownEvents = new Set();

  // Normally you would load the product info
  // from the appropriate PIM microservice
  // as they are intentionally not part of the event!
  const productNames = new Map([
    [1203, "Lemonade (Shopping Cart)"],
    [7381, "Beer (Shopping Cart)"],
    [3043, "Water (Shopping Cart)"],
  ]);

  const quantities = new Map([
    [1203, 0],
    [7381, 0],
    [3043, 0],
  ]);

  function updateQuantities(eventId, eventData) {
    if (eventData.type !== "UPDATE_BASKET" || knownEvents.has(eventId)) {
      return;
    }
    knownEvents.add(eventId);
    const quantity = quantities.get(eventData.payload.productId);
    quantities.set(
      eventData.payload.productId,
      quantity + eventData.payload.quantity
    );
  }

  function updateDocument() {
    let rows = "";
    for (const [productId, quantity] of quantities) {
      if (!quantity) {
        continue;
      }
      rows += `<tr><td>${productNames.get(
        productId
      )}</td><td>${quantity}</td></tr>`;
    }
    document.getElementById(
      elementId
    ).innerHTML = `<table><caption style="text-align: left;">Basket Card</caption>${rows}</table>`;
  }

  subscribe((eventId, eventData) => {
    updateQuantities(eventId, eventData);
    updateDocument();
  });

  for (const [eventId, eventData] of all()) {
    updateQuantities(eventId, eventData);
  }
  updateDocument();
}
