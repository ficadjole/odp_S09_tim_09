import type { RezultatValidacije } from "../../types/validation/ValidationResult";

export function validacijaPodatakaAuth(
  korisnickoIme: string,
  lozinka: string
): RezultatValidacije {
  if (korisnickoIme?.trim() === "" || lozinka?.trim() === "") {
    return {
      uspesno: false,
      poruka: "Username, password and email are mandatory.",
    };
  }

  if (korisnickoIme.length < 3) {
    return {
      uspesno: false,
      poruka: "Username must have at least 3 characters.",
    };
  }

  if (lozinka.length < 3) {
    return {
      uspesno: false,
      poruka: "Password must have at least 3 characters.",
    };
  }

  if (lozinka.length > 15) {
    return {
      uspesno: false,
      poruka: "Password can have at 15 characters the most.",
    };
  }

  /*   const val = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9_.-]+\.com$/i;
  if (!val.test(email)) {
    return {
      uspesno: false,
      poruka: "Email has to be in this format: exaple@domen.com",
    };
  } */

  return { uspesno: true };
}
