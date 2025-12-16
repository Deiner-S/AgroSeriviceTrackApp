import * as SQLite from "expo-sqlite";


export default async function tableInit(db: SQLite.SQLiteDatabase){
    db.execAsync(`
        CREATE TABLE IF NOT EXISTS check (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        status INTEGER NOT NULL
        );
        CREATE TABLE IF NOT EXISTS service_order (
        serviceOrder_fk  INTEGER PRIMARY KEY AUTOINCREMENT,
        operation_code   TEXT NOT NULL,
        symptoms         TEXT,
        client           INTEGER NOT NULL,
        chassi           TEXT,
        orimento         TEXT,
        model            TEXT,
        date_in          TEXT NOT NULL,
        date_out         TEXT,
        status           TEXT NOT NULL,
        service          TEXT,
        insert_date      TEXT NOT NULL
    );


        CREATE TABLE IF NOT EXISTS checklist (
        id               INTEGER PRIMARY KEY AUTOINCREMENT,
        check_fk         INTEGER NOT NULL,
        serviceOrder_fk  INTEGER NOT NULL,
        status           TEXT NOT NULL,
        img              BLOB,

        FOREIGN KEY (serviceOrder_fk)REFERENCES service_order(serviceOrder_fk),
        FOREIGN KEY (serviceOrder_fk)REFERENCES service_order(serviceOrder_fk));
    `);
}
