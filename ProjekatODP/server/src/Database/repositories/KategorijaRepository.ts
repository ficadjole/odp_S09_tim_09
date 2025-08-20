import { Kategorija } from "../../Domain/models/Kategorija";
import { IKategorijaRepository } from "../../Domain/repositories/IKategorijaRepository";
import db from "../connection/db_connection_pool";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class KateogrijaRepository implements IKategorijaRepository {
  async getByNazivK(nazivK: string): Promise<Kategorija> {
    try {
      const query =
        "SELECT idKategorije,nazivK FROM kategorije WHERE nazivK = ?";

      const [rows] = await db.execute<RowDataPacket[]>(query, [nazivK]);

      if (rows.length > 0) {
        const row = rows[0];

        return new Kategorija(row.idKategorije, row.nazivK);
      }

      return new Kategorija();
    } catch {
      return new Kategorija();
    }
  }
  async dodajKategoriju(kategorija: Kategorija): Promise<Kategorija> {
    try {
      const query = "INSERT INTO kategorije (nazivK) VALUES (?)";

      const [result] = await db.execute<ResultSetHeader>(query, [
        kategorija.nazivK,
      ]);

      if (result.insertId) {
        return new Kategorija(result.insertId, kategorija.nazivK);
      } else {
        return new Kategorija();
      }
    } catch {
      return new Kategorija();
    }
  }
  async obrisiKategoriju(idKategorije: number): Promise<boolean> {
    try {
      const query = "DELETE FROM kategorije WHERE idKategorije = ?";

      const [result] = await db.execute<ResultSetHeader>(query, [idKategorije]);

      return result.affectedRows > 0;
    } catch {
      return false;
    }
  }
}
