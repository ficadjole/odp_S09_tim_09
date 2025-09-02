import type { RezultatValidacije } from "../../types/validation/ValidationResult";

export function validationBlog(title?: string, content?: string ): RezultatValidacije {
  if (!title || !content) {
    return { uspesno: false, poruka: 'Fill in all fields.' };
  }

  return { uspesno: true };
}
