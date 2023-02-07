import React, { Fragment, useEffect, useState } from "react";

// 4. In First column, create a form that will contain first name, last name, email and phone.
// 5. Validate all these form
// 6. Save the information in local state and list them in right side of the column in tabular format.
// 7. Integrate delete and edit functionality for the listed records.

const FormPage = () => {
  const [data, setData] = useState([]); // to list the data in the table
  const [message, setMessage] = useState(""); // to set the error message
  const [edit, setEdit] = useState({
    isEdit: false,
    index: 0,
  }); // for checking if it is to be edited with the index number
  const [input, setInput] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
  }); // input fields

  const handleSubmit = (e) => {
    e.preventDefault();
    if (edit.isEdit) {
      // if it is in the edit mode
      if (!input.firstname || !input.lastname || !input.email || !input.phone) {
        setMessage("All fields are required");
      } else {
        if (input.firstname.length < 3) {
          setMessage("At lease 3 character is required for first name");
        } else if (input.lastname.length < 3) {
          setMessage("At lease 3 character is required for last name");
        } else if (!input.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
          setMessage("Please enter valid number");
        } else if (!input.phone.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
          setMessage("Please enter valid Mobile number ");
        } else {
          let updatedList = data.map((item, key) => {
            if (key == edit.index) {
              return {
                ...item,
                firstname: input.firstname,
                lastname: input.lastname,
                email: input.email,
                phone: input.phone,
              };
            }
            return item;
          });
          setData(updatedList);
          setEdit({ ...edit, isEdit: false });
          setMessage("");
          setInput({
            ...input,
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
          });
        }
      }
    } else {
      // if it is to be created
      if (!input.firstname || !input.lastname || !input.email || !input.phone) {
        setMessage("All fields are required");
      } else {
        if (input.firstname.length < 3) {
          setMessage("At lease 3 character is required for first name");
        } else if (input.lastname.length < 3) {
          setMessage("At lease 3 character is required for last name");
        } else if (!input.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
          setMessage("Please enter valid email");
        } else if (!input.phone.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
          setMessage("Please enter valid Mobile number ");
        } else {
          setData(data.concat(input));
          setMessage("");
          //   setEdit({ ...edit, isEdit: false });
          setInput({
            ...input,
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
          });
        }
      }
    }
  };

  const handleEdit = (index) => {
    // to handle the edit functionality
    setEdit({ ...edit, isEdit: true, index: index });
    setInput({
      ...input,
      firstname: data[index].firstname,
      lastname: data[index].lastname,
      email: data[index].email,
      phone: data[index].phone,
    });
  };

  const handleDelete = (index) => {
    // to handle the delete functionality
    setData(data.filter((_, num) => index !== num));
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col">
          <span className="text-danger align center">{message && message}</span>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="firstname">First Name : </label>
              <input
                type="text"
                placeholder="Enter First name..."
                className="form-control"
                value={input.firstname}
                onChange={(e) => {
                  setInput({ ...input, firstname: e.target.value });
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastname">Last Name : </label>
              <input
                type="text"
                placeholder="Enter Last Name..."
                className="form-control"
                value={input.lastname}
                onChange={(e) => {
                  setInput({ ...input, lastname: e.target.value });
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email">Email : </label>
              <input
                type="email"
                placeholder="Enter Email ..."
                className="form-control"
                value={input.email}
                onChange={(e) => {
                  setInput({ ...input, email: e.target.value });
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="phone">Phone : </label>
              <input
                type="number"
                placeholder="Enter Phone..."
                className="form-control"
                value={input.phone}
                onChange={(e) => {
                  setInput({ ...input, phone: e.target.value });
                }}
              />
            </div>

            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </form>
        </div>
        <div className="col">
          <div className="col align-self center">
            <table className="table">
              <thead>
                <tr>
                  <th>S.no </th>
                  <th>Name </th>
                  <th>Email </th>
                  <th>Phone Number </th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {/* {console.log(data)} */}
                {data?.map((d, key) => (
                  <Fragment>
                    <tr key={key}>
                      <th>{key + 1}</th>
                      <td>{d.firstname + " " + d.lastname}</td>
                      <td>{d.email}</td>
                      <td>{d.phone}</td>
                      <td
                        onClick={() => handleEdit(key)}
                        style={{ cursor: "pointer" }}>
                        edit
                      </td>
                      <td
                        onClick={() => {
                          handleDelete(key);
                        }}
                        style={{ cursor: "pointer" }}>
                        Delete
                      </td>
                    </tr>
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
