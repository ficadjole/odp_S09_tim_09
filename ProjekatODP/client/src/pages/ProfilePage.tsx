import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/Profile.css";
import Navbar from "../components/nav_bar/NavBar";
import { Uloga } from "../models/auth/UserRole";
import type { ReceptListaDto } from "../models/recipe/ReceptListaDto";
import type { KategorijaDto } from "../models/kategorije/KategorijaDto";
import { useAuth } from "../hooks/auth/authHook";

import ProfileHeader from "../components/profile/ProfileHeader";
import CategoryManager from "../components/profile/CategoryManager";
import UserRecipes from "../components/profile/UserRecipes";

interface ProfilePageProps {
  recipesApi: {
    getAllRecipesUser: (
      token: string,
      idKorisnika: number
    ) => Promise<ReceptListaDto[]>;
  };
  categoryApiService: {
    getAllCategories: (token: string) => Promise<KategorijaDto[]>;
    addCategory: (token: string, naziv: string) => Promise<KategorijaDto>;
    removeCategory: (token: string, naziv: string) => Promise<KategorijaDto>;
  };
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  recipesApi,
  categoryApiService,
}) => {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [userRecipes, setUserRecipes] = useState<ReceptListaDto[]>([]);
  const [categories, setCategories] = useState<KategorijaDto[]>([]);

  useEffect(() => {
    if (!token || !user) return;
    const userId = Number(user.id); // API očekuje number
    recipesApi.getAllRecipesUser(token, userId).then(setUserRecipes);
  }, [token, user]);

  useEffect(() => {
    if (!token || user?.uloga !== Uloga.moderator) return;
    categoryApiService.getAllCategories(token).then(setCategories);
  }, [token, user]);

  if (!user) return <p>Loading user...</p>;

  return (
    <div className="profile-page">
      <Navbar username={user.username} />
      <ProfileHeader username={user.username} email={user.email} />

      {user.uloga === Uloga.moderator && token && (
        <CategoryManager
          token={token}
          categories={categories}
          setCategories={setCategories}
          categoryApiService={categoryApiService}
        />
      )}

      <UserRecipes
        userRecipes={userRecipes}
        navigate={navigate}
        userRole={user.uloga}
      />
    </div>
  );
};

export default ProfilePage;
