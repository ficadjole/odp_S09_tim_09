import React, { useEffect, useState } from "react";
import type { KategorijaDto } from "../../models/kategorije/KategorijaDto";
import type { ICategoryApiService } from "../../api_services/category_api/ICategoryApiService";

interface CategorySelectorProps {
  token: string | null;
  categoryApiService: ICategoryApiService;
  selectedCategories: number[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<number[]>>;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  token,
  categoryApiService,
  selectedCategories,
  setSelectedCategories,
}) => {
  const [categories, setCategories] = useState<KategorijaDto[]>([]);

  useEffect(() => {
    if (!token) return;
    categoryApiService.getAllCategories(token).then(setCategories);
  }, [token, categoryApiService]);

  const handleCheckboxChange = (id: number) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== id));
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  return (
    <div className="category-div">
      {categories.map((cat) => (
        <label key={cat.idKategorije} className="category-div-label">
          <input
            type="checkbox"
            checked={selectedCategories.includes(cat.idKategorije)}
            onChange={() => handleCheckboxChange(cat.idKategorije)}
            className="category-div-input"
          />
          {cat.nazivK}
        </label>
      ))}
    </div>
  );
};
