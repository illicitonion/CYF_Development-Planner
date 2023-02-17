import React, { useState, useEffect } from "react";

//components
import InputDraft from "./InputDraft";
import ListDrafts from "./ListDrafts";
import Logout from "./Logout";

function DraftFiles({ setAuth }) {
  const [name, setName] = useState("");
  const [allDrafts, setAllDrafts] = useState([]);
  const [draftsChange, setDraftsChange] = useState(false);
  const [toggle, setToggle] = useState(false);

  const getProfile = async () => {
    try {
      const res = await fetch("/dashboard/drafts", {
        method: "GET",
        headers: { jwt_token: localStorage.token },
      });

      const parseData = await res.json();
      console.log(parseData);
      setAllDrafts(parseData);

      setName(parseData[0].username);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProfile();
    setDraftsChange(false);
  }, [draftsChange]);

  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <>
      <Logout setAuth={setAuth} />
      <h1>{name}'s dashboard</h1>

      <button onClick={handleToggle}>toggle new</button>
      {toggle ? <InputDraft setDraftsChange={setDraftsChange} /> : <></>}

      <ListDrafts allDrafts={allDrafts} setDraftsChange={setDraftsChange} />
    </>
  );
}

export default DraftFiles;
