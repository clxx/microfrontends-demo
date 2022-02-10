import { eventStore } from 'event-store';

export function mount() {
    eventStore.set('tracking','payload');
    console.log(eventStore);
}
