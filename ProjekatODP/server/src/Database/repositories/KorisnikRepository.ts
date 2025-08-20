import { ResultSetHeader, RowDataPacket } from "mysql2";
import { Korisnik } from "../../Domain/models/Korisnik";
import { IKorisnikRepository } from "../../Domain/repositories/IKorisnikRepository";
import db from "../connection/db_connection_pool";
import { resourceLimits } from "worker_threads";
export class KorisnikRepository implements IKorisnikRepository {
  async create(korisnik: Korisnik): Promise<Korisnik> {
    try {
      const query =
        "INSERT INTO korisnici (username,email,passwordHash,uloga) VALUES (?,?,?,?)";

      const [result] = await db.execute<ResultSetHeader>(query, [
        korisnik.username,
        korisnik.email,
        korisnik.passwordHash,
        korisnik.uloga,
      ]);

      if (result.insertId) {
        return new Korisnik(
          result.insertId,
          korisnik.username,
          korisnik.email,
          korisnik.passwordHash,
          korisnik.uloga,
          new Date() //ovo nisam bas najsiguriniji da li ovako treba
        );
      } else {
        return new Korisnik();
      }
    } catch (error) {
      console.log(error);
      return new Korisnik();
    }
  }
  async getById(idKorisnika: number): Promise<Korisnik> {
    try {
      const query =
        "SELECT idKorisnika,username,email,passwordHash,uloga FROM korisnici WHERE idKorisnika = ?";

      const [rows] = await db.execute<RowDataPacket[]>(query, [idKorisnika]);

      if (rows.length > 0) {
        const row = rows[0];
        return new Korisnik(
          row.idKorisnika,
          row.username,
          row.email,
          row.passwordHash,
          row.uloga
        );
      }
      return new Korisnik();
    } catch {
      return new Korisnik();
    }
  }
  async getByUsername(username: string): Promise<Korisnik> {
    try {
      const query =
        "SELECT idKorisnika,username,email,passwordHash,uloga FROM korisnici WHERE username = ?";

      const [rows] = await db.execute<RowDataPacket[]>(query, [username]);

      if (rows.length > 0) {
        const row = rows[0];
        return new Korisnik(
          row.idKorisnika,
          row.username,
          row.email,
          row.passwordHash,
          row.uloga
        );
      }
      return new Korisnik();
    } catch {
      return new Korisnik();
    }
  }
  async getAll(): Promise<Korisnik[]> {
    try {
      const query =
        "SELECT idKorisnika,username,email,passwordHash,uloga FROM korisnici ORDER BY idKorisnika ASC";

      const [rows] = await db.execute<RowDataPacket[]>(query);

      return rows.map(
        (row) =>
          new Korisnik(
            row.idKorisnika,
            row.username,
            row.email,
            row.passwordHash,
            row.ulog
          )
      );
    } catch {
      return [];
    }
  }
  async update(korisnik: Korisnik): Promise<Korisnik> {
    try {
      const query =
        "UPDATE korisnici SET username = ?, email = ?, passwordHash = ? WHERE idKorisnika = ?";

      const [result] = await db.execute<ResultSetHeader>(query, [
        korisnik.username,
        korisnik.email,
        korisnik.passwordHash,
        korisnik.idKorisnika,
      ]);

      if (result.affectedRows > 0) {
        return korisnik;
      } else {
        return new Korisnik();
      }
    } catch {
      return new Korisnik();
    }
  }
  async delete(idKorisnika: number): Promise<boolean> {
    try {
      const query = "DELETE FROM korisnici WHERE idKorisnika = ?";
      const [result] = await db.execute<ResultSetHeader>(query, [idKorisnika]);
      return result.affectedRows > 0;
    } catch {
      return false;
    }
  }
  async exists(idKorisnika: number): Promise<boolean> {
    try {
      const query = "SELECT COUNT(*) as count FROM users WHERE idKorisnika = ?";
      const [rows] = await db.execute<RowDataPacket[]>(query, [idKorisnika]);
      return rows[0].count > 0;
    } catch {
      return false;
    }
  }
}
