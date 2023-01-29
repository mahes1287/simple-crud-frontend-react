import React from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { user } = useAuth();
  if (user) {
    return <h1>Hello {user?.displayName} welcome to our app</h1>;
  }

  return <div>You are at sweet home!!!!!</div>;
}
