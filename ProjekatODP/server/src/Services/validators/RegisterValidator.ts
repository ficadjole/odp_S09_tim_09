import { Uloga } from "../../Domain/enums/Uloga";
import { AuthValidType } from "../../Domain/types/AuthValidType";

export function validacijaPodatakaAuth(
  username: string,
  email: string,
  password: string,
  uloga: Uloga
): AuthValidType {
  if (username.trim() === "") {
    return { uspesno: false, poruka: "Molim Vas unesite korisnicko ime!" };
  } else if (username.length < 3 && username.length > 15) {
    return {
      uspesno: false,
      poruka: "Duzina korisnickog imena mora biti između 3 i 15 karaktera",
    };
  }

  if (password.trim() === "") {
    return { uspesno: false, poruka: "Molim Vas unesite sifru!" };
  } else if (password.length < 3 && password.length > 15) {
    return {
      uspesno: false,
      poruka: "Duzina sifre mora biti između 3 i 15 karaktera",
    };
  } else if (
    !password.includes("?") ||
    !password.includes("!") ||
    !password.includes("*")
  ) {
    return {
      uspesno: false,
      poruka: "Sifra mora sadrzati neke od specijalnih karaktera ? ! *",
    };
  }

  if (email.match("[a-zA-Z0-9]+@[a-z]+\.com") === null) {
    return {
      uspesno: false,
      poruka: "Niste uneli email u dobrom formatu!",
    };
  }

  if (uloga != Uloga.korisnik && uloga != Uloga.moderator) {
    return {
      uspesno: false,
      poruka: "Niste izabrali ulogu",
    };
  }

  return {
    uspesno: true,
    poruka: "Uspesno ste se prijavili",
  };
}
