import React from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { user } = useAuth();
  if (user) {
    return (
      <>
        {" "}
        <h1>Hello {localStorage.getItem("displayName")} welcome to our app</h1>
        <div>You are at sweet home!!!!!</div>
      </>
    );
  }

  return <div>You are at sweet home!!!!!</div>;
}
