import { useEffect, useState } from "react";
import type { KategorijaDto } from "../../models/kategorije/KategorijaDto";
import type { ReceptListaDto } from "../../models/recipe/ReceptListaDto";

interface SearchBarProps {
  recipes: ReceptListaDto[];
  selectedCategory: KategorijaDto | null;
  primiRecept: (data: ReceptListaDto[]) => void;
}

export function SearchBar({
  recipes,
  selectedCategory,
  primiRecept,
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const filteredRecipes = recipes.filter((recipe) => {
      const matchesName = recipe.nazivR
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === null
          ? true
          : recipe.kategorije.some(
              (category) =>
                category.nazivK.toLowerCase() ===
                selectedCategory.nazivK.toLowerCase()
            );

      return matchesName && matchesCategory;
    });

    primiRecept(
      searchTerm.trim() === "" && selectedCategory === null
        ? recipes
        : filteredRecipes
    );
  }, [recipes, searchTerm, selectedCategory, primiRecept]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
