import { AuthValidType } from "../../Domain/types/AuthValidType";

export function validacijaPodatakaDodavanjeBloga(
  idKorisnika: number,
  naslovB: string,
  sadrzaj: string
): AuthValidType {
  if (isNaN(idKorisnika)) {
    return { uspesno: false, poruka: "nije broj idKorisnika" };
  }

  if (naslovB.trim() === "") {
    return { uspesno: false, poruka: "Blog mora imati nslov!" };
  }

  if (sadrzaj.trim() === "") {
    return { uspesno: false, poruka: "Blog mora da ima sadrzaj" };
  }

  return { uspesno: true, poruka: "Dodali ste blog" };
}
