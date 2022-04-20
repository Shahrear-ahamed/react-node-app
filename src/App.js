import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  const submitUserData = (e) => {
    e.preventDefault();
    // get data from input field
    const name = e.target.name.value;
    const email = e.target.email.value;
    const userData = { name, email };
    // send data by fetch
    fetch("http://localhost:5000/user", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        const newUser = [...user, data];
        setUser(newUser);
      })
      .catch((error) => console.log(error));

      // after post reset value
  };
  return (
    <div className="App">
      <h2>Total Users is {user.length}</h2>
      <form onSubmit={submitUserData}>
        <input type="text" name="name" placeholder="Name" required />
        <input type="email" name="email" placeholder="Email" required />
        <input type="submit" value="Post Data" />
      </form>
      <ul>
        {user.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
