import { AuthValidType } from "../../Domain/types/AuthValidType";

export function validacijaPodatakaDodavanjeRecepta(
  idKorisnika: number,
  nazivR: string,
  sastojci: string,
  opis: string,
  idKategorije: number[]
): AuthValidType {
  if (isNaN(idKorisnika)) {
    return { uspesno: false, poruka: "nije broj idKorisnika" };
  }

  if (nazivR.trim() === "") {
    return { uspesno: false, poruka: "Recept mora imati naziv!" };
  }

  if (sastojci.trim() === "") {
    return { uspesno: false, poruka: "Recept mora da ima sastojke" };
  }

  if (opis.trim() === "") {
    return { uspesno: false, poruka: "Recept mora imati opis" };
  }

  if (idKategorije.length === 0) {
    return { uspesno: false, poruka: "Recept mora pipadati nekoj kategoriji" };
  }

  return { uspesno: true, poruka: "Dodali ste recept" };
}
