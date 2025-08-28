import type { KategorijaDto } from "../../models/kategorije/KategorijaDto";

interface CategoryButtonProps {
  cat: KategorijaDto;
  selectedCategory: KategorijaDto | null;
  primiKategoriju: (data: KategorijaDto | null) => void;
}

export function CategoryButton({
  cat,
  selectedCategory,
  primiKategoriju,
}: CategoryButtonProps) {
  const isActive = selectedCategory?.idKategorije === cat.idKategorije;

  const posaljiPodatke = () => {
    primiKategoriju(isActive ? null : cat);
  };

  return (
    <button
      className={`category-btn ${isActive ? "active" : ""}`}
      onClick={posaljiPodatke}
    >
      {cat.nazivK}
    </button>
  );
}
