import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";
import { useRef } from "react";
import Moment from "react-moment";
const Chat = () => {
  const msgref = useRef();
  const location = useLocation();
  const [data, setdata] = useState({});
  const [newm, setm] = useState("");
  const [allmessage, setallmessage] = useState([]);
  const [socket, setsocket] = useState();
  useEffect(() => {
    const socket = io("https://chat-room-backend-lhbt.onrender.com");
    setsocket(socket);
    socket.on("connect", () => {
      // console.log(socket.id); // x8WIv7-mJelg7on_ALbx
      socket.emit("joinroom", location.state.room);
    });
  }, [location]);

  useEffect(() => {
    if (socket) {
      socket.on("getmssg", (val) => {
        const obj = JSON.parse(val);
        setallmessage([...allmessage, obj]);
        if (obj.newm) {
          setTimeout(() => {
            msgref.current.scrollIntoView({ behavior: "smooth" });
          }, 0);
        }
        setm("");
      });
    }
  }, [socket, allmessage]);

  console.log(allmessage[0]);

  useEffect(() => {
    setdata(location.state);
  }, [location]);

  const handelchange = (e) => {
    setm(e.target.value);
  };

  const handelsubmit = () => {
    if (newm) {
      const newmssg = { time: new Date(), newm, name: data.name };
      socket.emit("newMessage", { newmssg, room: data.room });
    }
  };

  return (
    <>
      <div className="chat_window">
        <div className="top_menu">
          <div className="buttons">
            <div className="button close"></div>
            <div className="button minimize"></div>
            <div className="button maximize"></div>
          </div>
          <div className="title">{`${data.room} Room`}</div>
        </div>
        <ul className="messages">
          {allmessage.map((val) =>
            val.name === data.name ? (
              <div className="massage-wrap massage-wrap-sent">
                <li className="sent listOne">
                  <div className="name-time">
                    <h4>{val.name}</h4>
                    <small>
                      <Moment fromNow>{val.time}</Moment>
                    </small>
                  </div>
                  <p>{val.newm}</p>
                </li>
              </div>
            ) : (
              <div className="massage-wrap massage-wrap-recived">
                <li className="sent listOne">
                  <div className="name-time">
                    <h4>{val.name}</h4>
                    <small>
                      <Moment fromNow>{val.time}</Moment>
                    </small>
                  </div>
                  <p>{val.newm}</p>
                </li>
              </div>
            )
          )}
          <li ref={msgref}></li>
        </ul>
        <div className="bottom_wrapper clearfix">
          <div className="message_input_wrapper">
            <input
              className="message_input"
              placeholder="Type your message here..."
              name="newm"
              value={newm}
              onChange={handelchange}
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  handelsubmit();
                }
              }}
            />
          </div>
          <div className="send_message" onClick={handelsubmit}>
            <div className="icon"></div>
            <div className="text">Send</div>
          </div>
        </div>
      </div>
      <div className="message_template">
        <li className="message">
          <div className="avatar"></div>
          <div className="text_wrapper">
            <div className="text"></div>
          </div>
        </li>
      </div>
    </>
  );
};

export default Chat;
