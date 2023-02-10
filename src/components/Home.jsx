import React from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const { user } = useAuth();
  // console.log({ user });
  if (user) {
    return (
      <div
        data-testid="logged-in"
        className="container mx-auto text-center p-6"
      >
        <h1>
          Hello{" "}
          <span className="text-orange-500 text-xl">
            {localStorage.getItem("displayName")}
          </span>{" "}
          welcome to our app
        </h1>
        <div>Now you have a super power to add things !</div>
      </div>
    );
  }

  return (
    <div data-testid="logged-out" className="container mx-auto text-center p-6">
      You are at sweet home!!!!!
    </div>
  );
}
