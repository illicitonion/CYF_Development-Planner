import React, { useState, useEffect } from "react";
import DraftElement from "./DraftElement";

import EditDraft from "./EditDraft";

const ListDrafts = ({ allDrafts, setDraftsChange }) => {
  console.log(allDrafts);
  const [drafts, setDrafts] = useState([]); //empty array
  const [toggle, setToggle] = useState(false);

  //delete draft function

  async function deleteDraft(id) {
    try {
      await fetch(`/dashboard/drafts/${id}`, {
        method: "DELETE",
        headers: { jwt_token: localStorage.token },
      });

      setDrafts(drafts.filter((draft) => draft.draft_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    setDrafts(allDrafts);
  }, [allDrafts]);

  console.log(drafts);
  const handleClick = () => {
    setToggle(!toggle);
  };
  return (
    <>
      <div>
        <h2>Drafts List</h2>
        <div>
          {drafts.length !== 0 &&
            drafts[0].draft_id !== null &&
            drafts.map((draft) => (
              <div>
                <DraftElement draft={draft} deleteDraft={deleteDraft} />

                <button onClick={handleClick}>toggle edit</button>
                {toggle ? (
                  <EditDraft draft={draft} setDraftsChange={setDraftsChange} />
                ) : (
                  <></>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default ListDrafts;
