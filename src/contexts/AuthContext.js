import { createContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export default AuthContext;
