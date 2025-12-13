import DAO from "@/DAO/DAO";
import CheckList from "@/models/CheckList";
import * as SQLite from "expo-sqlite";

export default class CheckListService implements DAO<CheckList>{

    db!: SQLite.SQLiteDatabase;
    
    constructor() {}

    static async build() {
    const instance = new CheckListService();
    await instance.init();
    return instance;
    }

    private async init() {
    this.db = await SQLite.openDatabaseAsync("app.db");
    await this.db.execAsync(`
        CREATE TABLE IF NOT EXISTS checklist (
            id               INTEGER PRIMARY KEY AUTOINCREMENT,
            check_fk         INTEGER NOT NULL,
            serviceOrder_fk  INTEGER NOT NULL,
            status           TEXT NOT NULL,
            img              BLOB,

        FOREIGN KEY (serviceOrder_fk)
        REFERENCES service_order(serviceOrder_fk)
        FOREIGN KEY (serviceOrder_fk)
        REFERENCES service_order(serviceOrder_fk)
);

    `);
    }

    
    create(data: CheckList): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    read(id: number): Promise<CheckList | null> {
        throw new Error("Method not implemented.");
    }
    update(id: number, data: CheckList): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}