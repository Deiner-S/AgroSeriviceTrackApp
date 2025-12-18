import CheckList from "@/models/CheckList";
import * as SQLite from "expo-sqlite";
import Repository from "./repository";
import Database from "./dbInit";

export default class CheckListRepository implements Repository<CheckList,number>{

    db!: SQLite.SQLiteDatabase;

    static async build() {
        const instance = new CheckListRepository();
        instance.db = await Database.getInstance();
        return instance;
      }
    
    async save(entity: CheckList): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async getById(id: number): Promise<CheckList | null> {
        throw new Error("Method not implemented.");
    }
    async update(entity: CheckList): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async delete(id: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async getAll(): Promise<CheckList[]> {
        throw new Error("Method not implemented.");
    }

    


}