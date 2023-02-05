import React from "react";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="container mx-auto p-10 text-2xl">
      <div data-testid="not-found">Sorry, The page is not found.....</div>
      <Link to={"/"} className="underline">
        Home
      </Link>
    </div>
  );
}
