import { Komentar } from "../../Domain/models/Komentar";
import { IKomentarRepository } from "../../Domain/repositories/IKomentarRepository";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../connection/db_connection_pool";

export class KomentarRepository implements IKomentarRepository {
  async dodajKomentar(komentar: Komentar): Promise<Komentar> {
    try {
      const query =
        "INSERT INTO komentari (idRecepta,idKorisnika,tekst) VALUES (?,?,?) ";

      const [result] = await db.execute<ResultSetHeader>(query, [
        komentar.idRecepta,
        komentar.idKorisnika,
        komentar.tekst,
      ]);

      if (result.insertId) {
        return new Komentar(
          result.insertId,
          komentar.idRecepta,
          komentar.idKorisnika,
          komentar.tekst,
          new Date()
        );
      } else {
        return new Komentar();
      }
    } catch (error) {
      console.log(error);
      return new Komentar();
    }
  }
  async obrisiKomentar(idKomentara: number): Promise<boolean> {
    try {
      const query = "DELETE FROM komentari WHERE idKomentara = ?";
      const [result] = await db.execute<ResultSetHeader>(query, [idKomentara]);

      return result.affectedRows > 0;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async prikaziSveKomentareZaRecept(idRecepta: number): Promise<Komentar[]> {
    try {
      const query =
        "SELECT * FROM komentari WHERE idRecepta = ? ORDER BY idKomentara ASC";

      const [rows] = await db.execute<RowDataPacket[]>(query, [idRecepta]);

      return rows.map(
        (row) =>
          new Komentar(
            row.idKomentara,
            row.idRecepta,
            row.idKorisnika,
            row.tekst,
            row.datum
          )
      );
    } catch (error) {
      console.log(error);
      return [new Komentar()];
    }
  }
  async getByIdKomentara(idKomentara: number): Promise<Komentar> {
    try {
      const query = "SELECT * FROM komentari WHERE idKomentara = ?";
      const [rows] = await db.execute<RowDataPacket[]>(query, [idKomentara]);

      if (rows.length > 0) {
        const row = rows[0];

        return new Komentar(
          row.idKomentara,
          row.idRecepta,
          row.idKorisnika,
          row.tekst,
          row.datum
        );
      } else {
        return new Komentar();
      }
    } catch (error) {
      console.log(error);
      return new Komentar();
    }
  }
}
