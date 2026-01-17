export interface Item {
    id: number;
    name: string;
}

export let items: Item[] = [];
let nextId = 1;
export function getNextItemId() {
    return nextId++;
}