import React from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { user } = useAuth();
  if (user) {
    return (
      <div data-testid="home-loggedin">
        <h1>Hello {localStorage.getItem("displayName")} welcome to our app</h1>
        <div>You are at sweet home!!!!!</div>
      </div>
    );
  }

  return <div data-testid="home-not-logged-in">You are at sweet home!!!!!</div>;
}
