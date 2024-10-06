import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../Common/Loader";
import "./User.css";

export default function EditUser({ id }) {
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const getUserApi = "https://67025998bd7c8c1ccd3e9efc.mockapi.io/api/person";

  useEffect(() => {
    if (id) getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getUser = () => {
    console.log(id);
    axios
      .get(getUserApi.concat("/") + id)
      .then((item) => {
        setUser(item.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log(name, value);
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(getUserApi.concat("/") + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // return response.json();
        // navigate("/");
        window.location.reload();
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  return (
    <div className="user-form">
      <div className="heading">
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}
        <p>Edit Form</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={user.name}
            onChange={handleInput}
            required
          />
        </div>
        <div className="mb-3 mt-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={user.email}
            onChange={handleInput}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={user.phone}
            onChange={handleInput}
            required
          />
        </div>
        <div>
          <label className="form-label">Gender</label>
          <div className="wrapper">
            <div>
              <label htmlFor="man">Man</label>
              <input
                type="radio"
                name="gender"
                id="man"
                value="man"
                onChange={handleInput}
                checked={user.gender === "man"}
              />
            </div>
            <div>
              <label htmlFor="woman">Woman</label>
              <input
                type="radio"
                name="gender"
                id="woman"
                value="woman"
                onChange={handleInput}
                checked={user.gender === "woman"}
              />
            </div>
          </div>
        </div>
        <div className="vertical">
          <label htmlFor="birthDate" className="form-label">
            Birth Date
          </label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={user.birthDate}
            onChange={handleInput}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary submit-btn"
          data-bs-dismiss="modal"
        >
          Edit
        </button>
      </form>
    </div>
  );
}
