import React from "react";
import "../../styles/profile/CategoryAddSection.css";

interface Props {
  newCategory: string;
  setNewCategory: (value: string) => void;
  handleAddCategory: () => void;
  message: string;
}

const CategoryAddSection: React.FC<Props> = ({
  newCategory,
  setNewCategory,
  handleAddCategory,
  message,
}) => (
  <div className="manage-category-section">
    <h3>Dodaj novu kategoriju</h3>
    <input
      type="text"
      value={newCategory}
      onChange={(e) => setNewCategory(e.target.value)}
      placeholder="Unesi naziv kategorije"
    />
    <button className="add-category-btn" onClick={handleAddCategory}>
      + Add New Category
    </button>
    {message && <p>{message}</p>}
  </div>
);

export default CategoryAddSection;
