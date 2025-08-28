import React from "react";
import "../styles/pages/Home.css";
import Navbar from "../components/nav_bar/NavBar";
import HomeForm from "../components/home/HomeForm";
import { useAuth } from "../hooks/auth/authHook";

interface HomePageProps {
  recipesApi: {
    getAllRecipes: (token: string) => Promise<any[]>;
  };
  blogsAPI: {
    getAllBlogs: (token: string) => Promise<any[]>;
  };
  likeApiService: {
    numberOfLikes: (token: string, recipeId: number) => Promise<any>;
  };
}

const HomePage: React.FC<HomePageProps> = ({ recipesApi, blogsAPI, likeApiService }) => {
  const { user } = useAuth();

  return (
    <>
      <Navbar username={user?.username || ""} />
      <HomeForm recipesApi={recipesApi} blogsAPI={blogsAPI} likeApiService={likeApiService} />
    </>
  );
};

export default HomePage;
