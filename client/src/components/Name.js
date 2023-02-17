import React, { useState, useEffect } from "react";

function Name() {
  const [name, setName] = useState("");

  const getName = async () => {
    try {
      const res = await fetch("/dashboard/", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });

      const parseRes = await res.json();

      console.log(parseRes);
      setName(parseRes.username);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getName();
  }, []);
  return (
    <>
      <h1 className="heading">Dashboard {name}</h1>
    </>
  );
}

export default Name;
