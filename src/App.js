import "./App.css";
import CreateUser from "./components/User/CreateUser";
import ShowUser from "./components/User/ShowUser";
import { Route, Routes } from "react-router-dom";
import EditUser from "./components/User/EditUser";
import User from "./components/User/User";
function App() {
  return (
    <div className="App">
      <header className="container">
        <div className="">
          <Routes>
            <Route path="/" element={<ShowUser />} />
            <Route path="/edit-user/:id" element={<EditUser />} />
            <Route path="/user/:id" element={<User />} />
            <Route path="/create-user" element={<CreateUser />} />
          </Routes>
        </div>
      </header>
    </div>
  );
}

export default App;
