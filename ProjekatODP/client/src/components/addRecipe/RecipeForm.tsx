import React from "react";

interface RecipeFormProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  instructions: string;
  setInstructions: React.Dispatch<React.SetStateAction<string>>;
  advice: string;
  setAdvice: React.Dispatch<React.SetStateAction<string>>;
  ingredientInput: string;
  setIngredientInput: React.Dispatch<React.SetStateAction<string>>;
  image: string;
  setImage: React.Dispatch<React.SetStateAction<string>>;
}

export const RecipeForm: React.FC<RecipeFormProps> = ({
  title,
  setTitle,
  instructions,
  setInstructions,
  advice,
  setAdvice,
  ingredientInput,
  setIngredientInput,
  image,
  setImage,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <form className="add-recipe-form" onSubmit={handleSubmit}>
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
        <label>Recipe Image</label>
        <div className="image-upload-container">
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {image && <img src={image} alt="Preview" className="image-preview" />}
        </div>
      </div>

      <div className="form-group">
        <label>Ingredients</label>
        <input
          type="text"
          placeholder="Add ingredient..."
          value={ingredientInput}
          onChange={(e) => setIngredientInput(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Instructions</label>
        <textarea
          placeholder="Write cooking instructions..."
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
        <label>Advices</label>
        <textarea
          placeholder="Write cooking advice..."
          value={advice}
          onChange={(e) => setAdvice(e.target.value)}
        />
      </div>
    </form>
  );
};
