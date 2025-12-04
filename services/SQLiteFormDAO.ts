
import * as SQLite from "expo-sqlite";
import Form from "../models/Form";
import DAO from "./DAO";

export default class SqliteFormDAO implements DAO<Form> {

  private db!: SQLite.SQLiteDatabase;

  constructor() {
    this.init();
  }

  private async init() {
    this.db = await SQLite.openDatabaseAsync("localdb.db");
    // Agora db é SQLiteDatabase e possui execAsync, getAllAsync, etc.
  }
  
  async create(data: Form): Promise<boolean> {
    await this.db.execAsync(
      `INSERT INTO people (name, age) VALUES ('${data.nome}', ${data.idade})`,);
    
    return true;
  }



  async read(id: number): Promise<Form | null> {
    const row = await this.db.getFirstAsync<Form>(
      `SELECT * FROM people WHERE id = ${id} LIMIT 1`
    );

    if (!row) { 
      return null;
    }

    return {
      id: row.id,
      nome: row.nome,
      idade: row.idade,
      ativo: (row as any).ativo === 1
    };
  }


  async update(id: number, data: Form): Promise<boolean> {
    await this.db.execAsync(
      `UPDATE people 
      SET name='${data.nome}', age=${data.idade}
      WHERE id=${id}`
    );

    return true;
  }

  async delete(id: number): Promise<boolean> {
    await this.db.execAsync(
      `DELETE FROM people WHERE id = ${id}`
    );

    return true;
  }

  async readAll(){ 
    console.log("teste")
    return await this.db.getAllAsync(`SELECT * FROM people`);
  };
  

}