import React from "react";
import { Link } from "react-router-dom";

export default function ProtectedPage() {
  return (
    <div>
      <h1>ProtectedPage</h1>
      <p>
        This is a protected page. Please <Link to="/login">Login</Link> to
        continue
      </p>
    </div>
  );
}
