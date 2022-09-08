import React from "react";

let user = {};

if (typeof window !== "undefined") {
  // Client-side-only code
  user = localStorage.getItem("user");

  if (user) {
    user = JSON.parse(user);
  }
}

export const ProfileContext = React.createContext(user);
