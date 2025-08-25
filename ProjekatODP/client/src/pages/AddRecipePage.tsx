import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Category, Recipe } from "../models/recipe/Recipe";
import { categories } from "../models/recipe/Recipe";
import "../styles/AddRecipe.css"

const AddRecipePage: React.FC = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category>(categories[0]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [ingredientInput, setIngredientInput] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleAddIngredient = () => {
    if (ingredientInput.trim() !== "") {
      setIngredients([...ingredients, ingredientInput.trim()]);
      setIngredientInput("");
    }
  };

  const handleSave = () => {
    const newRecipe: Recipe = {
      id: Date.now().toString(),
      title,
      category,
      ingredients,
      instructions,
      authorId: "currentUser",
      createdAt: new Date().toISOString(),
    };
    console.log("Saved recipe:", newRecipe);
    navigate("/");
  };

  return (
    <div className="add-recipe-container">
      <h2>Add New Recipe</h2>
      
      <form className="add-recipe-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Enter recipe title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Recipe Image</label>
          <div className="image-upload-container">
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {image && <img src={image} alt="Preview" className="image-preview" />}
          </div>
        </div>

        <div className="form-group">
          <label>Ingredients</label>
          <div className="ingredient-input">
            <input
              type="text"
              placeholder="Add ingredient..."
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddIngredient()}
            />
            <button type="button" onClick={handleAddIngredient}>Add</button>
          </div>
          {ingredients.length > 0 && (
            <ul className="ingredients-list">
              {ingredients.map((ing, idx) => (
                <li key={idx}>{ing}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            placeholder="Write cooking instructions..."
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </div>

        <div className="form-buttons">
          <button type="button" className="cancel-btn" onClick={() => navigate("/")}>
            Cancel
          </button>
          <button type="button" className="submit-btn" onClick={handleSave}>
            Save Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipePage;
