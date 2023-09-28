"use client"

import { useAuth } from "@/Context/AuthContext";
import { HeaderNavbar } from "../components/HeaderNavbar";

export default () => {
  const { user } = useAuth();
  return (
    <div>
      <HeaderNavbar />
      <h1 className="text-center"> About Page </h1>
      <p className="text-center"> User : {user?.email} </p>
    </div>
  );
}