import React from "react";
import "./Common.css";
import CreateUser from "../User/CreateUser";
import EditUser from "../User/EditUser";

export default function Header(props) {
  const searchName = () => {
    const value = document.getElementById("name-input").value;
    props.setSearchName(value);
  };

  const resetBtnClick = () => {
    const nameInput = document.getElementById("name-input");
    nameInput.value = "";
    props.setSearchName("");
  };
  return (
    <div id="header-wrapper">
      <div>
        <input placeholder="이름을 검색해보세요" id="name-input" />
        <button onClick={searchName}>search</button>
        <button onClick={resetBtnClick}>reset</button>
      </div>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Create
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                USER FORM
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <CreateUser />
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal2"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                EDIT FORM
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <EditUser id={props.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
