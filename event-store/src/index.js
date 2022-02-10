import { nanoid } from "nanoid";

const eventStore = new Map();

const callbacks = [];

export function subscribe(callback) {
  callbacks.push(callback);
}

export function add(eventId, eventData) {
  if (eventStore.has(eventId)) {
    return;
  }
  eventStore.set(eventId, eventData);
  for (const callback of callbacks) {
    callback(eventId, eventData);
  }
}

export function all() {
  return eventStore;
}

// return;
// Simulate a preload from the server...
add(nanoid(), {
  type: "UPDATE_BASKET",
  time: Date.now(),
  source: "product-list",
  payload: {
    productId: 7381,
    quantity: 2,
  },
});
