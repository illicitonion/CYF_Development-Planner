import React from "react";

function Logout({ setAuth }) {
  const logout = async (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
  };

  return (
    <>
      <button onClick={(e) => logout(e)}>Logout</button>
    </>
  );
}

export default Logout;
