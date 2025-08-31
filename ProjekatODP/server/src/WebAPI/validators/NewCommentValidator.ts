import { AuthValidType } from "../../Domain/types/AuthValidType";

export function validacijaPodatakaDodavanjeKomentara(
  tekst: string
): AuthValidType {
  if (tekst.trim() === "") {
    return { uspesno: false, poruka: "Komentar mora sadrzati tekst!" };
  }

  return { uspesno: true, poruka: "Dodali ste komentar" };
}
