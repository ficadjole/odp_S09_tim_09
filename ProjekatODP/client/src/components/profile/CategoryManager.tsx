import React, { useState } from "react";
import type { KategorijaDto } from "../../models/kategorije/KategorijaDto";
import { validationCategoryAdd } from "../../api_services/validators/CategoryAddValidation";

interface CategoryManagerProps {
  token: string;
  categories: KategorijaDto[];
  setCategories: React.Dispatch<React.SetStateAction<KategorijaDto[]>>;
  categoryApiService: {
    getAllCategories: (token: string) => Promise<KategorijaDto[]>;
    addCategory: (token: string, naziv: string) => Promise<KategorijaDto>;
    removeCategory: (token: string, naziv: string) => Promise<KategorijaDto>;
  };
}

const CategoryManager: React.FC<CategoryManagerProps> = ({
  token,
  categories,
  setCategories,
  categoryApiService,
}) => {
  const [newCategory, setNewCategory] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleAddCategory = async () => {
    const existingNames = categories.map((c) => c.nazivK);
    const result = validationCategoryAdd(newCategory, existingNames);

    if (!result.uspesno) {
      setMessage({ type: "error", text: result.poruka || "Category is not valid." });
      return;
    }

    try {
      const res = await categoryApiService.addCategory(token, newCategory);
      setCategories((prev) => [...prev, res]);
      setNewCategory("");
      setMessage({ type: "success", text: `Category "${res.nazivK}" successfully added!` });
    } catch {
      setMessage({ type: "error", text: "An error occurred while adding the category." });
    }
  };

  const handleDeleteCategory = async (id: number, naziv: string) => {
    const confirmed = window.confirm(`Are you sure you want to delete the category "${naziv}"?`);
    if (!confirmed) return;

    try {
      await categoryApiService.removeCategory(token, naziv);
      setCategories((prev) => prev.filter((c) => c.idKategorije !== id));
      setMessage({ type: "success", text: `Category "${naziv}" deleted successfully.` });
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to delete category." });
    }
  };

  return (
    <div className="manage-category-section">
      <h3>Add new category</h3>
      <div className="add-category-wrapper">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Enter category name"
        />
        <button className="add-category-btn" onClick={handleAddCategory}>
          + Add New Category
        </button>
      </div>

      {message && (
        <p className={message.type === "error" ? "text-red-600" : "text-green-600"}>
          {message.text}
        </p>
      )}

      <h3>Existing categories</h3>
      {categories.length === 0 && <p>No categories available.</p>}
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
