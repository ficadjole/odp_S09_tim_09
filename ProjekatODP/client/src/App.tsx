import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
//import ProfilePage from "./pages/ProfilePage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import AddRecipePage from "./pages/AddRecipePage";
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
         */}
        <Route path="/recipes/:id" element={<RecipeDetailsPage />} />
        <Route path="/add-recipe" element={<AddRecipePage />} />
        <Route path="/blog/:id" element={<BlogDetailsPage />} />
        <Route path="/add-blog" element={<AddBlogPage />} />
        <Route path="/prijava" element={<LoginPage />} />
        <Route path="/registracija" element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
