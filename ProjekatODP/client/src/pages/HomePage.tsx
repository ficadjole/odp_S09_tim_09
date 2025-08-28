import React from "react";
import "../styles/pages/Home.css";
import Navbar from "../components/nav_bar/NavBar";
import HomeForm from "../components/home/HomeForm";
import { useAuth } from "../hooks/auth/authHook";

const HomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <>
      <Navbar username={user?.username || ""} />
      <HomeForm />
    </>
  );
};

export default HomePage;
