import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { KategorijaDto } from "../models/kategorije/KategorijaDto";
import "../styles/AddRecipe.css";
import { recipesApi } from "../api_services/recept_api/ReceptApiService";
import { categoryApiService } from "../api_services/category_api/CategoryApiService";

const AddRecipePage: React.FC = () => {
  const navigate = useNavigate();
  const token = "";
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<KategorijaDto[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<KategorijaDto | null>(null);
  const [advice, setAdvice] = useState<string>("");
  const [ingredientInput, setIngredientInput] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    categoryApiService.getAllCategories(token).then((categories) => {
      setCategory(categories);
    });
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    const created = await recipesApi.addRecipe(
      "",
      1,
      title,
      ingredientInput,
      instructions,
      advice,
      image,
      [category[0].idKategorije]
    );
    console.log("Saved recipe:", created);
    navigate("/profile");
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
          {category.map((cat) => (
            <button
              key={cat.idKategorije}
              className={`category-btn ${
                selectedCategory === cat ? "active" : ""
              }`}
              onClick={() =>
                setSelectedCategory(selectedCategory === cat ? null : cat)
              }
            >
              {cat.nazivK}
            </button>
          ))}
        </div>

        <div className="form-group">
          <label>Recipe Image</label>
          <div className="image-upload-container">
            <input type="file" accept="image/*" onChange={handleImageUpload} />
            {image && (
              <img src={image} alt="Preview" className="image-preview" />
            )}
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
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            placeholder="Write cooking instructions..."
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />

          <label htmlFor="instructions">Advices</label>
          <textarea
            id="instructions"
            placeholder="Write cooking advice..."
            value={advice}
            onChange={(e) => setAdvice(e.target.value)}
          />
        </div>

        <div className="form-buttons">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/")}
          >
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
