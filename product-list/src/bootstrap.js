import { nanoid } from "nanoid";
import { add, all, subscribe } from "event-store";

export function mount(elementId) {
  const knownEvents = new Set();

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
    document.getElementById(elementId).innerHTML = `
<table>
  <tr>
    <td>Lemonade (PRV)</td>
    <td>${quantities.get(1203)}</td>
    <td><button onclick="updateBasket(1203, 1)">+</button></td>
    <td><button onclick="updateBasket(1203, -1)"${
      quantities.get(1203) ? "" : " disabled"
    }>-</button></td>
  </tr>
  <tr>
    <td>Beer (PRV)</td>
    <td>${quantities.get(7381)}</td>
    <td><button onclick="updateBasket(7381, 1)">+</button></td>
    <td><button onclick="updateBasket(7381, -1)"${
      quantities.get(7381) ? "" : " disabled"
    }>-</button></td>
  </tr>
  <tr>
    <td>Water (PRV)</td>
    <td>${quantities.get(3043)}</td>
    <td><button onclick="updateBasket(3043, 1)">+</button></td>
    <td><button onclick="updateBasket(3043, -1)"${
      quantities.get(3043) ? "" : " disabled"
    }>-</button></td>
  </tr>
</table>
`;
  }

  window.updateBasket = function (productId, quantity) {
    add(nanoid(), {
      type: "UPDATE_BASKET",
      time: Date.now(),
      source: "product-list",
      payload: {
        productId,
        quantity,
      },
    });
  };

  subscribe((eventId, eventData) => {
    updateQuantities(eventId, eventData);
    updateDocument();
  });

  for (const [eventId, eventData] of all()) {
    updateQuantities(eventId, eventData);
  }
  updateDocument();
}
