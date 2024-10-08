import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./User.css";
const EditUser = () => {
  const [user, setUser] = useState([]);
  const { id } = useParams();
  const getUserApi = "https://67025998bd7c8c1ccd3e9efc.mockapi.io/api/person";

  useEffect(() => {
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUser = () => {
    axios
      .get(getUserApi.concat("/") + id)
      .then((item) => {
        setUser(item.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="user mt-5">
      <button
        style={{ marginBottom: "10px" }}
        onClick={() => (window.location.href = "/")}
      >
        <i className="fa fa-arrow-left" style={{ margin: "0" }} />
      </button>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Name</td>
            <td>{user.name}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>
              {" "}
              <a href={`mailto:${user.email}`} style={{ color: "black" }}>
                {user.email}
              </a>
            </td>
          </tr>
          <tr>
            <td>Phone</td>
            <td>{user.phone}</td>
          </tr>
          <tr>
            <td>Gender</td>
            <td>{user.gender}</td>
          </tr>
          <tr>
            <td>Birth Date</td>
            <td>{user.birthDate}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default EditUser;
