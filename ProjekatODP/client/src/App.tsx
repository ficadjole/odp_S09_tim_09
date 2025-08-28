import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import ProfilePage from "./pages/ProfilePage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import AddRecipePage from "./pages/AddRecipePage";
import BlogDetailsPage from "./pages/BlogsDetailsPage";
import AddBlogPage from "./pages/AddBlogPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import { AuthProvider } from "./contexts/auth/AuthContext";
import { ProtectedRoute } from "./components/protected_route/ProtectedRoute";
import { recipesApi } from "./api_services/recept_api/ReceptApiService";
import { categoryApiService } from "./api_services/category_api/CategoryApiService";
import { usersApi } from "./api_services/auth/AuthAPIService";
import { blogsAPI } from "./api_services/blog_api/BlogAPIService";
import { likeApiService } from "./api_services/like_api/LikeApiService";
import { commentApi } from "./api_services/comment_api/CommentApi";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/*Javne rute*/}
          <Route path="/" element={<LoginPage authApi={usersApi} />} />
          <Route
            path="/register"
            element={<RegisterPage authApi={usersApi} />}
          />

          {/*Protected routes*/}
          <Route
            path="/home"
            element={
              <ProtectedRoute requiredRole="">
                <HomePage
                  recipesApi={recipesApi}
                  blogsAPI={blogsAPI}
                  likeApiService={likeApiService}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/explore"
            element={
              <ProtectedRoute requiredRole="">
                <ExplorePage
                  categoryApiService={categoryApiService}
                  recipesApi={recipesApi}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute requiredRole="">
                <ProfilePage
                  recipesApi={recipesApi}
                  categoryApiService={categoryApiService}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/recipes/:id"
            element={
              <ProtectedRoute requiredRole="">
                <RecipeDetailsPage
                  recipesApi={recipesApi}
                  likeApiService={likeApiService}
                  commentApi={commentApi}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-recipe"
            element={
              <ProtectedRoute requiredRole="">
                <AddRecipePage
                  recipesApi={recipesApi}
                  categoryApiService={categoryApiService}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/blog/:id"
            element={
              <ProtectedRoute requiredRole="">
                <BlogDetailsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-blog"
            element={
              <ProtectedRoute requiredRole="moderator">
                <AddBlogPage blogsAPI={blogsAPI} recipesApi={recipesApi} />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={
              <ProtectedRoute requiredRole="">
                <NotFoundPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
