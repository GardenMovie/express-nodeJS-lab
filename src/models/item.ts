import Database from 'better-sqlite3';

export interface Item {
    id: number;
    name: string;
}

// Open or create the SQLite database
const db = new Database('data/items.db');

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