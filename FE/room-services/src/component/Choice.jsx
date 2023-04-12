import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Choice = () => {
  const navigate = useNavigate();
  const [error, seterror] = useState("");
  const [choice, setchoice] = useState({ room: "", name: "" });

  const handlechange = (e) => {
    setchoice({
      ...choice,
      [e.target.name]: e.target.value,
    });
  };
  const valadition = () => {
    if (!choice.name) {
      seterror("please enter your name");
      return false;
    }
    if (!choice.room) {
      seterror("please select any room");
      return false;
    }
    seterror("");
    return true;
  };
  const handleonsubmit = (e) => {
    e.preventDefault();
    const isvalid = valadition();
    if (isvalid) {
      navigate(`/chat/${choice.room}`, { state: choice });
    }
  };
  return (
    <>
      <div class="wrapper fadeInDown">
        <div id="formContent">
          <div class="fadeIn first account">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              class="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path
                fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
              />
            </svg>
          </div>

          <form onSubmit={handleonsubmit}>
            <input
              type="text"
              id="name"
              class="fadeIn third"
              name="name"
              placeholder="Name"
              value={choice.name}
              onChange={handlechange}
              style={{ textAlign: "left" }}
            />
            <select
              class="form-select"
              aria-label="Default select example"
              onChange={handlechange}
              name="room"
            >
              <option style={{ textAlign: "left" }} value="">
                select room
              </option>
              <option style={{ textAlign: "left" }} value="Gaming">
                Gaming
              </option>
              <option style={{ textAlign: "left" }} value="Coding">
                Coding
              </option>
              <option style={{ textAlign: "left" }} value="Streaming">
                Streaming
              </option>
            </select>
            <input type="submit" class="fadeIn fourth" value="Lets Go!" />
            {error ? <small className="text-danger">{error}</small> : ""}
          </form>
        </div>
      </div>
    </>
  );
};

export default Choice;
