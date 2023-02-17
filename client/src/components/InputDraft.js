import React, { useState } from "react";

const InputDraft = ({ setDraftsChange }) => {
  const [draftTitle, setDraftTitle] = useState("");
  const [draftText, setDraftText] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("jwt_token", localStorage.token);

      const body = { draftTitle, draftText };
      const response = await fetch("/dashboard/drafts", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      });

      const parseResponse = await response.json();

      console.log(parseResponse);

      setDraftsChange(true);

      setDraftText("");
      setDraftTitle("");
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <>
      <form onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="add title"
          value={draftTitle}
          onChange={(e) => setDraftTitle(e.target.value)}
        />

        <textarea
          type="text"
          placeholder="add text"
          value={draftText}
          onChange={(e) => setDraftText(e.target.value)}
        />
        <button>save</button>
      </form>
    </>
  );
};

export default InputDraft;
