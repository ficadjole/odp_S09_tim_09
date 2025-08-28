import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/profile/Profile.css";
import { useAuth } from "../../hooks/auth/authHook";
import { recipesApi } from "../../api_services/recept_api/ReceptApiService";
import { categoryApiService } from "../../api_services/category_api/CategoryApiService";
import type { ReceptListaDto } from "../../models/recipe/ReceptListaDto";
import type { KategorijaDto } from "../../models/kategorije/KategorijaDto";
import { Uloga } from "../../models/auth/UserRole";

import ProfileHeader from "./ProfileHeader";
import ProfileButtons from "./ProfileButtons";
import CategoryAddSection from "./CategoryAddSection";
import CategoryDeleteSection from "./CategoryDeleteSection";
import UserRecipesSection from "./UserRecipesSection";

const ProfileForm: React.FC = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [userRecipes, setUserRecipes] = useState<ReceptListaDto[]>([]);
  const [newCategory, setNewCategory] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [categories, setCategories] = useState<KategorijaDto[]>([]);

  useEffect(() => {
    if (!token || !user) return;
    recipesApi.getAllRecipesUser(token, user.id).then((recipes) => {
      setUserRecipes(recipes);
    });
  }, [token, user]);

  useEffect(() => {
    if (!token || user?.uloga !== Uloga.moderator) return;
    categoryApiService.getAllCategories(token).then((cats) => setCategories(cats));
  }, [token, user]);

  const handleAddCategory = async () => {
    if (!token || !newCategory.trim()) return;
    try {
      const res = await categoryApiService.addCategory(token, newCategory);
      if (res && res.nazivK) {
        setMessage(`Kategorija "${res.nazivK}" uspešno dodata!`);
        setNewCategory("");
        setCategories((prev) => [...prev, res]);
      } else {
        setMessage("Došlo je do greške prilikom dodavanja kategorije.");
      }
    } catch {
      setMessage("Došlo je do greške.");
    }
  };

  const handleDeleteCategory = async (id: number, naziv: string) => {
    if (!token) return;
    const confirmed = window.confirm(`Da li si siguran da želiš da obrišeš kategoriju "${naziv}"?`);
    if (!confirmed) return;

    try {
      await categoryApiService.removeCategory(token, naziv);
      setCategories((prev) => prev.filter((c) => c.idKategorije !== id));
    } catch (err) {
      console.error("Greška pri brisanju kategorije:", err);
      alert("Neuspešno brisanje kategorije");
    }
  };

  if (!user) return <p>Loading user...</p>;

  return (
    <div className="profile-page">
      <ProfileHeader user={user} />
      <div className="content">
        <ProfileButtons user={user} navigate={navigate} />

        {user.uloga === Uloga.moderator && (
          <>
            <CategoryAddSection
              newCategory={newCategory}
              setNewCategory={setNewCategory}
              handleAddCategory={handleAddCategory}
              message={message}
            />
            <CategoryDeleteSection
              categories={categories}
              handleDeleteCategory={handleDeleteCategory}
            />
          </>
        )}

        <UserRecipesSection recipes={userRecipes} openRecipe={(id) => navigate(`/recipes/${id}`)} />
      </div>
    </div>
  );
};

export default ProfileForm;
