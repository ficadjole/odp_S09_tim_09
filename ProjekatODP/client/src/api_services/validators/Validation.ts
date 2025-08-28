import type { RezultatValidacije } from "../../types/validation/ValidationResult";

export function validacijaPodatakaAuth(korisnickoIme?: string, lozinka?: string): RezultatValidacije {
  if (!korisnickoIme || !lozinka) {
    return { uspesno: false, poruka: 'Username and password are mandatory.' };
  }

  if (korisnickoIme.length < 3) {
    return { uspesno: false, poruka: 'Username must have at least 3 characters.' };
  }

  if (lozinka.length < 6) {
    return { uspesno: false, poruka: 'Password must have at least 6 characters.' };
  }

  if (lozinka.length > 20) {
    return { uspesno: false, poruka: 'Password can have at 20 characters the most.' };
  }

  return { uspesno: true };
}
