import React, { useEffect, useState } from "react";
import type { KategorijaDto } from "../../models/kategorije/KategorijaDto";
import type { ICategoryApiService } from "../../api_services/category_api/ICategoryApiService";
import { validationCategoryChoose } from "../../api_services/validators/CategoryChoosingValidation";

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
  const [greska, setGreska] = useState("");

  useEffect(() => {
    if (!token) return;
    categoryApiService.getAllCategories(token).then(setCategories);
  }, [token, categoryApiService]);

  const handleSubmit = () => {
    const validacija = validationCategoryChoose(selectedCategories);
    if (!validacija.uspesno) {
      setGreska(validacija.poruka ?? "Data not entered correctly");
      return;
    }
    setGreska("");
  };

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
      {greska && <p className="text-red-600">{greska}</p>}
      <button
        type="button"
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-3 py-1 mt-2 rounded"
      >
        Confirm Categories
      </button>
    </div>
  );
};
