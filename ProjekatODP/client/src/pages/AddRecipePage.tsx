import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/AddRecipe.css";
import { useAuth } from "../hooks/auth/authHook";
import { RecipeForm } from "../components/addRecipe/RecipeForm";
import { CategorySelector } from "../components/addRecipe/CategorySelector";
import type { IReceptApiService } from "../api_services/recept_api/IReceptApiService";
import type { ICategoryApiService } from "../api_services/category_api/ICategoryApiService";
import { validationRecipe } from "../api_services/validators/RecipeValidation";

interface AddRecipePageProps {
  recipesApi: IReceptApiService;
  categoryApiService: ICategoryApiService;
}

const AddRecipePage: React.FC<AddRecipePageProps> = ({
  recipesApi,
  categoryApiService,
}) => {
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [title, setTitle] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [advice, setAdvice] = useState("");
  const [ingredientInput, setIngredientInput] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState<string>("");
  const [greska, setGreska] = useState("");
  return (
    <div className="add-recipe-container">
      <h2>Add New Recipe</h2>

      <RecipeForm
        title={title}
        setTitle={setTitle}
        instructions={instructions}
        setInstructions={setInstructions}
        advice={advice}
        setAdvice={setAdvice}
        ingredientInput={ingredientInput}
        setIngredientInput={setIngredientInput}
        image={image}
        setImage={setImage}
      />

      <CategorySelector
        token={token}
        categoryApiService={categoryApiService}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
      {greska && <p className="text-red-600">{greska}</p>}
      <div className="form-buttons">
        <button className="cancel-btn" onClick={() => navigate("/profile")}>
          Cancel
        </button>
        <button
          className="submit-btn"
          onClick={async () => {
            const validacija = validationRecipe(
              title,
              instructions,
              advice,
              ingredientInput,
              image,
              selectedCategories
            );
            
            if (!validacija.uspesno) {
              setGreska(validacija.poruka ?? "Data not entered correctly");
              return;
            }
            setGreska("");
            if (!user?.id || !token) return;
            await recipesApi.addRecipe(
              token,
              user.id,
              title,
              ingredientInput,
              instructions,
              advice,
              image,
              selectedCategories
            );
            navigate("/profile");
          }}
        >
          Save Recipe
        </button>
      </div>
    </div>
  );
};

export default AddRecipePage;
