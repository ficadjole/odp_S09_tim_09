import "./App.css";

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

//import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
//import ProfilePage from "./pages/ProfilePage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
//import AddRecipePage from "./pages/AddRecipePage";
import BlogPage from "./pages/BlogPage";
import BlogDetailsPage from "./pages/BlogsDetailsPage";
import AddBlogPage from "./pages/AddBlogPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/explore" element={<ExplorePage />} />
{/*         <Route path="/profile" element={<ProfilePage />} />
        <Route path="/add-recipe" element={<AddRecipePage />} /> */}
        <Route path="/recipes/:id" element={<RecipeDetailsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogDetailsPage />} />
        <Route path="/add-blog" element={<AddBlogPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
