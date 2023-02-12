import React, { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import { useAuth } from "../contexts/AuthContext";
import Loading from "./Loading";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  useEffect(() => {
    user ? setLoading(false) : setLoading(false);
  }, [loading, user]);

  // console.log({ user });
  if (loading) {
    return <Loading />;
  }
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
