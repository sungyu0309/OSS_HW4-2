import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../Common/Loader";
import Header from "../Common/Header";

const ShowUser = () => {
  const showUserApi = "https://67025998bd7c8c1ccd3e9efc.mockapi.io/api";

  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handelDelete = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(showUserApi.concat("/person/") + id, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      setUser(user.filter((item) => item.id !== id));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios
      .get(showUserApi + "/person")
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (user.length < 0) {
    return <h1>no user found</h1>;
  } else {
    return (
      <>
        <Header />
        <div className="mt-5">
          {isLoading && <Loader />}
          {error && <p>Error: {error}</p>}
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {user?.map((item, i) => {
                return (
                  <tr key={i + 1}>
                    <td>{i + 1}</td>
                    <td>{item.name}</td>
                    <td>
                      <a
                        href={`mailto:${item.email}`}
                        style={{ color: "black" }}
                      >
                        {item.email}
                      </a>
                    </td>
                    <td>{item.phone}</td>
                    <td>
                      <Link to={`/edit-user/${item.id}`}>
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                      </Link>
                      <Link to={`/user/${item.id}`}>
                        <i className="fa fa-eye" aria-hidden="true"></i>
                      </Link>

                      <i
                        className="fa fa-trash-o"
                        aria-hidden="true"
                        onClick={() => handelDelete(item.id)}
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
};

export default ShowUser;
