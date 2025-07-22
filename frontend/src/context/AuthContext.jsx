// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

// ✅ This is the missing export!
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // optional loading fix

  useEffect(() => {
    const fakeUser = { username: "student1", role: "student" };
    setTimeout(() => {
      setUser(fakeUser);
      setLoading(false);
    }, 100); // simulate async delay
  }, []);

  if (loading) return <div>Loading...</div>; // optional: prevents redirects during load

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
