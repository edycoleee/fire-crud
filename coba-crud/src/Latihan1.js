//Fetch API
import { useState, useEffect } from "react";

function App() {
  const [resourcetype, setResourcetype] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log("this Effect");
    if (resourcetype === "") return;
    fetch(`https://jsonplaceholder.typicode.com/${resourcetype}`)
      .then((response) => response.json())
      .then((json) => setItems(json));
    // return () => {
    //   cleanup;
    // };
  }, [resourcetype]);

  return (
    <div>
      <h3>PUBLIC SITE</h3>

      <button onClick={() => setResourcetype("posts")}>Post</button>
      <button onClick={() => setResourcetype("users")}>Users</button>
      <button onClick={() => setResourcetype("comments")}>Comment</button>
      <br></br>
      <h5>{resourcetype}</h5>
      <br></br>
      {items?.map((item) => {
        return <pre key={item.id}>{JSON.stringify(item)}</pre>;
      })}
    </div>
  );
}

export default App;
