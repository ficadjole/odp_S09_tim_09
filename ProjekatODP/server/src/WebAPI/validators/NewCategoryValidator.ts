import { AuthValidType } from "../../Domain/types/AuthValidType";

export function validacijaPodatakaDodavanjeKategorije(
  nazivK: string
): AuthValidType {
  if (nazivK.trim() === "") {
    return { uspesno: false, poruka: "Kategorija mora imati naziv!" };
  }

  return { uspesno: true, poruka: "Dodali ste kategoriju" };
}
