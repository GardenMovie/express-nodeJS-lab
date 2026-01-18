import Database from 'better-sqlite3';

export interface Item {
    id: number;
    name: string;
}

// Open or create the SQLite database
// Use in-memory DB for tests, file DB otherwise
const isTest = process.env.NODE_ENV === 'test';
const db = isTest ? new Database(':memory:') : new Database('data/items.db');

// Clear all items (for test use only)
export function clearItems() {
    if (isTest) {
        db.exec('DELETE FROM items');
    } else {
        throw new Error('clearItems can only be used in test environment');
    }
}
// Ensure the table exists (for dev convenience)
db.exec(`CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
)`);

// CRUD functions
export function getAllItems(): Item[] {
    return db.prepare('SELECT * FROM items').all() as Item[];
}

export function getItemById(id: number): Item | undefined {
    return db.prepare('SELECT * FROM items WHERE id = ?').get(id) as Item | undefined;
}

export function createItem(name: string): Item {
    const stmt = db.prepare('INSERT INTO items (name) VALUES (?)');
    const info = stmt.run(name);
    return getItemById(info.lastInsertRowid as number)!;
}

export function updateItem(id: number, name: string): Item | undefined {
    db.prepare('UPDATE items SET name = ? WHERE id = ?').run(name, id);
    return getItemById(id);
}

export function deleteItem(id: number): Item | undefined {
    const item = getItemById(id);
    if (item) {
        db.prepare('DELETE FROM items WHERE id = ?').run(id);
    }
    return item;
}