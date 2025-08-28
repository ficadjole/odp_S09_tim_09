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

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/*Javne rute*/}
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />

          {/*Protected routes*/}
          <Route path="/home" element={
            <ProtectedRoute requiredRole="">
              <HomePage />
            </ProtectedRoute>
            } 
          />

          <Route path="/explore" element={
            <ProtectedRoute requiredRole=""> 
              <ExplorePage />
            </ProtectedRoute>
            } 
          />

          <Route path="/profile" element={
            <ProtectedRoute requiredRole=""> 
              <ProfilePage />
            </ProtectedRoute>
            } 
          />

          <Route path="/recipes/:id" element={
            <ProtectedRoute requiredRole=""> 
              <RecipeDetailsPage />
            </ProtectedRoute>
            } 
          />

          <Route path="/add-recipe" element={
            <ProtectedRoute requiredRole=""> 
              <AddRecipePage />
            </ProtectedRoute>
            } 
          />

          <Route path="/blog/:id" element={
            <ProtectedRoute requiredRole=""> 
              <BlogDetailsPage />
            </ProtectedRoute>
            } 
          />

          <Route path="/add-blog" element={
            <ProtectedRoute requiredRole=""> 
              <AddBlogPage />
            </ProtectedRoute>
            } 
          />

        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
