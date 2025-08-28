import React, { useState } from "react";
import type { KategorijaDto } from "../../models/kategorije/KategorijaDto";

interface CategoryManagerProps {
  token: string;
  categories: KategorijaDto[];
  setCategories: React.Dispatch<React.SetStateAction<KategorijaDto[]>>;
  categoryApiService: {
    getAllCategories: (token: string) => Promise<KategorijaDto[]>;
    addCategory: (token: string, naziv: string) => Promise<KategorijaDto>;
    removeCategory: (token: string, naziv: string) => Promise<KategorijaDto>; // usklađeno sa API
  };
}

const CategoryManager: React.FC<CategoryManagerProps> = ({
  token,
  categories,
  setCategories,
  categoryApiService,
}) => {
  const [newCategory, setNewCategory] = useState("");
  const [message, setMessage] = useState("");

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      const res = await categoryApiService.addCategory(token, newCategory);
      setMessage(`Kategorija "${res.nazivK}" uspešno dodata!`);
      setNewCategory("");
      setCategories((prev) => [...prev, res]);
    } catch {
      setMessage("Došlo je do greške prilikom dodavanja kategorije.");
    }
  };

  const handleDeleteCategory = async (id: number, naziv: string) => {
    const confirmed = window.confirm(
      `Da li si siguran da želiš da obrišeš kategoriju "${naziv}"?`
    );
    if (!confirmed) return;

    try {
      await categoryApiService.removeCategory(token, naziv); // vraća KategorijaDto, ali ne koristimo rezultat
      setCategories((prev) => prev.filter((c) => c.idKategorije !== id));
    } catch (err) {
      console.error(err);
      alert("Neuspešno brisanje kategorije");
    }
  };

  return (
    <div className="manage-category-section">
      <h3>Dodaj novu kategoriju</h3>
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
        placeholder="Unesi naziv kategorije"
      />
      <button onClick={handleAddCategory}>+ Add New Category</button>
      {message && <p>{message}</p>}

      <h3>Postojeće kategorije</h3>
      {categories.length === 0 && <p>Nema kategorija.</p>}
      {categories.map((cat) => (
        <div key={cat.idKategorije} className="category-item">
          <span>{cat.nazivK}</span>
          <button onClick={() => handleDeleteCategory(cat.idKategorije, cat.nazivK)}>❌</button>
        </div>
      ))}
    </div>
  );
};

export default CategoryManager;
