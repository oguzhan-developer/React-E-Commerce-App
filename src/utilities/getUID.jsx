import jwtDecode from "jwt-decode";
import React from "react";

function getUID() {
  const userToken = localStorage.getItem("token");
  if (!userToken) return null;
  const decodedUser = jwtDecode(userToken);
  const userId = decodedUser.sub;

  return userId;
}
export default getUID;
