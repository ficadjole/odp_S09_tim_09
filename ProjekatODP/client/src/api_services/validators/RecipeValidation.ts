import type { RezultatValidacije } from "../../types/validation/ValidationResult";

export function validationRecipe(naziv?: string, sastojci?: string, opis?: string, saveti?: string, slika_url?: string, selectedCategories?: number[]): RezultatValidacije {
  if (!naziv || !sastojci || !opis || !saveti || !slika_url) {
    return { uspesno: false, poruka: 'Please fill in all fields.' };
  }
    if (!selectedCategories || selectedCategories.length === 0) {
    return { uspesno: false, poruka: "Select at least one category." };
  }

  return { uspesno: true };
}
