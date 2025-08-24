import { ReceptKategorija } from "../../Domain/models/ReceptKategorija";
import { IReceptKategorijaRepository } from "../../Domain/repositories/IReceptKategorijaRepository";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import db from "../connection/db_connection_pool";
import { KategorijaDto } from "../../Domain/DTOs/kategorija/KategorijaDto";
export class ReceptKategorijaRepoistory implements IReceptKategorijaRepository {
  async dodajReceptKategorija(
    receptKategorija: ReceptKategorija
  ): Promise<ReceptKategorija> {
    try {
      const query =
        "INSERT INTO recept_kategorija (idRecepta,idKategorije) VALUES (?,?)";

      const [result] = await db.execute<ResultSetHeader>(query, [
        receptKategorija.idRecepta,
        receptKategorija.idKategorije,
      ]);

      if (result.affectedRows > 0) {
        return new ReceptKategorija(
          receptKategorija.idRecepta,
          receptKategorija.idKategorije
        );
      } else {
        return new ReceptKategorija();
      }
    } catch (error) {
      console.log(error);
      return new ReceptKategorija();
    }
  }
  async obrisiReceptKategorija(
    idRecepta: number,
    idKategorije: number
  ): Promise<boolean> {
    try {
      const query =
        "DELETE FROM recept_kategorija WHERE idRecepta = ? AND idKategorije = ?";

      const [result] = await db.execute<ResultSetHeader>(query, [
        idRecepta,
        idKategorije,
      ]);
      return result.affectedRows > 0;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async azurirajReceptKategorija(
    receptKategorija: ReceptKategorija,
    idNoveKategorije: number
  ): Promise<ReceptKategorija> {
    try {
      const query =
        "UPDATE recept_kategorija SET idKategorije = ? WHERE idRecepta = ? AND idKategorije = ?";

      const [result] = await db.execute<ResultSetHeader>(query, [
        idNoveKategorije,
        receptKategorija.idRecepta,
        receptKategorija.idKategorije,
      ]);

      if (result.affectedRows > 0) {
        return new ReceptKategorija(
          receptKategorija.idRecepta,
          idNoveKategorije
        );
      } else {
        return new ReceptKategorija();
      }
    } catch (error) {
      console.log(error);
      return new ReceptKategorija();
    }
  }

  async getById(
    idRecepta: number,
    idKategorije: number
  ): Promise<ReceptKategorija> {
    try {
      const query =
        "SELECT idRecepta,idKategorije FROM recept_kategorija WHERE idRecepta = ? AND idKategorije = ?";

      const [rows] = await db.execute<RowDataPacket[]>(query, [
        idRecepta,
        idKategorije,
      ]);

      if (rows.length > 0) {
        const row = rows[0];
        return new ReceptKategorija(row.idRecepta, row.idKategorije);
      } else {
        return new ReceptKategorija();
      }
    } catch (error) {
      console.log(error);
      return new ReceptKategorija();
    }
  }

  async sveKategorijeRecepta(idRecepta: number): Promise<ReceptKategorija[]> {
    try {
      const query = "SELECT * FROM recept_kategorija WHERE idRecepta = ?";

      const [rows] = await db.execute<RowDataPacket[]>(query, [idRecepta]);

      if (rows.length > 0) {
        return rows.map(
          (row) => new ReceptKategorija(row.idRecepta, row.idKategorije)
        );
      }

      return [];
    } catch {
      return [];
    }
  }
}
