import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

const tabs = ["posts", "comments", "albums"];
function App() {
  const [showScroll, setShowScroll] = useState(false);
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState([]);

  const [type, setType] = useState("posts");

  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/${type}`)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.log("error"));
  }, [type]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY >= 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleToggle = () => {
    setShow(!show);
  };
  const handleTab = (tab) => {
    setType(tab);
  };

  const renderPost = () => {
    return posts.map((post) => {
      return <li>{post.title || post.name}</li>;
    });
  };

  return (
    <>
      <button onClick={handleToggle}>Toggle</button>
      <br />
      {show
        ? tabs.map((tab) => (
            <button
              style={
                type === tab
                  ? {
                      background: "red",
                      color: "#fff"
                    }
                  : {}
              }
              onClick={() => handleTab(tab)}
            >
              {tab}
            </button>
          ))
        : " "}
      <ul>{show ? renderPost() : " "}</ul>
      {showScroll && (
        <button
          style={{
            position: "fixed",
            bottom: 0,
            right: 0,
            background: "red"
          }}
        >
          GO TO TOP
        </button>
      )}
    </>
  );
}
export default App;
