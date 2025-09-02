import type { RezultatValidacije } from "../../types/validation/ValidationResult";

export function validationCategoryChoose(selectedCategories: number[]): RezultatValidacije {
  if (!selectedCategories || selectedCategories.length === 0) {
    return {uspesno: false, poruka: "Please select at least one category."};
  }

  return { uspesno: true };
}
