import React from "react";
import type { KategorijaDto } from "../../models/kategorije/KategorijaDto";
import "../../styles/profile/CategoryDeleteSection.css";

interface Props {
  categories: KategorijaDto[];
  handleDeleteCategory: (id: number, naziv: string) => void;
}

const CategoryDeleteSection: React.FC<Props> = ({
  categories,
  handleDeleteCategory,
}) => (
  <div className="categories-list">
    <h3>Postojeće kategorije</h3>
    {categories.length === 0 && <p>Nema kategorija.</p>}
    {categories.map((cat) => (
      <div key={cat.idKategorije} className="category-item">
        <span>{cat.nazivK}</span>
        <button
          className="delete-category-btn"
          onClick={() => handleDeleteCategory(cat.idKategorije, cat.nazivK)}
        >
          ❌
        </button>
      </div>
    ))}
  </div>
);

export default CategoryDeleteSection;
