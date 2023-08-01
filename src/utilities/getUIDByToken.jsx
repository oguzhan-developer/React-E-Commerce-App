import jwtDecode from "jwt-decode";
import React from "react";

function getUIDByToken() {
  const userToken = localStorage.getItem("token");
  if (!userToken) return null;
  const decodedUser = jwtDecode(userToken);
  const userId = decodedUser.sub;

  return userId;
}

export default getUIDByToken;
