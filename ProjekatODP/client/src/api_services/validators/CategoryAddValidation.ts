import type { RezultatValidacije } from "../../types/validation/ValidationResult";

export function validationCategoryAdd(name?: string, existingCategories?: string[]): RezultatValidacije {
     if (!name || !name.trim()) {
    return { uspesno: false, poruka: "Category name is required." };
  }

  if (existingCategories && existingCategories.some((c) => c.toLowerCase() === name.trim().toLowerCase())) 
    {
        return { uspesno: false, poruka: "This category already exists." };
    }
  return {uspesno: true};
};

