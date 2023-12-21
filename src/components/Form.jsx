import axios from "axios";
import React, { useEffect, useState } from "react";

const Form = ({ getdata, getClientId }) => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [project, setProject] = useState("");

  const formHandler = async (event) => {
    event.preventDefault();
    try {
      if (!name || !lastName || !mobile || !email || !project) {
        alert("All field are required !");
        return;
      }

      const client = {
        name,
        lastname: lastName,
        email,
        mobile,
        project,
      };

      if (getClientId) {
        const newClient = await axios.put(
          `http://localhost:5000/client//update-single/${getClientId}`,
          client
        );
        console.log(newClient);
        if (newClient?.data?.success) {
          alert("CLient Created");
          getdata();

          setName("");
          setEmail("");
          setLastName("");
          setMobile("");
          setProject("");
        }

      } else {
        const newClient = await axios.post(
          "http://localhost:5000/client/create",
          client
        );
        console.log(newClient);
        if (newClient?.data?.success) {
          alert("CLient Created");
          getdata();

          setName("");
          setEmail("");
          setLastName("");
          setMobile("");
          setProject("");
        }

      }
    } catch (error) {
      console.log(error);
    }
  };

  let getSingleClient = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/client/get-single-client/${getClientId}`
      );
      console.log(res);
      if (res.data.success) {
        setName(res.data.data.name);
        setLastName(res.data.data.lastname);
        setEmail(res.data.data.email);
        setMobile(res.data.data.mobile);
        setProject(res.data.data.project);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleClient();
  }, [getClientId]);

  return (
    <>
      {" "}
      <div className="col-md-4">
        <form onSubmit={formHandler} className="form">
          <h3>Create Client</h3>
          <div className="form-field">
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label>Mobile No.</label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label>Project</label>
            <input
              type="text"
              value={project}
              onChange={(e) => setProject(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {getClientId ? "Update Client" : "Create Client "}
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;
