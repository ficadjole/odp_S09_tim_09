import { Recept } from "../../Domain/models/Recept";
import { IReceptRepository } from "../../Domain/repositories/IReceptRepository";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../connection/db_connection_pool";

export class ReceptRepository implements IReceptRepository {
  async dodajRecept(recept: Recept): Promise<Recept> {
    try {
      const query =
        "INSERT INTO recepti (idKorisnika,nazivR,sastojci,opis,saveti,slika_url) VALUES (?,?,?,?,?,?)";

      const [result] = await db.execute<ResultSetHeader>(query, [
        recept.idKorisnika,
        recept.nazivR,
        recept.sastojci,
        recept.opis,
        recept.saveti,
        recept.slika_url,
      ]);

      if (result.insertId) {
        return new Recept(
          result.insertId,
          recept.idKorisnika,
          recept.nazivR,
          recept.sastojci,
          recept.opis,
          recept.saveti,
          recept.slika_url,
          new Date()
        );
      } else {
        return new Recept();
      }
    } catch (error) {
      console.log(error);
      return new Recept();
    }
  }
  async azurirajRecept(recept: Recept): Promise<Recept> {
    try {
      const query =
        "UPDATE recepti SET nazivR = ?, sastojci = ?,opis = ?,saveti = ?,slika_url = ? WHERE idRecepta = ?";

      const [result] = await db.execute<ResultSetHeader>(query, [
        recept.nazivR,
        recept.sastojci,
        recept.opis,
        recept.saveti,
        recept.slika_url,
        recept.idRecepta,
      ]);

      if (result.affectedRows > 0) {
        return recept;
      } else {
        return new Recept();
      }
    } catch (error) {
      console.log(error);
      return new Recept();
    }
  }
  async obrisisRecept(idRecepta: number): Promise<boolean> {
    try {
      const query = "DELETE FROM recepti WHERE idRecepta = ?";
      const [result] = await db.execute<ResultSetHeader>(query, [idRecepta]);

      return result.affectedRows > 0;
    } catch {
      return false;
    }
  }
  async getByNazivR(nazivR: string): Promise<Recept> {
    try {
      const query =
        "SELECT idKorisnika,idRecepta,nazivR,sastojci,opis,saveti,slika_url,datumR FROM recepti WHERE nazivR = ?";

      const [rows] = await db.execute<RowDataPacket[]>(query, [nazivR]);

      if (rows.length > 0) {
        const row = rows[0];

        return new Recept(
          row.idRecepta,
          row.idKorisnika,
          row.nazivR,
          row.sastojci,
          row.opis,
          row.saveti,
          row.slika_url,
          row.datum
        );
      }

      return new Recept();
    } catch (error) {
      console.log(error);
      return new Recept();
    }
  }
  async getByIdRecepta(idRecepta: number): Promise<Recept> {
    try {
      const query = "SELECT * FROM recepti WHERE idRecepta = ?";

      const [rows] = await db.execute<RowDataPacket[]>(query, [idRecepta]);

      if (rows.length > 0) {
        const row = rows[0];
        return new Recept(
          row.idRecepta,
          row.idKorisnika,
          row.nazivR,
          row.sastojci,
          row.opis,
          row.saveti,
          row.slika_url,
          row.datumR
        );
      }

      return new Recept();
    } catch {
      return new Recept();
    }
  }
  async getAllRecepti(): Promise<Recept[]> {
    try {
      const query = "SELECT * FROM recepti ORDER BY idRecepta ASC";
      const [rows] = await db.execute<RowDataPacket[]>(query);

      return rows.map(
        (row) =>
          new Recept(
            row.idRecepta,
            row.idKorisnika,
            row.nazivR,
            row.sastojci,
            row.opis,
            row.saveti,
            row.slika_url,
            row.datumR
          )
      );
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}
