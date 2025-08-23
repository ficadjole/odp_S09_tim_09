import { Lajk } from "../../Domain/models/Lajk";
import { ILajkRepository } from "../../Domain/repositories/ILajkRepository";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../connection/db_connection_pool";

export class LajkRepository implements ILajkRepository {
  async dodajLajk(lajk: Lajk): Promise<Lajk> {
    try {
      const query = "INSERT INTO lajk (idRecepta,idKorisnika) VALUES (?,?)";

      const [result] = await db.execute<ResultSetHeader>(query, [
        lajk.idRecepta,
        lajk.idKorisnika,
      ]);

      if (result.affectedRows > 0) {
        return new Lajk(lajk.idRecepta, lajk.idKorisnika);
      } else {
        return new Lajk();
      }
    } catch (error) {
      console.log(error);
      return new Lajk();
    }
  }
  async obrisiLajk(idRecepta: number, idKorisnika: number): Promise<boolean> {
    try {
      const query = "DELETE FROM lajk WHERE idRecepta = ? AND idKorisnika = ?";

      const [result] = await db.execute<ResultSetHeader>(query, [
        idRecepta,
        idKorisnika,
      ]);

      return result.affectedRows > 0;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async brojLajkovaRecept(idRecepta: number): Promise<number> {
    try {
      const query =
        "SELECT COUNT(*) AS broj_lajkova FROM lajkovi WHERE idRecepta = ?";

      const [rows] = await db.execute<RowDataPacket[]>(query, [idRecepta]);
      if (rows.length > 0) {
        return rows[0].broj_lajkova;
      } else {
        return -1;
      }
    } catch (error) {
      console.log(error);
      return -1;
    }
  }

  async korisnikLajkovao(
    idKorisnika: number,
    idRecepta: number
  ): Promise<boolean> {
    try {
      const query =
        "SELECT * FROM lajk WHERE idKorisnika = ? AND idRecepta = ?";

      const [rows] = await db.execute<RowDataPacket[]>(query, [
        idKorisnika,
        idRecepta,
      ]);

      if (rows.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
