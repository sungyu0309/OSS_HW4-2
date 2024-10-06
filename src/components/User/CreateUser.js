import React, { useState } from "react";
import Loader from "../Common/Loader";
import "./User.css";
const CreateUser = () => {
  const createUserApi =
    "https://67025998bd7c8c1ccd3e9efc.mockapi.io/api/person";
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "man",
    birthDate: "",
  });

  const handlePhonenumChange = (event) => {
    let { name, value } = event.target;

    // 숫자만 남기고 나머지 문자는 제거
    value = value.replace(/\D/g, "");

    // 숫자가 11자리를 초과하지 않도록 제한
    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    // 010-xxxx-xxxx 형식으로 자동 포맷팅
    if (value.length <= 3) {
      // 010 부분만 입력된 경우
      // eslint-disable-next-line no-self-assign
      value = value;
    } else if (value.length <= 7) {
      // 010-xxxx 부분까지 입력된 경우
      value = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else {
      // 010-xxxx-xxxx 부분까지 입력된 경우
      value = `${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7)}`;
    }

    setUser({ ...user, [name]: value });
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch(createUserApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        console.log("Form submitted successfully!");
        setUser({ name: "", email: "", phone: "" });
        window.location.reload();
      } else {
        console.error("Form submission failed!");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="user-form">
      <div className="heading">
        {isLoading && <Loader />}
        {error && <p>Error: {error}</p>}
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
            onChange={handlePhonenumChange}
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
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
