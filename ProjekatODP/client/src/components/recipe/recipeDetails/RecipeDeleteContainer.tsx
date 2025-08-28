import React from "react";
import { useNavigate } from "react-router-dom";
import { RecipeDeleteButton } from "./RecipeDeleteButton";
import type { IReceptApiService } from "../../../api_services/recept_api/IReceptApiService";

interface RecipeDeleteContainerProps {
  token: string;
  idRecepta: number;
  userRole: string | undefined;
  firstCategoryId?: number;
  recipesApi: IReceptApiService;
}

export const RecipeDeleteContainer: React.FC<RecipeDeleteContainerProps> = ({
  token,
  idRecepta,
  userRole,
  firstCategoryId,
  recipesApi,
}) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!token) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this recipe?"
    );
    if (!confirmDelete) return;

    await recipesApi.deleteRecipe(token, idRecepta, firstCategoryId ?? 0);
    alert("Recipe deleted successfully.");
    navigate("/explore");
  };

  return (
    <RecipeDeleteButton
      recipe={{ idRecepta: idRecepta } as any}
      onDelete={handleDelete}
      userRole={userRole}
    />
  );
};
