import React from "react";
import Logout from "./Logout";
import Name from "./Name";
import { Link } from "react-router-dom";
import filesIcon from "../images/Documents-icon-48.png";
import messagesIcon from "../images/E-mail-icon.png";

function Dashboard({ setAuth }) {
  return (
    <>
      <Logout setAuth={setAuth} />
      <Name setAuth={setAuth} />

      <div className="login-signin-buttons">
        <Link to="/draft-files" className="icon-heading">
          <h2>Files</h2>
          <img alt="files icon" src={filesIcon} />
          {/* <button>files</button> */}
        </Link>
      </div>
      <div className="login-signin-buttons">
        <Link to="/messages" className="icon-heading">
          <h2>Messages</h2>
          <img alt="messages icon" src={messagesIcon} />
          {/* <button>messages</button> */}
        </Link>
      </div>
    </>
  );
}

export default Dashboard;
