import { useEffect, useState } from "react";
import type { KategorijaDto } from "../../models/kategorije/KategorijaDto";
import type { ICategoryApiService } from "../../api_services/category_api/ICategoryApiService";
import { useAuth } from "../../hooks/auth/authHook";
import { CategoryButton } from "./CategoryButton";

interface CategoryButtonsProps {
  categoryApiService: ICategoryApiService;
  selectedCategory: KategorijaDto | null;
  primiKategoriju: (data: KategorijaDto | null) => void;
}

export function CategoryButtons({
  categoryApiService,
  selectedCategory,
  primiKategoriju,
}: CategoryButtonsProps) {
  const { token } = useAuth();
  const [categories, setCategories] = useState<KategorijaDto[]>([]);
  useEffect(() => {
    if (!token) return;

    categoryApiService.getAllCategories(token).then((categories) => {
      setCategories(categories);
    });
  }, [token, categoryApiService]);
  return (
    <div className="categories">
      {categories.map((cat) => (
        <div key={cat.idKategorije} className="category-item">
          <CategoryButton
            key={cat.idKategorije}
            cat={cat}
            selectedCategory={selectedCategory}
            primiKategoriju={primiKategoriju}
          ></CategoryButton>
        </div>
      ))}
    </div>
  );
}
