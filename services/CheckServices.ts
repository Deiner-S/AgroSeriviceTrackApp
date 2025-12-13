import DAO from "@/DAO/DAO";
import Check from "@/models/Check";
import * as SQLite from "expo-sqlite";

export default class CheckService implements DAO<Check> {

  db!: SQLite.SQLiteDatabase;

  constructor() {}

  static async build() {
    const instance = new CheckService();
    await instance.init();
    return instance;
  }

  private async init() {
    this.db = await SQLite.openDatabaseAsync("app.db");
    await this.db.execAsync(`
      CREATE TABLE IF NOT EXISTS check (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        status INTEGER NOT NULL
      );
    `);
  }
  async create(data: Check): Promise<boolean> {
    const result = await this.db.runAsync(
      "INSERT INTO people (name, status) VALUES (?, ?)",
      [data.name, data.status]
    );

    return result.changes > 0;
  }

  async read(id: number): Promise<Check | null> {
    const row = await this.db.getFirstAsync<Check>(
      "SELECT * FROM people WHERE id = ?",
      [id]
    );

    return row ?? null;
  }

  async update(id: number, data: Check): Promise<boolean> {
    const result = await this.db.runAsync(
      "UPDATE people SET name = ?, status = ? WHERE id = ?",
      [data.name, data.status, id]
    );

    return result.changes > 0;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.db.runAsync(
      "DELETE FROM people WHERE id = ?",
      [id]
    );

    return result.changes > 0;
  }
}
