import { eventStore } from 'event-store';

export function mount(element) {
    // element.innerHTML = '<p>product-list</p>';
    eventStore.set('product-list','payload');
    console.log(eventStore);
}
