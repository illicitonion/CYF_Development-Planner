import React, { useState } from "react";

function DraftElement({ draft, deleteDraft }) {
  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    setToggle(!toggle);
  };

  const handleSend = () => {
    console.log("this draft will be sent");
  };

  return (
    <>
      <div key={draft.draft_id}>
        <div>{draft.draft_title}</div>
        <button onClick={handleClick}>open</button>
        {toggle ? (
          <div>
            {draft.draft_text}
            <button onClick={() => deleteDraft(draft.draft_id)}>Delete</button>
            <button onClick={handleSend}>send</button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default DraftElement;
